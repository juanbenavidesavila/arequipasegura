import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import * as districts from "./reducers/districts/actions";

export const useAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      // ...districts,
      ...districts,
    },
    dispatch
  );
};
