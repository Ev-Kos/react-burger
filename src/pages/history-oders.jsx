import historyOrdersStyle from './styles-pages.module.css';
import FeedItem from '../components/feed-item/feed-item';

export default function HistoryOrders() {
    return (
        <section className={historyOrdersStyle.ordersWrap}>
          <ul className={historyOrdersStyle.ordersContent}>
            <FeedItem profile="true" />
          </ul>
        </section>
      )
}