import React from "react";
import AreaContextProvider,{AreaContext} from "./AreaContext";

export default function ContextProvider(props) {
  return (
    <AreaContextProvider>
      {props.children}
    </AreaContextProvider>
  );
}

export {
  AreaContext
}