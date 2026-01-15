/**
 * Redux Store Configuration
 * Centralized state management setup
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import notificationReducer from './slices/notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  notifications: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;

export default store;
