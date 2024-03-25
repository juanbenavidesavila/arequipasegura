import { District } from "@alerta-ciudadana/entity";
import { createSlice } from "@reduxjs/toolkit";
import { districtsReducers } from "./actions/get";

export interface InitialState {
  districts: District[];
}

const initialState = {
  districts: [],
} as InitialState;

const districtsSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {},
  extraReducers: {
    ...districtsReducers,
  },
});

export default districtsSlice.reducer;
