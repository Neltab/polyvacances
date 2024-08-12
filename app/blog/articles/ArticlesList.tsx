import Link from "next/link";
import { getAllArticles } from "../Providers/server";
import "./style.css"
import Article from "./Article";

export default async () => {
  const articles = await getAllArticles();

  return (
    <div className="article-list-container">
      <h2>Articles récents</h2>
      <div className="article-list">
        {[...articles, ...articles].map(({ title, thumbnail, author, date, link}) => (
          <Article
            title={title}
            thumbnail={thumbnail}
            author={author}
            date={date}
            link={link}
          />
        ))}
      </div>
    </div>
  )
}