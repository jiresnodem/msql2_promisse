const success = (code, message, data) => {
  return {
    meta: {
      status: code,
      message,
    },
    data,
  };
};

const error = (code, message, error) => {
  return {
    meta: {
      status: code,
      message,
    },
    error,
  };
};

export default { success, error };
