"use client";

import { useUploadFilesBulk } from "@/app/api/files/providers/client";
import { FilesSchema, filesSchema } from "@/app/api/files/providers/validation";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLabel, FormControl } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import ExifReader from "exifreader";
import { useForm } from "react-hook-form";

type UploadFilesBulkFormProps = {
  vacationUUID: string;
}

export default function UploadFilesBulkForm({
  vacationUUID,
}: UploadFilesBulkFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<FilesSchema>({
    resolver: zodResolver(filesSchema)
  });

  const filesMutation = useUploadFilesBulk(queryClient, vacationUUID);

  const onSubmit = async (data: FilesSchema) => {
    const formData = new FormData();
    const promises = Array.from(data.files).map(async (file, index) => {
      const creationDate = await getFileCreationDate(file);
      formData.append(`date-${index}`, creationDate);
      formData.append(`file-${index}`, file);
    });

    await Promise.all(promises);

    filesMutation.mutate(formData);
  }
  
  return (
    <Form {...form}>
    <form className="flex items-end gap-3" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <FormItem className="flex flex-col justify-between w-full gap-1">
          <FormLabel className="text-black">Ajouter des photos</FormLabel>
          <FormControl>
            <Input multiple accept="image/png, image/jpeg, video/mp4" type="file" {...form.register("files")} />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <Button status={filesMutation.status} type="submit">Ajouter</Button>
    </form>
  </Form>
  )
}

const getFileCreationDate = async (file: File) => {
  const {exif} = await ExifReader.load(file, {expanded: true, includeUnknown: true});
  
  const exifCreationDate = exif?.DateTimeOriginal?.value[0]
    || exif?.DateTimeDigitized?.value[0]
    || exif?.DateTime?.value[0];

  const creationDate = exifCreationDate 
    ? parse(exifCreationDate, "yyyy:MM:dd HH:mm:ss", new Date()) 
    : new Date(file.lastModified);
  
  return format(creationDate, "yyyy-MM-dd HH:mm:ss");
}