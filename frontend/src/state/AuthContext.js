import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// 初期状態にユーザーデータを設定
const initialState = {
  user: {
    _id: "668109c8555d2fa257d83e9c",
    username: "kishi",
    email: "kishi@ms.dendai.ac.jp",
    password: "1021",
    profilePicture: "/person/1.jpeg",
    followers: [],
    followings: [],
    isAdmin: false,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
