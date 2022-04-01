import { createSlice } from '@reduxjs/toolkit';

import {
  addItem,
  fetchItem,
  removeItem,
  addUser,
  logInUser,
  logOutUser,
} from './operetions';

export const itemSlice = createSlice({
  name: 'item',
  initialState: { filter: '', item: [], loader: false },
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [addItem.fulfilled]: (state, action) => {
      state.loader = false;
      state.item = [...state.item, action.payload].sort(
        (firstStudent, secondStudent) =>
          firstStudent.name.localeCompare(secondStudent.name)
      );
    },
    [removeItem.fulfilled]: (state, action) => {
      state.loader = false;
      state.item = [
        ...state.item.filter(item => item.id !== action.payload),
      ].sort((firstStudent, secondStudent) =>
        firstStudent.name.localeCompare(secondStudent.name)
      );
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.loader = false;
      state.item = action.payload.sort((firstStudent, secondStudent) =>
        firstStudent.name.localeCompare(secondStudent.name)
      );
    },
    [addItem.pending]: state => {
      state.loader = true;
    },

    [addItem.rejected]: state => {
      state.loader = false;
    },
    [removeItem.pending]: state => {
      state.loader = true;
    },

    [removeItem.rejected]: state => {
      state.loader = false;
    },
    [fetchItem.pending]: state => {
      state.loader = true;
    },
    [fetchItem.rejected]: state => {
      console.log(fetchItem);

      state.loader = false;
    },
  },
});
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { email: null, password: null, name: null },
    token: null,
    logIn: false,
    isFetchingCurrentUser: false,
  },

  extraReducers: {
    [addUser.fulfilled]: (state, action) => {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.token = action.payload.token;
      state.logIn = true;
    },
    [addUser.rejected]: (state, action) => {
      alert('Что-то пошло не так повторите ');
      state.logIn = false;
    },

    [logInUser.fulfilled]: (state, action) => {
      console.log(action);
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.token = action.payload.token;
      state.logIn = true;
      state.isFetchingCurrentUser = false;
    },
    [logOutUser.fulfilled]: state => {
      state.user.email = null;
      state.user.name = null;
      state.token = null;
      state.logIn = false;
    },

    [logInUser.rejected]: state => {
      alert('Что-то пошло не так повторите ');
      state.logIn = false;
      state.isFetchingCurrentUser = false;
    },
    [logInUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
  },
});
export const { changeFilter } = itemSlice.actions;
