import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

// Get All Tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
};

// Delete Task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
