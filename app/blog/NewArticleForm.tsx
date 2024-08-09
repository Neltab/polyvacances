'use client'

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { uploadBlogArticle } from "./Providers/server";
import moment from "moment";

const DEFAULT_TEXT = `---
title: **REMPLACER PAR LE TITRE**
date: ${moment().format('YYYY-MM-DD')}
thumbnail: **REMPLACER PAR L'URL DE L'IMAGE (optionnel)**
---`;

export default () => {
  const [value, setValue] = useState(DEFAULT_TEXT);
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || "")}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <button onClick={() => uploadBlogArticle(value, "Aurélien")}>Log</button>
    </div>
  );
}