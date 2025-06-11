import { arrayOf, element, string } from 'prop-types';
import styles from './form.module.css';
import { Fragment } from 'react';

export const Form = ({ title, formFields, linkBlocks }) => {
	return (
		<div className={styles.content}>
			<form className={styles.form}>
				{title && <h1 className='text text_type_main-medium'>{title}</h1>}
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
};
