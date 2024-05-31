  export const formatDate = (fullDate: Date) => {
    const date = (fullDate.getDate() + "").padStart(2, "0");
    const month = (fullDate.getMonth() + "").padStart(2, "0");
    const year = (fullDate.getFullYear() + "").slice(2);
    return `${date}.${month}.${year}`;
  }