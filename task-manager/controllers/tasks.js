const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const taskid = req.params.id;
    const task = await Task.findById(taskid);

    if (!task) {
      return res.status(404).json({ msg: "no task found" });
    }
    res.json({ task });
  } catch (error) {
    res.json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskid = req.params.id;
    const task = await Task.findByIdAndUpdate(taskid, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).json({ msg: "not found" });
    }
    res.send(task);
  } catch (error) {
    res.send({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskid = req.params.id;
    const task = await Task.findByIdAndDelete(taskid);

    if (!task) {
      res.status(404).json({ msg: "not found" });
    }
    res.send(task);
  } catch (error) {
    res.send({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
