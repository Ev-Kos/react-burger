import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerConstructorPropTypes } from '../../utils/prop-types'

function BurgerConstructor({data}) {
    return (
    <section className={`${constructorStyles.constructor} mr-5 pl-4`}>
        <ul className={`${constructorStyles.elements} mt-25`}>
            <li className={`${constructorStyles.element} mr-8 mb-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={data[0].price}
                    thumbnail={data[0].image_mobile}
                />
            </li>
            <li>
                <ul className={`${constructorStyles.elementScroll} mr-4`}>
                {data.filter((elem) => elem.type !== "bun")
                .map((elem) => {
                return(
                  <li key={elem._id} className={`${constructorStyles.element} mr-2`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={elem.name}
                      price={elem.price}
                      thumbnail={elem.image_mobile}
                    />
                  </li>)
                })}
                </ul>
            </li>
            <li className={`${constructorStyles.element} mr-8 mt-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={data[0].price}
              thumbnail={data[0].image_mobile}
            />
          </li>
        </ul>
        <div className={`${constructorStyles.order} mr-15 mt-10`}>
          <div className={constructorStyles.priceContainer}>
            <span className={constructorStyles.price}>2000</span>
            <CurrencyIcon type="primary" />
        </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

    </section>
    )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerConstructorPropTypes).isRequired
}

export default BurgerConstructor