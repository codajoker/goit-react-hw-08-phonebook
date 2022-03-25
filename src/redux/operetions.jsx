import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://6214d79989fad53b1f210931.mockapi.io/';

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
      const postItem = { name: item.name, phone: item.number };
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
