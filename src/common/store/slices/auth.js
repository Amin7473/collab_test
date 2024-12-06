const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  accessToken: null,
  // refreshToken: null,
  sessionExpired: false,
  user: null,
  isMobile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addTokens(state, action) {
      console.log(action.payload)
      state.accessToken = action.payload.accessToken;
      // state.refreshToken = action.payload.refreshToken;
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    removeTokens(state) {
      state.accessToken = null;
      state.user = null;
    },
    toggleSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    },
    handleMobileScreen: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const {
  addTokens,
  addUser,
  removeTokens,
  toggleSessionExpired,
  handleMobileScreen,
} = authSlice.actions;
export default authSlice.reducer;
