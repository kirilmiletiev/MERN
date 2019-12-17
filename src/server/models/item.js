const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: { validator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value), message: 'Username should consist only english letters and digits!' }
  },
  description: {
    type: String,
    required: true,
    validate: { validator: (value) => /^[a-zA-Z0-9]{1,}$/.test(value), message: 'For description use only min. one(1) english letter and digit!' }
  },
  duration: {
    type: Number,
    required: true,
    min: [0, 'Duration must be a positive number']
  },
  date: {
    type: Date,
    // required: true,
    // min: Date.now()
  },
  isSomeCond: {
    type: Boolean
  },
  price: {
    type: Number,
    min: [0, 'Price must be a positive number']
  },
  location: {
    type: String
  },
  url: {
    type: String
  },
  category: {
    type: String,
  },
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true, });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;