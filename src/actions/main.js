import contants from "../constants";

export const setLoading = (loading) => {
  return {
    type: contants.main.SET_LOADING,
    payload: loading,
  };
};

export const setError = (error) => {
  return {
    type: contants.main.SET_ERROR,
    payload: error,
  };
};

export const setFilterby = (filter) => {
  return {
    type: contants.main.SET_FILTER,
    payload: filter,
  };
};

export const setLabel = (label) => {
  return {
    type: contants.main.SET_LABEL,
    payload: label,
  };
};

export const setStatus = (status) => {
  return {
    type: contants.main.SET_STATUS,
    payload: status,
  };
};
