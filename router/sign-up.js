const { Router } = require("express");
const SignUpRouter = Router();

const {SignUpget, SignUppost, validateSignUp} = require('../controllers/sign-up') ;

SignUpRouter.get("/",SignUpget) ;
SignUpRouter.post("/", validateSignUp, SignUppost) ;

module.exports = SignUpRouter ;

