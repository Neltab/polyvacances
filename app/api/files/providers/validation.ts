import { z } from "zod";

export type FilesSchema = z.infer<typeof filesSchema>;

export const filesSchema = z.object({
  files: z.custom<FileList>((fileList) => fileList instanceof FileList),
});