import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" }); // dispatch(LoginStart(user)) こちらでも可です。
  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); // dispatch(LoginSuccess(user)) こちらでも可です。
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err }); // dispatch(LoginError(err)) こちらでも可です。
  }
};
