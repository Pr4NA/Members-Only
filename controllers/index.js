const db = require("../db/queries");

async function indexController(req, res) {
  try {
    // Fetch all messages from the database
    const messages = await db.getAllMess();
    // Render the index view, passing the user and messages
    res.render('index', { user: req.user, messages: messages });
  } catch (err) {
    // Log the error and respond with a generic error message
    console.error("Error fetching messages:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

module.exports = { indexController };
