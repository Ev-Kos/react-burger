import feedImageStyle from './feed-image.module.css';
import {TFeedItemImage} from '../../services/types/data';
import {FC} from 'react';

export const FeedItemImage: FC<TFeedItemImage> = ({ data, number = 0, lengthArray = 0 }) => {
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