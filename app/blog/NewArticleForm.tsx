'use client'

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { uploadBlogArticle } from "./Providers/server";
import moment from "moment";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button"

const DEFAULT_TEXT = `---
title: **REMPLACER PAR LE TITRE**
date: ${moment().format('YYYY-MM-DD')}
thumbnail: **REMPLACER PAR L'URL DE L'IMAGE (optionnel)**
---`;

export default function NewArticleForm() {
  const [value, setValue] = useState(DEFAULT_TEXT);
  const { data: session, status } = useSession()

  if (status !== "authenticated" || !session || !session.user || !session.user.name) {
    redirect("/auth/login");
  }

  return (
    <div className="container">
      <MDEditor
        value={value}
        height={500}
        onChange={(value) => setValue(value || "")}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <Button variant="contained" onClick={() => uploadBlogArticle(value, session?.user?.name as string)}>Envoyer</Button>
    </div>
  );
}