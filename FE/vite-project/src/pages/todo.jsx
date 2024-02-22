import React, { useEffect } from "react";
import "./todo.scss";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../store/slice/todo.slice.js";
export default function todo() {
  const listTodo = useSelector((store) => store.todoReducer);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoTitle = e.target.todo.value;
    if (!todoTitle) {
      return alert("Content is not empty ");
    }
    const data = {
      todo_title: todoTitle,
    };
    try {
      const res = await axios.post("http://localhost:3000/api/v1/todo", data);
      console.log("ADD", res.data);
      dispatch(todoAction.add(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/todo/${id}`);
      dispatch(todoAction.delete(res));
    } catch (error) {
      return error;
    }
  };
  const handleUpdate = async (id) => {
    let todo_title = prompt("Update your content");
    const checkbox = document.getElementById("checkbox");
    const status = checkbox.checked;
    console.log("status", status);

    const data = {
      todo_title,
      status,
    };
    const res = await axios.patch(
      `http://localhost:3000/api/v1/todo/${id}`,
      data
    );
    console.log(res.data);
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/api/v1/todo")
        .then((res) => {
          dispatch(todoAction.showData(res.data));
        })
        .catch((error) => {
          return error;
        });
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <p>Get things done, one items at a time</p>
      </div>
      <hr />
      <div>
        <ul className="list">
          {listTodo.data?.map((todo, index) => {
            return (
              <li className="list-item" key={index}>
                <p>{todo.todo_title}</p>
                <div className="handle">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="checkbox"
                  />
                  <span
                    onClick={() => {
                      handleUpdate(todo.id);
                    }}
                  >
                    Edit
                  </span>

                  <i
                    className="fa fa-trash"
                    onClick={() => {
                      handleDelete(event, todo.id);
                    }}
                  ></i>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="">
          <p>Add to the todo list</p>
          <form onSubmit={handleSubmit} className="form">
            <input type="text" className="todo" name="todo" />
            <button className="btn" type="submit">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
