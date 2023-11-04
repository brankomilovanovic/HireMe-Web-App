import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './Slices/NotificationSlice';
import authSlice from './Slices/AuthSlice';
import locationSlice from './Slices/LocationSlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        notifications: notificationSlice,
        location: locationSlice
    },
})
