import Feed from '../components/feed/feed';
import FeedInfo from '../components/feed-info/feed-info';
import feedStyle from './styles-pages.module.css';

export default function FeedPage() {
    return (
      <section className={feedStyle.pageFeed}>
        <div>
          <h1 className='text text_type_main-large mt-10 mb-5'>Лента Заказов</h1>
          <Feed />
        </div>
        <FeedInfo />
      </section>
    );
  }