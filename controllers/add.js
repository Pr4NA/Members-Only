const db = require("../db/queries") ;

function addNew(req,res ) {
    try {
        console.log(req.user.username) ;
        console.log('Hello') ;
        res.render("addNew");
      } catch (err) {
        res.status(404).send("Error") ; 
      }
}

async function addRouterpost(req, res ) {
    const { title, message } = req.body;
    const user = req.user ;
    console.log(req.user) ;
  
    if (!title || !message) {
      return res.status(400).send("Title and message are required");
    }
  
    try {
      await db.insertMess(title, message, user.username, user.is_member); // Call the insert function
      res.redirect('/'); // Redirect after successful insertion
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send("Error occurred while adding the message");
    }
  }

module.exports = {addNew, addRouterpost}