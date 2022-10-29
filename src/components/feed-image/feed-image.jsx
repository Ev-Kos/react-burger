import feedImageStyle from './feed-image.module.css';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/prop-types';

export default function FeedItemImage({ data, number, lengthArray }) {
  let count = lengthArray - number;
  
  return (
    <>
      {number && (
        <div className={count <= 5 ? feedImageStyle.images : feedImageStyle.imagesHidden}>
          <div className={count < 5 ? feedImageStyle.image : feedImageStyle.image}>
            <img
              src={data.image_mobile}
              alt='Изображение ингредиента'
              className={feedImageStyle.imageSmall}
            />
          </div>
          {count === 5 && (
            <div className={feedImageStyle.countWrap}>
              <div className={`${feedImageStyle.count} text text_type_main-default`}>
                <p className="pl-1">{`+${lengthArray - 6}`}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {!number && (
        <div className={feedImageStyle.images}>
          <div className={feedImageStyle.image}>
            <img
              src={data.image_mobile}
              alt='Изображение ингредиента'
              className={feedImageStyle.imageSmall}
            />
          </div>
        </div>
      )}
    </>
  )
}

FeedItemImage.propTypes = {
  data: ingredientType.isRequired,
  number: PropTypes.number,
  lengthArray: PropTypes.number
}