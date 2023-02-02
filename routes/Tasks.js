const { Tasks } = require("../models/Tasks.js");
const { Users } = require("../models/Users.js");
const { Router } = require("express");
const router = Router();

router.get("/task", async (req, res) => {
  try {
    const allTasks = await Tasks.findAll();
    res.send("las tareas son:", allTasks);
  } catch (error) {
    console.error(error);
  }
});

router.post("/task", async (req, res) => {
  try {
    const { name, content, done, user_id } = req.body;

    const newTask = await Tasks.create({
      name,
      content,
      done,
      user_id,
    });

    res.send(newTask);
  } catch (err) {}
});

router.delete("/task", async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.destroy({
      where: {
        id,
      },
    });
    res.send("Task deleted");
  } catch (err) {
    console.error("EL ERROR ES:", err);
  }
});

module.exports = router;
