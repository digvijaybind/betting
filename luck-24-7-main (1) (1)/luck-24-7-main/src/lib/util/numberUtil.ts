export const numberStyle = (num: number) => {
  if (num < 99_999) return num;
  if (num < 99_99_999) return `${num / 100_000} Lakh`;
  if (num < 99_99_99_999) return `${num / 100_00_000} Crore`;
  return num;
};
