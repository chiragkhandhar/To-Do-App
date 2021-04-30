import React, { Component } from "react";
import "../Styles/Item.css";

// MUI Stuff
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export class Item extends Component {
  state = {
    isEdit: false,
  };
  toggleEditMode = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };
  render() {
    const {
      listObject,
      handleCBChange,
      handleChange,
      handleRemove,
    } = this.props;
    const { isEdit } = this.state;

    return (
      <div className="al-list-item">
        <Checkbox
          checked={listObject.isChecked}
          onChange={handleCBChange}
          name={listObject.id}
          color="primary"
        />
        {!listObject.isChecked ? (
          !isEdit ? (
            <Typography
              variant="body1"
              onClick={this.toggleEditMode}
              label="Click to edit"
            >
              {listObject.item === "" ? "Click to edit" : listObject.item}
            </Typography>
          ) : (
            <>
              <TextField
                name={listObject.id}
                variant="outlined"
                value={listObject.item}
                onChange={handleChange}
                autoFocus
              />
              <button onClick={this.toggleEditMode} className="save-btn">Save</button>
            </>
          )
        ) : (
          <>
            <Typography
              variant="body1"
              onClick={this.toggleEditMode}
              label="Click to edit"
              className = "strikeout"
            >
              {listObject.item === "" ? "Uncheck to edit" : listObject.item}
            </Typography>

            <button name={listObject.id} onClick={handleRemove} className="remove-btn">
              Remove
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Item;
