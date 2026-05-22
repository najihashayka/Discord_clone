export const getApiError = (err, fallback = 'Something went wrong') => {
  if (err.response?.status === 503) {
    return err.response.data?.message || 'Server is starting, try again in a few seconds';
  }
  if (err.code === 'ECONNABORTED') {
    return 'Request timed out. Make sure you ran: npm run dev';
  }
  if (!err.response) {
    return 'Server not running. Open terminal and run: npm run dev';
  }
  return err.response?.data?.message || fallback;
};
