const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Task = require("../models/Task");

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Task.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newTask = await Task.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newTask);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:taskId", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const removeTask = await Task.findById(taskId);
    if (removeTask.userId.toString() === req.user._id) {
      await removeTask.remove();
      return res.send(null);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/:taskId", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    if (taskId === req.body._id) {
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });
      res.send(updatedTask);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
