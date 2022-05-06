export function displayDate(data) {
  const date = new Date(data).toLocaleDateString();
  const time = new Date(data).toLocaleTimeString().slice(0, -3);

  return time + " / " + date;
}
