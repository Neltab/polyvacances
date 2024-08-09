"use client"; // Make this component a client component
import React from "react";
import { useUploadImages } from "../(Agenda)/Event/Providers/client";
import { Event } from "../(Agenda)/Vacation/types";
import { useQueryClient } from "@tanstack/react-query";

type FileUploadFormProps = {
  event: Event;
};

const FileUploadForm = ({event}: FileUploadFormProps) => {

  const queryClient = useQueryClient();

  const imagesMutation = useUploadImages(queryClient, event.id);

  if (!event) {
    return null;
  }

  return (
    <form className="w-full pb-5" action={imagesMutation.mutate}>
      <div className="flex justify-center">
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          name='images'
          className="text-xs"
        />
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold py-1 px-2 rounded"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default FileUploadForm;