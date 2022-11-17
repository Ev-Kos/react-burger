import feedProfileStyles from './feed-profile.module.css';
import {FeedItem} from '../feed-item/feed-item';
import {TFeedItem} from '../../services/types/data';
import {FC} from 'react';

export const FeedProfile: FC<{data: Array<TFeedItem>}> = ({data}) =>{
 
    return (
      <section className={feedProfileStyles.container}>
        <ul className={feedProfileStyles.content}>
          {data != null &&
            [...data].reverse().map((item) => {
              return <FeedItem item={item} key={item._id} profile='true'/>;
            })}
        </ul>
      </section>
    );
  }