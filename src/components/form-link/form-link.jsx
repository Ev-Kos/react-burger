import { string } from 'prop-types';
import styles from './form-link.module.css';
import { Link } from 'react-router';

export const FormLink = ({ text, textLink, link }) => {
	return (
		<p className='text text_type_main-small text_color_inactive'>
			{text}
			<Link to={link} className={`${styles.link} ml-2`}>
				{textLink}
			</Link>
		</p>
	);
};

FormLink.propTypes = {
	text: string.isRequired,
	textLink: string.isRequired,
	link: string.isRequired,
};
