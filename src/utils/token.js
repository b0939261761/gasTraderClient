const jwtDecode = token => {
  if (!token) return;
  const payload = (token.match(/(?:\.(.*)\.)/) || [])[1];

  try {
    return payload && JSON.parse(window.atob(payload));
  } catch {
    return;
  }
};

export const getTokenData = token => {
  if (!token) return {};
  const tokenData = jwtDecode(token);
  if (tokenData) return { token, ...tokenData };
  return {};
};

export default {
  getTokenData
};
