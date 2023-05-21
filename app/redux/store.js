"use client";
import { configureStore } from "@reduxjs/toolkit";
import medicalReducer from "./reducer";
import logInStatus from "./LogReducer";
import searchReducer from "./searchReducer";
import  citasInfo  from "./CitaReducer";

export const store = configureStore({
  reducer: {
    speciality: medicalReducer,
    logStatus: logInStatus,
    search: searchReducer,
    cita:citasInfo,
  },
});
