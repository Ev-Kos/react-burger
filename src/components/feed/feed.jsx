import feedStyle from './feed.module.css';
import FeedItem from '../feed-item/feed-item';

export default function Feed() {
    return (
      <section className={feedStyle.сontainer}>
        <ul className={feedStyle.content}>
            <FeedItem />
        </ul>
      </section>
    );
  }