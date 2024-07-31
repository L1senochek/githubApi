import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './slices/selectedItemsSlice';
import { api } from '../api/api';

const rootReducer = combineReducers({
  selectedItems: selectedItemsSlice.reducer,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export default store;
