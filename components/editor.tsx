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
import { type Post } from '.prisma/client';
import { Icons } from '@/components/icon';
import type { OutputData } from '@editorjs/editorjs';

interface EditorProps {
  post: Pick<Post, 'id' | 'title' | 'content' | 'published'>;
}

export default function Editor({ post }: EditorProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const ref = useRef<EditorJS | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const body: OutputData = useMemo(() => {
    return post.content
      ? (post.content as unknown as OutputData)
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

  const { register, handleSubmit } = useForm<postPatchSchema>({
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
      <div className="grid w-full gap-4 md:gap-8">
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mx-auto px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center space-x-4 sm:space-x-6 mb-3 sm:mb-0">
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                  className: 'hover:bg-muted',
                })}
              >
                ←戻る
              </Link>
              <p className="text-sm text-muted-foreground">公開</p>
            </div>
            <button
              className={buttonVariants({
                size: 'sm',
                className: 'min-w-[80px] shadow-sm',
              })}
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
        </div>
        <div className="w-full max-w-3xl px-4 sm:px-6 mx-auto">
          <TextareaAutosize
            id="title"
            autoFocus
            defaultValue={post.title}
            placeholder="タイトル"
            className="w-full resize-none overflow-hidden bg-transparent text-2xl sm:text-3xl md:text-4xl font-bold focus:outline-none mb-4"
            {...register('title')}
          />
          <div
            id="editor"
            className="min-h-[500px] prose prose-sm sm:prose-base max-w-none focus:outline-none"
          />
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 select-none">
            <kbd className="rounded-sm border bg-muted px-1.5 py-0.5 text-xs uppercase">
              Tab
            </kbd>{' '}
            キーでコマンドメニューを開く
          </p>
        </div>
      </div>
    </form>
  );
}
