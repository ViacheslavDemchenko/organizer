const dateFormatting = (dateNonFormatted) => {
  let year = String(dateNonFormatted.getFullYear()); // Получаем год
  let month = dateNonFormatted.getMonth() + 1; // Получаем месяц
  let day = String(dateNonFormatted.getDate()); // Получаем день

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return {
    year,
    month,
    day
  }
};

const formDateFormat = (date) => {
  const newFormDay = date.split('-'); // Разбиваем указанную в форме дату на массив
  const year = newFormDay[0]; // Берем первый элемент массива (год)
  const month = newFormDay[1]; // Берем второй элемент массива (месяц)
  const day = newFormDay[2]; // Берем третий элемент массива (день)

  return {
    year,
    month,
    day
  }
};

export { dateFormatting, formDateFormat };