export const apiUrl = "http://localhost:5000";
export const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
  },
};
