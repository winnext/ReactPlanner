import React from "react";
import { Badge } from "@mui/material";
import { FaList } from "react-icons/fa";
import { TodoContext } from "../../../Context";

export default function TodoButton() {
  const todoContext = React.useContext(TodoContext);
  return (
    <Badge badgeContent={todoContext.todo.tasks.length} color="primary">
      <FaList />
    </Badge>
  );
}
