const parseDate = (usFormatDateString: string) => {
  const [month, day, twoDigitYear] = usFormatDateString
    .split('/')
    .map((s) => parseInt(s));

  const zeroIndexedMonth = month - 1;

  return new Date(2000 + twoDigitYear, zeroIndexedMonth, day);
};

export default parseDate;
