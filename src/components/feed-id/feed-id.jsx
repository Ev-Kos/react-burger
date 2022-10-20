import feedIdStyles from './feed-id.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function FeedId() {
    return (
        <section className={feedIdStyles.page}>
            <div className='pl-8 pr-8'>
                <h1 className={`${feedIdStyles.number} text text_type_digits-default mb-10`}>
                    #
                </h1>
                <p className='text text_type_main-medium mb-3'>
                    Название заказа
                </p>
                <p className='text text_type_main-default mb-15'>
                    Выполнен
                </p>
                <p className='text text_type_main-medium mb-6'>Состав:</p>
                <div>
                    <ul className={`${feedIdStyles.list} pr-6 mb-10`}>
                        <li className={`${feedIdStyles.listItem} pb-4`}>
                            <div className={feedIdStyles.listItemWrap}>
                                <div className={feedIdStyles.listItemWrap}>
                                    <img src='#'
                                        alt="Изображение ингредиента"
                                        className={feedIdStyles.image}
                                    />
                                    <p className='pl-4 text text_type_main-default'>
                                        Название ингредиента
                                    </p>
                                </div>
                                <div className={feedIdStyles.listItemWrap}>
                                    <p className='text text_type_digits-default pl-4'>
                                        2&nbsp;x&nbsp;20
                                    </p>
                                    <CurrencyIcon />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={`${feedIdStyles.price} ${feedIdStyles.priceWrap}`}>
                    <p className='text text_type_main-default text_color_inactive'>
                        тут будет дата заказа
                    </p>
                    <div className={`${feedIdStyles.price}`}>
                        <p className='text text_type_digits-default'>510</p>
                        <CurrencyIcon />
                    </div>
                </div>
            </div>
        </section>
    )
}