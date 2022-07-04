const { Router } = require("express");

const { getTracks } = require("../../controllers/api/explore");

const router = Router();

router.post("/", getTracks);

module.exports = router;
