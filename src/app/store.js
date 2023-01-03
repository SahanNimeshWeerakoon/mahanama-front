import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from '../features/vehicle/vehicleSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    auth: authReducer
  },
});
