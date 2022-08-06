import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import diamond from "../../images/diamond.png";

const ingredients = [
    {
        "_id":"60666c42cc7b410027a1a9b9",
        "name":"Соус традиционный галактический",
        "type":"sauce",
        "proteins":42,
        "fat":24,
        "carbohydrates":42,
        "calories":99,
        "price":15,
        "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
        "__v":0
    },
    {
        "_id":"60666c42cc7b410027a1a9bc",
        "name":"Плоды Фалленианского дерева",
        "type":"main",
        "proteins":20,
        "fat":5,
        "carbohydrates":55,
        "calories":77,
        "price":874,
        "image":"https://code.s3.yandex.net/react/code/sp_1.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
        "__v":0
    },
    {
        "_id":"60666c42cc7b410027a1a9bb",
        "name":"Хрустящие минеральные кольца",
        "type":"main",
        "proteins":808,
        "fat":689,
        "carbohydrates":609,
        "calories":986,
        "price":300,
        "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
        "__v":0
    },
    {
        "_id":"60666c42cc7b410027a1a9bd",
        "name":"Кристаллы марсианских альфа-сахаридов",
        "type":"main",
        "proteins":234,
        "fat":432,
        "carbohydrates":111,
        "calories":189,
        "price":762,
        "image":"https://code.s3.yandex.net/react/code/core.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/core-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/core-large.png",
        "__v":0
    },
    {
        "_id":"60666c42cc7b410027a1a9b5",
        "name":"Говяжий метеорит (отбивная)",
        "type":"main",
        "proteins":800,
        "fat":800,
        "carbohydrates":300,
        "calories":2674,
        "price":3000,
        "image":"https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v":0
    }
]

const BurgerConstructor = (props) => {
    return (
    <section className={`${constructorStyles.constructor} mr-5 pl-4`}>
        <ul className={`${constructorStyles.elements} mt-25`}>
            <li className={`${constructorStyles.element} mr-8 mb-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={props.data[0].price}
                    thumbnail={props.data[0].image_mobile}
                />
            </li>
            <li>
                <ul className={`${constructorStyles.elementScroll} mr-4`}>
                {ingredients.map(elem => {
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
              price={props.data[0].price}
              thumbnail={props.data[0].image_mobile}
            />
          </li>
        </ul>
        <div className={`${constructorStyles.order} mr-15 mt-10`}>
          <div className={constructorStyles.priceContainer}>
            <span className={constructorStyles.price}>2000</span>
            <img className={constructorStyles.diamond} src={diamond} alt="#"/>
        </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

    </section>
    )
}

export default BurgerConstructor