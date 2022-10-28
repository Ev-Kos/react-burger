import { useEffect } from 'react';
import feedIdStyle from './feed-id-modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/actions/wsActions';
import {getDate} from '../../utils/utils';

export default function FeedIdModal() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const feed = useSelector((store) => store.wsReducer.messages);

  const order = {
    data: null,
    orderModal: null,
    orderModalStatus: null,
    orderModalCreatedAt: null,
    orderModalIngredients: [],
    ingredientsArray: []
  }
  
  if (feed.length > 0) {
    order.data = feed[`${feed.length - 1}`].orders;
    order.orderModal = order.data.find((ingredient) => ingredient._id === id);
    order.orderModalStatus = order.orderModal.status;
    order.orderModalCreatedAt = order.orderModal.createdAt;
    order.orderModalIngredients = order.orderModal.ingredients;
  }

  const date = getDate(order.orderModalCreatedAt);

  let price = 0;

  const elemCount = order.orderModalIngredients.reduce((total, elem) => {
    total[elem] = (total[elem] || 0) + 1;
    return total;
  }, []);

  const result = ingredients.map((elem) => {
    const ingredient = order.orderModalIngredients.find((item) => elem._id === item
    );
    if (ingredient) {
      order.ingredientsArray.push(elem);
    }
  }, 0);

  order.ingredientsArray.forEach((item) => {
    price += elemCount[item._id] * item.price;
  });

  return (
    <>
      {order.orderModal && (
        <section className={feedIdStyle.page}>
          <div className="pl-8 pr-8">
            <h1 className={`${feedIdStyle.number} text text_type_digits-default mb-10`}>
              {`#${order.orderModal.number}`}
            </h1>
            <p className={`${feedIdStyle.name} text text_type_main-medium mb-3`}>
              {order.orderModal.name}
            </p>
            {order.orderModalStatus === 'done' ? (<p className={`text text_type_main-default mb-15 ${feedIdStyle.colorStatusDone}`}>
              Выполнен
            </p>) : (
              <p className={`text text_type_main-default mb-15 ${feedIdStyle.colorStatusPending}`}>
              Готовится
            </p>
            )}
            <p className='text text_type_main-medium mb-6'>Состав:</p>
            <div>
              <ul className={`${feedIdStyle.list} pr-6 mb-10`}>
                {order.ingredientsArray.map((item) => {
                  return (
                    <li className={`${feedIdStyle.listItem} pb-4`} key={item._id}>
                      <div className={feedIdStyle.listItemWrap}>
                        <div className={feedIdStyle.listItemWrap}>
                          <img
                            className={feedIdStyle.image}
                            src={item.image_mobile}
                            alt='Изображение ингредиента'
                          />
                          <p className='pl-4 text text_type_main-default'>{item.name}</p>
                        </div>
                        <div className={feedIdStyle.listItemWrap}>
                          <p className='text text_type_digits-default pl-4'>
                            {elemCount[item._id]}&nbsp;x&nbsp;{item.price}
                          </p>
                          <CurrencyIcon />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`${feedIdStyle.price} ${feedIdStyle.priceWrap}`}>
              <p className="text text_type_main-default text_color_inactive">
                {date}
              </p>
              <div className={`${feedIdStyle.price}`}>
                <p className='text text_type_digits-default'>{price}</p>{" "}
                <CurrencyIcon />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}