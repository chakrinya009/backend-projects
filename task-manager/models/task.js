const mongoose = require("mongoose");
const schema = mongoose.Schema;
const TaskSchema = new schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "max lenght is  20 only"],
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
