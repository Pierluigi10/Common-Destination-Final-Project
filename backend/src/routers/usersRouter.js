import bcrypt from "bcrypt";
import express from "express";
import * as usersController from "../controllers/usersController.js";


const saltRounds = 8;

const usersRouter = express.Router();

const userIsInGroup = (user, accessGroup) => {
  const accessGroupArray = user.accessGroups.split(",").map((m) => m.trim());
  return accessGroupArray.includes(accessGroup);
};

// CREATE/SIGNUP
usersRouter.post("/signup", async (req, res) => {
  const users = await usersController.readAllUsers();
  // console.log(users);
  const frontendUser = req.body;
  frontendUser.username.trim() === "" ||
  frontendUser.password1.trim() === "" ||
  frontendUser.password1 !== frontendUser.password2
    ? // res.sendStatus(403);
      res.status(500).send({ error: "the two passwords are different" })
    : bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(frontendUser.password1, salt, async (err, hash) => {
          const backendUser = {
            username: frontendUser.username,
            email: frontendUser.email,
            hash,
            accessGroups: "loggedInUsers",
            favoriteTrips: [],
          };

          const isNewUser = users.find(
            (element) =>
              element.username === backendUser.username ||
              element.email === backendUser.email
          );

          if (isNewUser === undefined) {
            const savedDBUser = await usersController.createUser(backendUser);
            res.json({
              savedDBUser,
            });
            let user = await usersController.loginUser({
              username: backendUser.username,
            });
            req.session.user = user;
            req.session.save();
            // res.json(user);
          } else {
            res.sendStatus(403);
          }
        });
      });
});

// LOGIN
usersRouter.post("/login", async (req, res) => {
  // console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username);
  let user = await usersController.loginUser({ username });
  if (!user) {
    user = await usersController.loginUser({
      username: "anonymousUser",
    });
  } else {
    bcrypt.compare(password, user.hash).then((passwordIsOk) => {
      // console.log("22", passwordIsOk);
      if (passwordIsOk) {
        req.session.user = user;
        req.session.save();
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    });
  }
});

// LOGOUT
usersRouter.get("/logout", async (req, res) => {
  req.session.destroy();
  const user = await usersController.findOneUser({ username: "anonymousUser" });
  res.json(user);
});

// CURRENT USER
usersRouter.get("/currentuser", async (req, res) => {
  let user = req.session.user;
  // console.log(req.session.user);
  if (!user) {
    user = await usersController.findOneUser({ username: "anonymousUser" });
  }
  res.json(user);
});

// READ ALL
usersRouter.get("/", async (_req, res) => {
  const users = await usersController.readAllUsers();
  res.json(users);
});

// READ ONE by ID
// usersRouter.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   // console.log(req.params.id);
//   res.json({
//     user: await usersController.readOneUser(id),
//   });
// });

// READ User by username
usersRouter.get("/update/:username", async (req, res) => {
  const username = req.params.username;
  console.log(username);
  const user = await usersController.userByUsername(username);
  res.json(user);
});

// UPDATE
usersRouter.patch("/update/:username", async (req, res) => {
  const username = req.params.username;

  const user = await usersController.userByUsername(username);
  console.log(user);
  const updateFields = req.body;
  console.log(updateFields.password);
  console.log("333", updateFields);
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(updateFields.passwordNew, salt);

  const updateUser = {
    _id: user.id,
    username: updateFields.username,
    email: updateFields.email,
    hash,
    accessGroups: "loggedInUsers",
  };
  console.log("update", updateUser);
  const dbuser = await usersController.updateUser(user.id, updateUser);
  const passwordIsOk = await bcrypt.compare(updateFields.password, user.hash);
  console.log(passwordIsOk);
  if (passwordIsOk && updateFields.username.trim() !== "") {
    res.json({
      userAdded: dbuser,
    });
  } else {
    res.status(500).send("error");
  }
});

// DELETE without permission
usersRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await usersController.deleteUser(id);
  res.json({
    result,
  });
});

// DELETE with permission (admin)
usersRouter.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let user = req.session.user;
  console.log(user);
  if (!userIsInGroup(user, "admins")) {
    res.sendStatus(403);
  } else {
    const user = await usersController.deleteUser(id);
    res.json(user);
  }
});

export { usersRouter };
