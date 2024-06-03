  export const formatDate = (fullDate: Date) => {
    const date = (fullDate.getDate() + "").padStart(2, "0");
    const month = (fullDate.toLocaleString('default', { month: 'short' }));
    const year = (fullDate.getFullYear() + "");
    return `${date} ${month} ${year}`;
  }