import { logoutAsync } from "../containers/auth/redux/authApi";
import { AuthMap } from "../containers/auth/redux/authAction";

export default function setupAxios(axios, store) {
  const requestHandler = (request) => {
    const {
      auth: { authToken },
    } = store.getState();

    request.headers["Authorization"] = authToken;

    return request;
  };

  axios.interceptors.request.use((request) => requestHandler(request));

  const responseSuccessHandler = (response) => {
    const { data } = response;
    const { auth } = store.getState();
    
    if (auth.authToken && (data.responseCode === 404 || data.responseCode === 403)) {
      localStorage.clear();
      store.dispatch({
        type: AuthMap.UPDATE_LOGOUT_STATUS,
      });
      return;
    }
    return response;
  };

  axios.interceptors.response.use(
    (response) => responseSuccessHandler(response),
    (error) => Promise.reject(error)
  );

  /* axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = authToken;
      }

      return config;
    },
    (err) => Promise.reject(err)
  ); */
}
