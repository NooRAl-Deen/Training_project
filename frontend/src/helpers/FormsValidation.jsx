const isObjectEmpty = (object) => {
  for(let key in object) {
    if(!object[key]) {
      return true;
    }
  }
  return false;
}

export {
  isObjectEmpty
}