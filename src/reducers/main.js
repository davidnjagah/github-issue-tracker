import contants from "../constants";

const initialState = {
  loading: false,
  error: false,
  query: "",
  filter: "CREATED_AT",
  label: null,
  status: null,
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case contants.main.SET_LOADING:
      return { ...state, loading: action.payload };
    case contants.main.SET_ERROR:
      return { ...state, loading: action.payload };
    case contants.main.SET_FILTER:
      return { ...state, filter: action.payload };
    case contants.main.SET_LABEL:
      return { ...state, label: action.payload };
    case contants.main.SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default main;
