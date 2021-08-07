let initialState = {
  addNewTask: false,
  dropDownData: [],
  error: false,
  tasks: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDNEWTASK":
      return {
        ...state,
        addNewTask: action.payload,
        updateData: null,
        loading: false,
      };

    case "POPULATEDROPDOWN":
      return {
        ...state,
        dropDownData: action.payload,
      };

    case "ADDTASKANDCLOSE":
      return { ...state, addNewTask: action.payload.Close, loading: false };

    case "POSTERROR":
      return { ...state, postError: true, loading: false };

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
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
