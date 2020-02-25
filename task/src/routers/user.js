const express = require("express");
const User = require("../models/user");
const router = new express.Router();

// app.post('/users', (req, res) => {
//   const user = new User(req.body);

//   user.save().then(() => {
//     res.status(201).send(user)
//   }).catch((e) => {
//     res.status(400).send(e)
//   })
// });

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// app.get('/users', (req, res) => {
//   User.find({}).then((users) => {
//     res.send(users)
//   }).catch((e) => {
//     res.status(500).send(e);
//   })
// })

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send.status(500).send(e);
  }
});

// app.get('/users/:id', (req, res) => {
//   const _id = req.params.id

//   User.findById(_id).then((user) => {
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   }).catch((e) => {
//     res.status(500).send()
//   })
// })

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// app.post('/tasks', (req, res) => {
//   const task = new Task(req.body);

//   task.save().then(() => {
//     res.status(201).send(task)
//   }).catch((e) => {
//     res.status(400).send(e)
//   })
// });

module.exports = router;
