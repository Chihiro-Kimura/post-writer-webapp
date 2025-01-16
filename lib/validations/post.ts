import { z } from 'zod';

export const postPatchSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(128, 'タイトルは3文字以上128文字以下で入力してください'),
  content: z.any().optional(),
});

export type postPatchSchema = z.infer<typeof postPatchSchema>;
