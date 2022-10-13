const dateFormatting = (dateNonFormatted) => {
  let year = String(dateNonFormatted.getFullYear()); // Получаем год
  let month = String(dateNonFormatted.getMonth() + 1); // Получаем месяц
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

const getTasksFromLS = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : {};
};

export { dateFormatting, getTasksFromLS };