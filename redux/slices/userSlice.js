import { createSlice } from '@reduxjs/toolkit';
import profiles from '../../public/profiles.json';
const userSlice = createSlice({
  name: 'userSlice',
  initialState: { isLoading: true, profiles },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = false;
    },
    addUser: (state, action) => {
      console.log('payload', action.payload);
      state.profiles.unshift({
        id: state.profiles.length + 1,
        ...action.payload,
      });
    },
    deleteUser: (state, action) => {
      const newUsers = state.profiles.filter(
        (profile) => profile.id != action.payload.id
      );
      state.profiles = newUsers;
    },
    updateUser: (state, action) => {
      const userIndex = state.profiles.findIndex(
        (profile) => profile.id == action.payload.id
      );
      state.profiles.splice(userIndex, 1, action.payload);
    },
  },
});
export const { setLoading, addUser, deleteUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
