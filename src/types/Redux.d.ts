declare module "@alerta-ciudadana/redux" {
  import { createAsyncThunk, PayloadAction as _PayloadAction } from "@reduxjs/toolkit";

  interface ResponseApi<Payload> {
    data: {
      code: number;
      message: string;
      data: Payload;
    };
    status: number;
    headers: {
      "content-type": string;
      "cache-control": string;
    };
  }

  interface PayloadAction<T> extends _PayloadAction<T> {
    meta: {
      arg: any;
      requestId: string;
      requestStatus: string;
    };
  }

  interface FnReducer<State, Payload> {
    [key: string]: (state: State, payload: PayloadAction<Payload>) => void;
  }
}
