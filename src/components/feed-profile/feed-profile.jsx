import feedProfileStyles from './feed-profile.module.css';
import FeedItem from '../feed-item/feed-item';
import PropTypes from 'prop-types';

export default function FeedProfile({data}) {
 
    return (
      <section className={feedProfileStyles.container}>
        <ul className={feedProfileStyles.content}>
          {data != null &&
            [...data].reverse().map((item) => {
              return <FeedItem item={item} key={item._id} profile='true'/>;
            })}
        </ul>
      </section>
    );
  }

FeedProfile.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string.isRequired),
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  )
}