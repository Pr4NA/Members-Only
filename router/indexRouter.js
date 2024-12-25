const { Router } = require("express");
const indexRouter = Router();

const {indexController} = require('../controllers/index') ;

indexRouter.get("/",indexController) ;

module.exports = indexRouter ;