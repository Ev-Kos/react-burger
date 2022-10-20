import feedItemStyle from './feed-item.module.css';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function FeedItem() {
    return (
      <Link className={feedItemStyle.link}>
        <li className={feedItemStyle.listItem}>
          <div className={feedItemStyle.element}>
            <div className={feedItemStyle.wrap}>
              <p className='pt-6 text text_type_digits-default'>#</p>
              <p className='text text_type_main-default text_color_inactive'>
                тут будет дата
              </p>
            </div>
            <p className={`${feedItemStyle.name} pt-6 pb-6 text text_type_main-medium`}>
                название
            </p>
            <div className={feedItemStyle.wrapPrice}>
              <div className={feedItemStyle.price}>
                тут будут картинки
              </div>
              <div className={feedItemStyle.wrapPrice}>
                <p className='text text_type_digits-default pr-2'>100</p>
                <CurrencyIcon />
              </div>
            </div>
          </div>
        </li>
      </Link>
    );
  }