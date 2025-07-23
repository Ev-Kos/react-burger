export const parseTime = (date: string) => {
	const pad = (num: number) => num.toString().padStart(2, '0');

	const newDate = new Date(date);
	const now = new Date();

	const dayOrder = pad(newDate.getDate());
	const monthOrder = pad(newDate.getMonth() + 1);
	const yearOrder = newDate.getFullYear();
	const hourOrder = pad(newDate.getHours());
	const minOrder = pad(newDate.getMinutes());

	const dayNow = now.getDate();
	const monthNow = now.getMonth() + 1;
	const yearNow = now.getFullYear();

	const isEqual = yearNow === yearOrder && monthNow === Number(monthOrder);
	const dayDiff = dayNow - Number(dayOrder);

	if (isEqual) {
		return dayNow === Number(dayOrder)
			? `Сегодня, ${hourOrder}:${minOrder}`
			: dayDiff === 1
				? `Вчера, ${hourOrder}:${minOrder}`
				: dayDiff < 5
					? `${dayDiff} дня назад, ${hourOrder}:${minOrder}`
					: `${dayDiff} дней назад, ${hourOrder}:${minOrder}`;
	}

	return `${dayOrder}.${monthOrder}.${yearOrder}, ${hourOrder}:${minOrder}`;
};
