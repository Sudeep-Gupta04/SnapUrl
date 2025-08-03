
import ShortenItem from "./ShortenItem";

function ShorternUrlList({data}) {
  return (
    <div className="url-list-container">
      {data.map((item) => (
        <ShortenItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default ShorternUrlList
