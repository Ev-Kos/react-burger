import feedInfoStyles from './feed-info.module.css';

export default function FeedInfo() {
    return (
      <section className={`${feedInfoStyles.container} ml-15`}>
        <div className={feedInfoStyles.wrap}>
            <div className={`${feedInfoStyles.wrapList}`}>
                <h2 className={`${feedInfoStyles.name} text text_type_main-medium pb-6`}>
                    Готовы:
                </h2>
                <div className={`${feedInfoStyles.listDone}`}>
                    <p className={`${feedInfoStyles.listItem} text text_type_digits-default pt-1 pb-1`}>
                        034533
                    </p>
                    <p className={`${feedInfoStyles.listItem} text text_type_digits-default pt-1 pb-1`}>
                        034533
                    </p>
                    <p className={`${feedInfoStyles.listItem} text text_type_digits-default pt-1 pb-1`}>
                        034533
                    </p>
                    <p className={`${feedInfoStyles.listItem} text text_type_digits-default pt-1 pb-1`}>
                        034533
                    </p>
                    <p className={`${feedInfoStyles.listItem} text text_type_digits-default pt-1 pb-1`}>
                        034533
                    </p>
                </div>
            </div>
            <div className={`${feedInfoStyles.wrapList} ml-9`}>
                <h2 className={`${feedInfoStyles.name} text text_type_main-medium pb-6`}>
                    В работе:
                </h2>
                <div className={`${feedInfoStyles.listWork}`}>
                    <p className={`${feedInfoStyles.listItem} text text_type_digits-default pt-1 pb-1`}>
                        034533
                    </p>
                </div>
            </div>
        </div>
        <div className='mt-15'>
            <h2 className={`${feedInfoStyles.name} text text_type_main-medium`}>
                Выполнено за все время:
            </h2>
            <p className={`${feedInfoStyles.amount}`}>28 752</p>
        </div>
        <div className="mt-15">
          <h2 className={`${feedInfoStyles.name} text text_type_main-medium`}>
            Выполнено за сегодня:
          </h2>
          <p className={`${feedInfoStyles.amount}`}>138</p>
        </div>
      </section>
    );
  }
  