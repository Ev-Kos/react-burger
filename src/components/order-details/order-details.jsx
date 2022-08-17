import doneImage from '../../images/done.jpg';
import orderDetailsStyles from './order-details.module.css';

function OrderDetails() {
  return (
    <div className={orderDetailsStyles.container}>
      <h2 className={`${ orderDetailsStyles.number} text text_type_digits-large`}>
        034536
      </h2>
      <p className={`${ orderDetailsStyles.title} text text_type_main-medium`}>
        Идентификатор заказа
      </p>
      <img
        src={doneImage}
        alt="Готово"
        className={`${orderDetailsStyles.image} mt-15 mb-15`}
      />
      <p className={`${ orderDetailsStyles.text} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${ orderDetailsStyles.subtext} text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;