const { body, validationResult } = require('express-validator');
const db = require("../db/queries");

// Validation rules for the sign-up form
const validateSignUp = [
  body('username')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('ConfirmPassword')
    .custom((value, { req }) => value === req.body.password || 'Passwords must match'),

  body('membership')
    .optional()
    // .isLength({ min: 4 }).withMessage('Passcode must be at least 4 characters')
];

// GET request for the sign-up page
async function SignUpget(req, res, next) {
  try {
    res.render("sign-up", {
      errors: null,
      formData: {} // Send empty data on first load
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
}

// POST request for submitting the sign-up form
async function SignUppost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If there are validation errors, render the form again with errors
    return res.render('sign-up', {
      errors: errors.array(),
      formData: req.body // Keep the data entered by the user
    });
  }

  try {
    const { username, password, membership } = req.body;
    let isMember = false;

    // Check if the passcode matches
    if (membership === '1234') {
      isMember = true;
    }

    // Call the database query to insert the new user
    await db.insertUser(username, password, isMember);
    
    // After successful sign-up, redirect to the home page
    res.redirect('/');
  } catch (err) {
    console.error("Error in sign-up:", err);
    next(err); // Pass the error to the global error handler
  }
}

module.exports = { SignUpget, SignUppost, validateSignUp };
