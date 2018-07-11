var middleware = (req, res, next) =>{
  var url = req.url;
  if(url != 'index'){
    res.render('normal', {Title:"Need Logon first!!"});
    return;
  }
  next();
}
module.exports = middleware;
