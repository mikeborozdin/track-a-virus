const average = (input: number[]) =>
  input.reduce((total, current) => total + current, 0) / input.length;

export default average;
