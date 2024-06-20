export const formatDate = (fullDate: Date, showYear = true) => {
  const date = (fullDate.getDate() + "").padStart(2, "0");
  const month = (fullDate.toLocaleString('default', { month: 'short' }));
  const year = (fullDate.getFullYear() + "");
  return `${date} ${month} ${showYear ? year : ''}`.trim();
}

// kudos https://stackoverflow.com/a/7091965
// this function is redistributed under CC BY-SA 3.0
export const getAge = (birth: string | Date) => {
  const today = new Date();
  const birthDate = new Date(birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 || 
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}