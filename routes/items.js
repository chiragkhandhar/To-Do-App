const { request, response } = require("express");

const Item = require("../models/item.model");

exports.getAllItems = (request, response) => {
  Item.find()
    .then((items) => {
      response.status(200).json(items);
    })
    .catch((err) =>
      response.status(500).json({ code: "INTERNAL_SERVER_ERROR", err: err })
    );
};

exports.addItem = (request, response) => {
  const item = {
    item: request.body.item,
    isChecked: request.body.isChecked,
  };

  const newItem = new Item(item);

  newItem
    .save()
    .then(() => response.status(200).json({ code: "SUCCESS" }))
    .catch((err) => {
      console.log(err);
      response.status(500).json({ code: "INTERNAL SERVER ERROR" });
    });
};
