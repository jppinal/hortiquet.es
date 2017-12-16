exports.render = function(req, res) {

  var imageData = {};
  imageData.src = req.query.src;
  imageData.title = req.query.title;
  imageData.color = '#24242a';

  switch(req.query.c) {
    case '1':
      imageData.color = '#98de83';
      break;
    case '2':
      imageData.color = '#83deca';
      break;
    case '3':
      imageData.color = '#decc83';
      break;
    case '4':
      imageData.color = '#98de83';
      break;
  }

  return res.render('image', imageData);

};
