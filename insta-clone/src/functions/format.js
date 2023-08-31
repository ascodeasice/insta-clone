const capitalize = (str) => {
  if (typeof str !== 'string') {
    return;
  }
  return str.toUpperCase();
}

const shortenTimeStr = (str) => {
  const replaceWords = [['second', 's'], ['minute', 'm'], ['hour', 'h'], ['day', 'd'], ['month', 'mon'], ['year', 'y']]

  replaceWords.forEach(pair => {
    str = str.replace(`${pair[0]}s`, pair[1]).replace(pair[0], pair[1]);
  })
  return str
}

export { capitalize, shortenTimeStr };