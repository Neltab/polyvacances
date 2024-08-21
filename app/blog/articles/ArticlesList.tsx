import { getAllArticles } from "../Providers/server";
import "./style.css"
import Article from "./Article";

export default async function ArticlesList() {
  const articles = await getAllArticles();

  return (
    <div className="article-list-container">
      <h2>Articles récents</h2>
      <div className="article-list">
        {articles.map(({ id, title, thumbnail, author, date, link}) => (
          <Article
            key={id}
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