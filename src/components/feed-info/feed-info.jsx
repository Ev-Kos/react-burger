import { useSelector } from 'react-redux';
import feedInfoStyle from './feed-info.module.css';

export default function FeedInfo() {
  const feed = useSelector((store) => store.wsReducer.messages);
  let data;
  let total = 0;
  let totalDay = 0;
  const orderDone = [];
  const orderWork = [];

  let textSizeDone = 'default';
  let textSizeWork = 'default';

  if (feed.length > 0) {
    data = feed[`${feed.length - 1}`].orders;
    total = feed[`${feed.length - 1}`].total;
    totalDay = feed[`${feed.length - 1}`].totalToday;
    data.forEach((item) => {
      if (item.status === 'done') {
        orderDone.push(item.number);
      } else {
        orderWork.push(item.number);
      }
    });
  }

  orderDone.length > 45 ? (textSizeDone = 'small') : (textSizeDone = 'default');
  orderWork.length > 45 ? (textSizeWork = 'small') : (textSizeWork = 'default');

  return (
    <section className={`${feedInfoStyle.container} ml-15`}>
      <div className={feedInfoStyle.wrap}>
        <div className={`${feedInfoStyle.wrapList}`}>
          <h2 className={`${feedInfoStyle.listName} text text_type_main-medium pb-6`}>
            Готовы:
          </h2>
          <div className={`${feedInfoStyle.listDone}`}>
            {orderDone.map((item) => {
              return (
                <p className={`${feedInfoStyle.listItem} text text text_type_digits-${textSizeDone} pt-1 pb-1`} key={item}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={`${feedInfoStyle.wrapList} ml-9`}>
          <h2 className={`${feedInfoStyle.listName} text text_type_main-medium pb-6`}>
            В работе:
          </h2>
          <div className={`${feedInfoStyle.listWork}`}>
            {orderWork.map((item) => {
              return (
                <p className={`${feedInfoStyle.listItem} text text_type_digits-${textSizeWork} pt-1 pb-1`} key={item}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className='mt-15'>
        <h2 className={`${feedInfoStyle.listName} text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <p className={`${feedInfoStyle.number}`}>{total}</p>
      </div>
      <div className='mt-15'>
        <h2 className={`${feedInfoStyle.listName} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        <p className={`${feedInfoStyle.number}`}>{totalDay}</p>
      </div>
    </section>
  );
}
