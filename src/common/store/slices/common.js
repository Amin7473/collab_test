const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  addPopup: { status: false, helperData: null },
};

const commonSlice = createSlice({
  name: 'ct_common',
  initialState,
  reducers: {
    openAddPopup(state, action) {
      state.addPopup.status = true;
      state.addPopup.helperData = action.payload;
    },
    closeAddPopup(state) {
      state.addPopup.status = false;
      state.addPopup.helperData = null;
    },
  },
});
export const {
  openAddPopup,
  closeAddPopup,
} = commonSlice.actions;
export default commonSlice.reducer;
