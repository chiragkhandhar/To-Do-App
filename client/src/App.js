import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Item from "./Components/Item";

// Icons
import { CgAddR } from "react-icons/cg";

const App = () => {
  const [state, setState] = useState({
    toDoList: [],
  });

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = () => {
    axios.get("/api/items").then((items) => {
      setState({ ...state, toDoList: items.data });
    });
  };

  const handleCBChange = (event) => {
    let toDoList = state.toDoList;
    let index = toDoList.findIndex((obj) => obj._id == event.target.name);
    let object = toDoList[index];

    if (event.target.checked) {
      object.isChecked = true;
    } else {
      object.isChecked = false;
    }
    toDoList[index] = object;
    setState({ ...state, toDoList });
  };

  const handleRemove = (event) => {
    let toDoList = state.toDoList;
    let index = toDoList.findIndex((obj) => obj._id == event.target.name);
    let object = toDoList[index];

    if (object.isChecked) {
      toDoList.splice(index, 1);
    }

    setState({ ...state, toDoList });
  };

  const handleChange = (event) => {
    let toDoList = state.toDoList;
    let index = toDoList.findIndex((obj) => obj._id == event.target.name);
    let object = toDoList[index];
    object.item = event.target.value;
    toDoList[index] = object;
    setState({
      ...setState,
      toDoList,
    });
  };

  const addNewItem = () => {
    let objectID = 0;
    objectID = state.toDoList && Math.floor(Math.random() * 1000000);
    const object = {
      _id: objectID,
      item: "",
      isChecked: false,
    };

    let oldList = state.toDoList;
    oldList.push(object);
    setState({ ...state, toDoList: oldList });
  };

  return (
    <div className="App">
      <div className="add-list" onClick={addNewItem}>
        <p className="add-list-title">Add New Item</p>
        <CgAddR className="add-list-icon" />
      </div>

      {state.toDoList.length > 0 && (
        <div className="items-wrapper">
          {state.toDoList.map((listObject) => {
            return (
              <Item
                key={listObject._id}
                listObject={listObject}
                handleCBChange={handleCBChange}
                handleChange={handleChange}
                handleRemove={handleRemove}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
