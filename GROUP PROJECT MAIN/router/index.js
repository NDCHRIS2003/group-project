var express = require(`express`);
var router = express.Router();

router.get(`/`, function(req, res){
    //just sends info to page without the use of template
  //  res.send(`Welcome Home`);

  res.render(`index`,{});
});



module.exports = router