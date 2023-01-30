import React from "react";
import { Badge } from "@mui/material";
import { FaList } from "react-icons/fa";
import { TodoContext } from "../../../Context";

export default function TodoButton() {
  var todoContext = React.useContext(TodoContext);
  return React.createElement(
    Badge,
    { badgeContent: todoContext.todo.tasks.length, color: "primary" },
    React.createElement(FaList, null)
  );
}