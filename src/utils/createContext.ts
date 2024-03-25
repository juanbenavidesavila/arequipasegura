import { createContext as _createContext, Context } from "react";

export const createContext = <IContext>() => _createContext<IContext | null>(null) as Context<IContext>;
