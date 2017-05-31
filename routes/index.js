var express = require('express');
var router = express.Router();

const exp = require('../example');
let example = exp();
const http = require('http');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/countstream', function(req, res, next) {
  tstcountstream(req.params.mark,req.params.url).then(
    (ret) => {res.json(ret)}).catch((err)=>{res.json(err)});
});

function tstcountstream(mark,url){
  return new Promise(function(resovle,reject){
      if(url && mark){
          let countstream = new example.countstream(mark);
           http.get('http://'+url,function(res){
           res.pipe(countstream);
          countstream.on('total',function(count){
           resovle({res:count});
        })
      }).on('error', function(e) { 
        resovle({res:e.message});
});
   }else
    {
      reject({res:'参数错误'});
    }
})}

module.exports = router;
