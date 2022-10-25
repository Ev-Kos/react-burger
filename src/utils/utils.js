export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export const getDate = (date) => {
  const orderDate = new Date(date);
  let days;
  const now = new Date();
  const nowDay = now.getDate();
  let day = orderDate.getUTCDate();
  let hour = orderDate.getHours();
  let month = orderDate.getMonth();
  let min = orderDate.getMinutes();
  const gmt = orderDate.toString().split('GMT')[1];
  if (min < 10) min = '0' + min;
  const time = `${hour}:${min} i-GMT${gmt.slice(0, 1)}${Number(
    gmt.slice(1, 3)
  )}`;
  if (now.getMonth() - month > 0) {
    return `${day}/${month}, ${time}`;
  }
  if (nowDay - day > 1) {
    days = nowDay - day;
    return days < 5
      ? `${days} дня назад, ${time}`
      : `${days} дней назад, ${time}`;
  } else if (nowDay - day === 1) {
    return `Вчера, ${time}`;
  } else return `Сегодня, ${time}`;
};

