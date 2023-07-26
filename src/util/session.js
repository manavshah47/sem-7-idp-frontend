import axios from "axios"

export const login = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {...user}, {headers: {"Content-Type":"application/json"}})
    return response;
  } catch (error){
    return { data: {success:false, message: error.message} }
  }
};

export const logout = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/logout`)
    const resp2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/logout`)
    return resp.data.success ? resp : resp2;
  } catch (error){
    return { success:false, message:error.message }
  }
};

export const checkLoggedIn = async preloadedState => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/show-user-info`);
      const response2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/show-admin-info`);
      const user = response.data.success ? response.data.data : response2.data.data
      preloadedState = {};
      if (user) {
        preloadedState = {
          session: user
        };
      }
      return preloadedState;
    } catch (error){
      return preloadedState;
    }
  };