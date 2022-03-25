import { createReducer, createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { addItem, fetchItem, removeItem } from './operetions';
import { changeFilter } from './redux-action';
// export const item = createReducer([], {
//   [addItem.fulfilled]: (state, action) => {
//     console.log(action.payload);
//     return [...state, action.payload].sort((firstStudent, secondStudent) =>
//       firstStudent.name.localeCompare(secondStudent.name)
//     );
//   },
//   [removeItem.fulfilled]: (state, action) => {
//     console.log(
//       [...state.filter(item => item.id !== action.payload)].sort(
//         (firstStudent, secondStudent) =>
//           firstStudent.name.localeCompare(secondStudent.name)
//       )
//     );
//     return [...state.filter(item => item.id !== action.payload)].sort(
//       (firstStudent, secondStudent) =>
//         firstStudent.name.localeCompare(secondStudent.name)
//     );
//   },
//   [fetchItem.fulfilled]: (state, action) => {
//     console.log(action);
//     return [
//       ...state,
//       ...action.payload.sort((firstStudent, secondStudent) =>
//         firstStudent.name.localeCompare(secondStudent.name)
//       ),
//     ];
//   },
// });
// export const filter = createReducer('', {
//   [changeFilter]: (state, action) => {
//     return action.payload;
//   },
// });
// export const loader = createReducer(false, {
//   [addItem.pending]: () => true,
//   [addItem.fulfilled]: () => false,
//   [addItem.rejected]: () => false,
//   [removeItem.pending]: () => true,
//   [removeItem.fulfilled]: () => false,
//   [removeItem.rejected]: () => false,
//   [fetchItem.pending]: () => true,
//   [fetchItem.rejected]: () => false,
//   [fetchItem.fulfilled]: () => false,
// });

// export default combineReducers({ item, filter, loader });

const itemSlice = createSlice({
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
export default itemSlice.reducer;
export const { changeFilterr } = itemSlice.actions;
