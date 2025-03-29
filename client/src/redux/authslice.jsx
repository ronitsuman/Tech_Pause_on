// function hai create slice
import { createSlice } from "@reduxjs/toolkit";

// ek object hai jo redux store ka initial state define karega
const initialState = {
    token: localStorage.getItem("token") || null,
    person: (() => {
        const storedPerson = localStorage.getItem("person");
        if (storedPerson && storedPerson !== "undefined") {
          try {
            return JSON.parse(storedPerson);
          } catch (error) {
            console.error("Error parsing person data:", error);
          }
        }
        return null;
      })(),
      
  };

// create slice ka use karke ek redux slice bana rahe hain
const authSlice = createSlice({
  // `auth` naam diya jo Redux store me `auth` reducer ke naam se dikhai dega
  name: "auth",
  initialState,
  reducers: {
    // ✅ Login Reducer => dispatch(loginSuccess({ token, person }))
    // loginSuccess ek reducer hai jo login hone ke baad Redux state update karega.
    // state.token me JWT token store kar raha hai.
    // state.person me person ka data store kar raha hai.
    // localStorage.setItem("token", action.payload.token);
    // LocalStorage me token save kar rahe hain taaki page refresh hone par token na delete ho.
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.person = action.payload.person; //  
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("person", JSON.stringify(action.payload.person)); // data save karna
    },

    //  Logout Reducer => dispatch(logout())
    // Jab user logout karega, tab token aur person ko null kar raha hai.
    // localStorage.removeItem("token") se localStorage me saved token ko delete kar raha hai.
    // Iska fayda: Logout hone ke baad Redux state aur localStorage dono clean ho jayenge.
    logout: (state) => {
      state.token = null;
      state.person = null; //  `user` ki jagah `person`
      localStorage.removeItem("token");
      localStorage.removeItem("person");
    },
    updateProfilePic: (state, action) => {
      if (state.person) {
          state.person.profilePic = action.payload;
          localStorage.setItem("person", JSON.stringify(state.person));
      }
  },
  },
});

// Redux actions export kar rahe hain
export const { loginSuccess, logout,updateProfilePic } = authSlice.actions;

// Redux reducer export kar rahe hain
export default authSlice.reducer;
