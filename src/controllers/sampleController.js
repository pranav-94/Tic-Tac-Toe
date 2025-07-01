// src/controllers/sampleController.js

exports.getSample = (req, res, next) => {
  try {
    // Simulate a simple data retrieval or process
    const data = {
      message: "Hello from sample API!",
      timestamp: new Date().toISOString()
    };
    res.status(200).json(data);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
