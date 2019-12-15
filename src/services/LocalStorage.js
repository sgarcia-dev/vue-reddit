export { get, set };

function get(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function set(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}
