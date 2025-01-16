import { db } from '@/lib/db';
import { postPatchSchema } from '@/lib/validations/post';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const routeContextSchema = z.object({
  params: z.object({
    postid: z.string(),
  }),
});

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    await verifyCurrentUserHasAccessToPost(params.postid);

    const json = await req.json();
    const { title, content } = postPatchSchema.parse(json);
    const post = await db.post.update({
      where: { id: params.postid },
      data: { title, content },
    });
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: { id: postId, authorId: session?.user?.id },
  });
  if (count === 0) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}
