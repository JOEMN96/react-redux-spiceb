let initialState = {
  addNewTask: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDNEWTASK":
      console.log("fires");
      return {
        ...state,
        addNewTask: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
