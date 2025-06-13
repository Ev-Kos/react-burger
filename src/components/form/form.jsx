import { arrayOf, element, func, string } from 'prop-types';
import styles from './form.module.css';
import { Fragment } from 'react';
import { ErrorMessage } from '../error-message/error-message';

export const Form = ({ title, formFields, linkBlocks, onSubmit, error }) => {
	return (
		<div className={styles.content}>
			<form className={styles.form} onSubmit={onSubmit}>
				{title && <h1 className='text text_type_main-medium'>{title}</h1>}
				{Boolean(error) && <ErrorMessage text={error} />}
				{formFields.map((field, index) => (
					<Fragment key={index}>{field}</Fragment>
				))}
			</form>
			<div className={styles.links}>
				{linkBlocks &&
					linkBlocks.map((block, index) => (
						<Fragment key={index}>{block}</Fragment>
					))}
			</div>
		</div>
	);
};

Form.propTypes = {
	title: string,
	formFields: arrayOf(element).isRequired,
	linkBlocks: arrayOf(element),
	onSubmit: func.isRequired,
	error: string,
};
