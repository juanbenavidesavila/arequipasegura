import { configureStore } from "@reduxjs/toolkit";
import { useSelector as _useSelector, TypedUseSelectorHook } from "react-redux";
import { rootReducer, RootStore } from "./reducers/reducers";

const store = configureStore({
  reducer: rootReducer,
});

export { store };

export const useSelector: TypedUseSelectorHook<RootStore> = _useSelector;
