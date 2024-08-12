import moment from "moment";
import Link from "next/link"

type ArticleProps = {
  title: string;
  link: string;
  author: string;
  date: Date;
  thumbnail: string | null;
}

export default ({
  title,
  thumbnail,
  link,
  date,
  author,
}: ArticleProps) => {

  return (
    <Link href={link} className="article">
      {
        thumbnail &&
        <img src={thumbnail} />
      }
      <h2 className="article-title">{title}</h2>
      <p className="article-description">Par {author} - {moment(date).format("DD/MM/YYYY")}</p>
    </Link>
  )
}