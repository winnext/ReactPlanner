import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ContentTitle,
  ContentContainer,
  FormSubmitButton,
  CancelButton,
  DeleteButton,
} from "../style/export";
import { Alert, Button, CircularProgress } from "@mui/material";

import { TodoContext } from "../../Context";
import axios from "axios";

export default function Todo(props, context) {
  let { width, height } = props;
  let { projectActions, translator } = context;
  const [loadingCheck, setLoadingCheck] = React.useState(false);

  const todoContext = React.useContext(TodoContext);

  const Check = () => {
    setLoadingCheck(true);
    axios
      .post("http://localhost:9001/todo/check", {
        planKey: todoContext.todo.planKey,
      })
      .then((res) => {
        todoContext.setTodo(res.data);
        setLoadingCheck(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCheck(false);
      });
  };

  return (
    <ContentContainer width={width} height={height}>
      <ContentTitle>{translator.t("Todo")}</ContentTitle>
      <Button onClick={Check} variant="contained">
        {loadingCheck ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Check"
        )}
      </Button>

      <div>
        {todoContext.todo.tasks.map((task, index) => (
          <React.Fragment key={index}>
            {task.type === "space" && (
              <Alert sx={{ margin: "10px 0" }} severity="warning" key={index}>
                <b>Space: </b>{task.spaceName} needs to be added to the plan
              </Alert>
            )}
            {task.type === "component" && (
              <Alert sx={{ margin: "10px 0" }} severity="info" key={index}>
                <b>Component: </b>{task.componentName} needs to be added to the space of {task.spaceName}
              </Alert>
            )}
          </React.Fragment>
        ))}
      </div>
    </ContentContainer>
  );
}

Todo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

Todo.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
