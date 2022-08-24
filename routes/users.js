const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut);

router.post("/", usersPost);

router.delete("/", usersDelete);

router.patch("/", usersPatch);

module.exports = router;
