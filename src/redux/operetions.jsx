import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};
export const logInUser = createAsyncThunk(
  'item/fetchLogInUser',
  async (item, { rejectWithValue }) => {
    try {
      const postItem = {
        email: item.email,
        password: item.password,
      };
      const { data } = await axios.post('/users/login', postItem);
      token.set(data.token);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const logOutUser = createAsyncThunk(
  'item/fetchLogOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      token.unset();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addUser = createAsyncThunk(
  'item/fetchAddUser',
  async (item, { rejectWithValue }) => {
    try {
      const postItem = {
        name: item.name,
        email: item.email,
        password: item.password,
      };
      const { data } = await axios.post('/users/signup', postItem);
      token.set(data.token);
      toast.success(
        `
         Привет 🦄${item.name} ты вошел в аккаунт и теперь можешь воспользоваться контактами `,
        {
          position: 'top-center',
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// First, create the thunk
export const fetchItem = createAsyncThunk(
  'item/fetchItem',
  async (_, { rejectWithValue }) => {
    try {
      const items = await axios.get('/contacts');
      return items.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addItem = createAsyncThunk(
  'item/fetchAddItem',
  async (item, { rejectWithValue }) => {
    try {
      const postItem = { name: item.name, number: item.number };
      const post = await axios.post('/contacts', postItem);
      return post.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeItem = createAsyncThunk(
  'item/fetchRemove',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
