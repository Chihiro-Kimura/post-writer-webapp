'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import TextareaAutosize from 'react-textarea-autosize';
import EditorJS from '@editorjs/editorjs';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import CodeTool from '@editorjs/code';
import Checklist from '@editorjs/checklist';
import ImageTool from '@editorjs/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postPatchSchema } from '@/lib/validations/post';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Post } from '@prisma/client';
import { Icons } from '@/components/icon';

interface EditorProps {
  post: Pick<Post, 'id' | 'title' | 'content' | 'published'>;
}

export default function Editor({ post }: EditorProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const ref = useRef<EditorJS | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const body = useMemo(() => {
    return post.content
      ? post.content
      : {
          blocks: [],
        };
  }, [post.content]);

  const initializeEditor = useCallback(() => {
    if (typeof window !== 'undefined') {
      const editor = new EditorJS({
        onReady: () => {
          ref.current = editor;
        },
        data: body,
        holder: 'editor',
        placeholder: 'コンテンツを入力してください',
        inlineToolbar: true,
        tools: {
          header: Header,
          list: List,
          link: LinkTool,
          code: CodeTool,
          checklist: Checklist,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/api/upload-image',
              },
            },
          },
        },
      });
    }
  }, [body]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }
    return () => {
      ref.current?.destroy();
      ref.current = null;
    };
  }, [isMounted, initializeEditor]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postPatchSchema>({
    resolver: zodResolver(postPatchSchema),
  });

  const onSubmit = async (data: postPatchSchema) => {
    setIsSaving(true);
    const blocks = await ref.current?.save();
    console.log('Saving blocks:', blocks);
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks || { blocks: [] },
      }),
    });
    if (!response.ok) {
      return toast({
        title: 'エラーが発生しました',
        description: response.statusText,
        variant: 'destructive',
      });
    }
    router.refresh();
    toast({
      title: '更新しました',
    });
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: 'ghost' })}
            >
              戻る
            </Link>
            <p className="text-sm text-muted-foreground">公開</p>
          </div>
          <button
            className={buttonVariants()}
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            ) : (
              <span>保存</span>
            )}
          </button>
        </div>
        <div className="w-[800px] mx-auto">
          <TextareaAutosize
            id="title"
            autoFocus
            defaultValue={post.title}
            placeholder="タイトル"
            className="w-full resize-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register('title')}
          />
        </div>
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{' '}
          キーでコマンドメニューを開く
        </p>
      </div>
    </form>
  );
}
