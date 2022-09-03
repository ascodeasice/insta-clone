const capitalize = (str) => {
  if (typeof str !== 'string') {
    return;
  }
  return str.toUpperCase();
}

export { capitalize };