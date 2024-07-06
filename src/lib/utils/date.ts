export const formatDate = (fullDate: Date) => {
  const date = fullDate.toLocaleDateString('sv-SE', { year: 'numeric', month: 'short'});
  return `${date.at(0)!.toUpperCase()}${date.slice(1)}`
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