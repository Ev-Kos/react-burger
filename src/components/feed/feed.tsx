import feedStyle from './feed.module.css';
import {FeedItem} from '../feed-item/feed-item';
import { useSelector } from '../../services/hooks';
import { TFeedItem } from '../../services/types/data';

export default function Feed() {

  const feed = useSelector((store) => store.wsReducer.messages);
  let data = null;

  if (feed.length > 0) {
    data = feed[`${feed.length - 1}`].orders;
  }

  return (
    <section className={feedStyle.conteiner}>
      <ul className={feedStyle.content}>
        {data != null &&
          data.map((item: TFeedItem) => {
            return <FeedItem item={item} key={item._id} />;
          })}
      </ul>
    </section>
  )
}