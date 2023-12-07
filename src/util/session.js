import axios from "axios"

export const login = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {...user}, {headers: {"Content-Type":"application/json"}})
    return response;
  } catch (error){
    return { data: {success:false, message: error.message} }
  }
};

export const logout = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
    return resp;
  } catch (error){
    return { success:false, message:error.message }
  }
};

export const checkLoggedIn = async preloadedState => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/show-current-user`);
      
      let user;
      if(response.data.success){
        user = response.data.data
      }

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