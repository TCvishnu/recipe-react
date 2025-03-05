export const getImageURL = (imagePath) => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  return backendURL + imagePath;
};
