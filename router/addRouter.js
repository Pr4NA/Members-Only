const { Router } = require("express");
const addRouter = Router();

const {addRouterpost, addNew} = require('../controllers/add') ;

addRouter.get("/",addNew) ;
addRouter.post("/",addRouterpost) ;

module.exports = addRouter ;