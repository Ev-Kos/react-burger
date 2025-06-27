import styles from './form-link.module.css';
import { Link } from 'react-router';

type TFormLink = {
	text: string;
	textLink: string;
	link: string;
};

export const FormLink = ({ text, textLink, link }: TFormLink) => {
	return (
		<p className='text text_type_main-small text_color_inactive'>
			{text}
			<Link to={link} className={`${styles.link} ml-2`}>
				{textLink}
			</Link>
		</p>
	);
};
