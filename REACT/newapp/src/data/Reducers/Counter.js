const initialState = {
    counter : 0
}

export default (state = initialState, { type, payload }) => {
  var newState = { ...state};
  switch(type) {
     case "PLUS" : newState.counter++; break;
     case "MINUS" : newState.counter--; break;
  }
  return newState;
}
