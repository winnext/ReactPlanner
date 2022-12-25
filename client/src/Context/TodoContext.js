import React, { useEffect, useState } from "react";
import axios from "axios";

export const TodoContext = React.createContext();

export default function TodoContextProvider(props) {
  const [todo, setTodo] = useState({
    tasks: [],
    planKey: "",
  });

  const getTodo = () => {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    setTodo({
      ...todo,
      planKey: key,
    });
    axios
      .get("http://localhost:9001/todo/" + key)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (props.user.auth) {
      getTodo();
    }
  }, [props.user.auth]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        getTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}
