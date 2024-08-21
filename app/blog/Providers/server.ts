"use server";

import path from "path";
import fs from "fs";
import rehypeSanitize from "rehype-sanitize";
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from "unified";
import matter from "gray-matter";
import prisma from "../../../lib/utils/db";

export const getAllArticles = () => {
  return prisma.article.findMany({});
}

export const createArticle = (author: string, title: string, date: string, thumbnail?: string) => {
  return prisma.article.create({
    data: {
      title,
      date,
      author,
      link: `/blog/articles/${formatTitle(title)}`,
      thumbnail
    }
  });
}

export const uploadBlogArticle = async (article: string, author: string) => {
  const { data, content } = matter(article);

  if (!data.title) {
    throw new Error("Title is required");
  }

  const formattedTitle = formatTitle(data.title);
  const folderPath = path.join(process.cwd(), 'app/blog/articles', formattedTitle);

  fs.mkdirSync(folderPath, { recursive: true });

  const filePath = path.join(folderPath, 'page.mdx');
  
  const sanitizedArticle = await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  fs.writeFileSync(filePath, sanitizedArticle.toString());
  createArticle(author, data.title, data.date, data.thumbnail);
};

const formatTitle = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
};