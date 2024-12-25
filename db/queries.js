// const { get } = require("../router/log-in");
const pool = require("./pool");
const bcrypt = require("bcryptjs");



async function insertUser(username, password, isMember) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
          INSERT INTO users (username, password, is_member)
          VALUES ($1, $2, $3)
        `;
        const values = [username, hashedPassword, isMember || false ];
        
        // Insert user into the database
        await pool.query(query, values);
        console.log('User inserted successfully');
    } catch (err) {
        console.error('Error inserting user:', err);
    }
}
  // Assuming pool is set up elsewhere
// const { now } = require('your-time-helper'); // Use a helper or Date.now()

// Insert a new message into the database
async function insertMess(title, message, username, is_member) {
  const query = `
    INSERT INTO messages (title, message, created_by, is_member, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  const values = [title, message, username, is_member]; // Prepare the data

  try {
    await pool.query(query, values); // Execute the query
  } catch (err) {
    console.error("Error inserting message:", err); // Log error in case of failure
    throw new Error("Failed to insert message into the database");
  }
}


async function getAllMess() {
    const query = `
        SELECT * FROM messages
        ORDER BY created_at DESC;
    `;
    
    const result = await pool.query(query);
    return result.rows;
}


module.exports = {
    insertUser,
    insertMess,
    getAllMess
}


