import notFoundStyle from './styles-pages.module.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className={notFoundStyle.page}>
      <div className={notFoundStyle.wrap}>
        <h1 className="text text_type_digits-large">404</h1>
        <p className="text text_type_main-large">Страница не найдена</p>
        <p className="text text_type_main-medium mt-20">
            Вернуться на <Link to='/' className={notFoundStyle.link}>главную страницу</Link>
        </p>
      </div>
    </section>
  );
}

export default PageNotFound;