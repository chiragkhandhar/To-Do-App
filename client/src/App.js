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
    api_getAllItems();
  }, []);

  const api_getAllItems = () => {
    axios.get("/api/items").then((items) => {
      setState({ ...state, toDoList: items.data });
    });
  };

  const api_addNewItem = (item) => {
    axios
      .post("/api/item", item)
      .then((res) => {
        console.log(res);
        api_getAllItems()
      })
      .catch((err) => {
        console.log(err);
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
    const object = {
      item: "",
      isChecked: false,
    };
    api_addNewItem(object);
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
