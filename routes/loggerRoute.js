// const express = require("express");
// const AuditLog = require("../model/auditLog");
// const router = express.Router();

// // Fetch all audit logs
// router.get("/audit/logs", async (req, res) => {
//   try {
//     const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(50); // Get last 50 logs
//     res.json({ success: true, logs });
//   } catch (error) {
//     console.error("Error retrieving audit logs:", error);
//     res.status(500).json({ success: false, message: "Error retrieving logs" });
//   }
// });

// module.exports = router;
