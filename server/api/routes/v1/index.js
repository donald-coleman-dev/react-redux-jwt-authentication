const express = require("express");
const authRoutes = require("./auth.route");
const roleRoutes = require("./role.route");
const router = express.Router();

/**
 * API status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * Auth
 */
router.use("/auth", authRoutes);

/**
 * Roles
 */
router.use("/roles", roleRoutes);

module.exports = router;
