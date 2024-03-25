import { combineReducers } from "@reduxjs/toolkit";

import sortKeys from "sort-object-keys";

import districts from "./districts/districts.reducer";

const reducers = sortKeys({ districts });

export const rootReducer = combineReducers(reducers);

export type RootStore = ReturnType<typeof rootReducer>;
