var express = require('express');
var router = express.Router();
var UsersModel = require('../schema/user_table');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  var a = req.body.txt1;
  console.log(a);

  var b = req.body.txt2;
  console.log(b);

  var c = req.body.txt3;
  console.log(c);

  var d = req.body.txt4;
  console.log(d);

  req.session.mysees1=a;
  console.log('session value is'+req.session.mysees1);

  req.session.mysees2=b;
  console.log('session value is'+req.session.mysees2);

  req.session.mysees3=c;
  console.log('session value is'+req.session.mysees3);

  req.session.mysees4=d;
  console.log('session value is'+req.session.mysees4);

    var fileobject =req.files.file12
    var filename =req.files.file12.name;
    var filesize =req.files.file12.filezise;
    var filemimetype =req.files.file12.mimetype;
  
    fileobject.mv("public/upload/"+filename,function(err){
      if(err)
      return res.status(500).send(err)
      //res.send('file uploaded')
      //res.redirect("/login")


    })
      const mybodydata = {
        user_name: req.body.txt1,
        user_email: req.body.txt2,
        user_password: req.body.txt3,
        user_mobile: req.body.txt4
      }
      var data = UsersModel(mybodydata);

      data.save(function(err){
        if (err) {
          console.log("err in insert record")
        }else{
          res.render('signup');
        }
      })









    res.redirect("/login")


  });




router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  var my1=req.body.txt2;
  var my2=req.session.mysees3;
  
  if(my1&&my2){
    console.log('value is same')
    res.redirect('/')
  }else{
    console.log('value is not same')
    res.redirect('/signup')
  }
});

router.get('/display', function(req, res, next) {
  UsersModel.find(function(err,db_users_array){
    if (err) {
      console.log('error in fetch data'+ err);
    }else{
      console.log(db_users_array);
      res.render('display', {user_array : db_users_array});
    }
  });
  
  
});

router.get('/get-display', function(req, res, next) {
  UsersModel.find({}, function(err,db_users_array){
    if (err) {
      res.send(JSON.stringify({'flag':0,'message':'error in api','err': err}));
    }else{
      res.send(JSON.stringify({'flag':1,'message':'data listing','data':db_users_array}));
    }
  });
});

router.get('/delete/:id',function(req,res){
  var delete_id = req.params.id;
  console.log('delete id is',delete_id);
  UsersModel.findOneAndRemove({_id:delete_id},function(err,project){
    if(err){
      console.log("error in record delete" + err);
      res.redirect('/display');
    }else{
      console.log("record deleted");
      res.redirect('/display');
    }
  });
});

router.get('/edit/:id',function(req,res){
  console.log(req.params.id);

  UsersModel.findById(req.params.id,function(err,db_users_array){
    if(err){
      console.log("edit fetch error "+ err);
    }else{
      console.log(db_users_array);
      res.render('edit-form',{user_array:db_users_array});
    }
  });
});

router.post('/edit/:id', function(req,res){
  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    user_name: req.body.txt1,
    user_email: req.body.txt2,
    user_password: req.body.txt3,
    user_mobile: req.body.txt4
  }
  UsersModel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("error in record update");
      res.redirect('/display');
    }else{
      res.redirect('/display')
    }
  })
});

router.post('/add-users-api', function(req, res, next) {
  console.log(req.body);

  const mybodydata = {
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_mobile: req.body.user_mobile,

}

var data = UsersModel(mybodydata);

data.save(function(err){
  if (err){
    res.send(JSON.stringify({'flag':0,'message':'error in API','err': err}));
  }else{
    res.send(JSON.stringify({'flag':1,'message':'record added'}));
  }
})
});

router.post('/delete-users-api', function(req, res, next) {
  UsersModel.findByIdAndRemove(req.body._id,function(err,post){
    if(err){
      res.send(JSON.stringify({'flag':0,'message':'error in API','err':err}));
    }else{
      res.send(JSON.stringify({'flag':1,'message':'record deleted'}));
    }
  });
});



router.get('/show/:id',function(req,res){
  console.log(req.params.id);
  UsersModel.findById(req.params.id,function(err,db_users_array){
    if(err){
      console.log('err in single fatch '+ err);
    }else{
      console.log(db_users_array);
      res.render('single-record',{user_array:db_users_array});
    }
  });
});




    
    




















module.exports = router;
