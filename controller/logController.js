// const { AppError } = require('../middleware/ErrorHandler');
// const { MongoClient } = require('mongodb');

// exports.getLogs = async (req, res, next) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 50;
//         const skip = (page - 1) * limit;

//         const client = await MongoClient.connect(process.env.MONGODB_URI);
//         const db = client.db();
//         const collection = db.collection('logs');

//         const [logs, total] = await Promise.all([
//             collection.find({})
//                 .sort({ time: -1 })
//                 .skip(skip)
//                 .limit(limit)
//                 .toArray(),
//             collection.countDocuments()
//         ]);

//         await client.close();

//         res.status(200).json({
//             status: 'success',
//             results: logs.length,
//             total,
//             totalPages: Math.ceil(total / limit),
//             currentPage: page,
//             data: logs
//         });
//     } catch (error) {
//         next(new AppError('Error fetching logs', 500));
//     }
// };

const { AppError } = require("../middleware/ErrorHandler");
const { MongoClient } = require("mongodb");

exports.getLogs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 50,
      search = "",
      operation = "",
      startDate,
      endDate,
    } = req.query;
    const skip = (page - 1) * limit;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection("logs");

    // Construct query based on filters
    const query = {};
    if (search) {
      query.$or = [
        { userId: new RegExp(search, "i") },
        { collectionName: new RegExp(search, "i") },
        { operation: new RegExp(search, "i") },
      ];
    }
    if (operation) query.operation = operation;
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch logs with optimized projection (limit returned fields)
    const [logs, total] = await Promise.all([
      collection
        .find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .project({
          userId: 1,
          operation: 1,
          collectionName: 1,
          timestamp: 1,
          documentId: 1,
        })
        .toArray(),
      collection.countDocuments(query),
    ]);

    await client.close();

    res.status(200).json({
      success: true,
      results: logs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      logs,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    next(new AppError("Error fetching logs", 500));
  }
};
