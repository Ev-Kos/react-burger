import feedItemStyles from './feed-item.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import FeedItemImage from '../feed-image/feed-image';
import {getDate} from '../../utils/utils';
import PropTypes from 'prop-types';

export default function FeedItem(item) {
    const location = useLocation();
    const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients);
    const ingredients = item.item.ingredients;
  
    const order = {
      ingredientsArray: [],
      time: item.item.createdAt,
      id: item.item._id,
      profile: item.profile,
      url: ''
    };
  
    let price = 0;
    let countImage = 0;
    let elemCount = [];

    const date = getDate(order.time);
  
    const result = ingredientsData.map((elem) => {
      const data = ingredients.find((item) => elem._id === item);
      elemCount = ingredients.reduce(function (total, elem) {
        total[elem] = (total[elem] || 0) + 1;
        return total;
      }, []);
  
      if (data) {
        order.ingredientsArray.push(elem);
      }
    }, 0);
  
    order.url = order.profile === 'true' ? `/profile/order/${order.id}` : `/feed/${order.id}`

    return (
      <Link to={{pathname: order.url, state: { background: location }}}
        key={order.id}
        className={feedItemStyles.link}
      >
        <li className={feedItemStyles.listItem} key={order.id}>
          <div className={feedItemStyles.item}>
            <div className={feedItemStyles.wrap}>
              <p className='pt-6 text text_type_digits-default'>
                #{item.item.number}
              </p>
              <p className='text text_type_main-default text_color_inactive'>
                {date}
              </p>
            </div>
            <p className={`${feedItemStyles.name} pt-6 pb-6 text text_type_main-medium`}>
              {item.item.name}
            </p>
            <div className={feedItemStyles.wrapPrice}>
              <div className={feedItemStyles.price}>
                {order.ingredientsArray.reverse().map((item) => {
                  price += elemCount[item._id] * item.price;
                  if (order.ingredientsArray.length <= 6) {
                    return <FeedItemImage data={item} key={item._id} />;
                  } else {
                    return (
                      <FeedItemImage
                        data={item}
                        key={item._id}
                        number={(countImage += 1)}
                        lengthArray={order.ingredientsArray.length}
                      />
                    );
                  }
                })}
              </div>
              <div className={feedItemStyles.wrapPrice}>
                <p className='text text_type_digits-default pr-2'>{price}</p>
                <CurrencyIcon />
              </div>
            </div>
          </div>
        </li>
      </Link>
    )
  }

  FeedItem.propTypes = {
    item: PropTypes.object.isRequired,
  };