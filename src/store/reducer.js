let initialState = {
  addNewTask: false,
  dropDownData: [],
  error: false,
  tasks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDNEWTASK":
      return {
        ...state,
        addNewTask: action.payload,
        updateData: null,
      };

    case "POPULATEDROPDOWN":
      return {
        ...state,
        dropDownData: action.payload,
      };

    case "ADDTASKANDCLOSE":
      return { ...state, addNewTask: action.payload.Close };

    case "POSTERROR":
      return { ...state, postError: true };

    case "NOERROR":
      return { ...state, postError: false };

    case "ALLTASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "UPDATE":
      return {
        ...state,
        updateData: action.payload,
        addNewTask: action.payload.addNewTask,
      };

    default:
      return state;
  }
};

export default reducer;
