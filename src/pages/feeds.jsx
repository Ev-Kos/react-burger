import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import feedsStyle from './styles-pages.module.css';
import Feed from '../components/feed/feed';
import FeedInfo from '../components/feed-info/feed-info';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../services/actions/wsActions';


export default function Feeds() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: '' });
    };
  }, []);

  return (
    <section className={feedsStyle.feedPage}>
      <div>
        <h1 className='text text_type_main-large mt-10 mb-5'>Лента Заказов</h1>
        <Feed />
      </div>
      <FeedInfo />
    </section>
  );
}
