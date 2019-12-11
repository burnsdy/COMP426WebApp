let token = localStorage.getItem('token');

export const getToken = () => {
  return token;
};

export const setToken = (t) => {
  token = t;
  localStorage.setItem('token', t);
};
