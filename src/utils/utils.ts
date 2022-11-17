export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string, 
  value: string | number | boolean, 
  props: any = {}) {
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
  
export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
}

export const getDate = (date: string | number) => {
  const orderDate = new Date(date);
  
  let days;
  const now = new Date();
  const nowDay = now.getDate();
  let day = orderDate.getUTCDate();
  let hour = orderDate.getHours();
  let month = orderDate.getMonth();
  let min: string | number = orderDate.getMinutes();
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

export const errorHandler = (data: {accessToken: string, refreshToken: string, success: boolean}) => {
  let authToken;
  if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
      authToken = data.accessToken.split('Bearer ')[1];
  }
  if (authToken) {
      setCookie('token', authToken, 0);
      localStorage.setItem('refreshToken', `${data.refreshToken}`);
      console.log('Token обновлен')
  }
}

