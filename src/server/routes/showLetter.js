var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';


/**
 * 展示信件内容
 * GET
 * 接收参数:
 *      pid:信件id
 * 
 */
router.get('/show', function (req, res, next) {
    // let { account, type } = req.query;
    let {pid} = req.query;
    console.log(req.query);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from pletter where uid=? and pid=?`, [uid,pid], (result) => {
                console.log(result);
                res.json(result);
            });
        }
    });
});
/**
 * 修改信件内容()
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid：信件id
 *      title:信件标题
 *      content：信件内容
 *      pday：信件修改后的日期
 * 返回参数：
 *      
 */
router.post('/edit',function(req,res,next){
    let {pid,title,content,pday} = req.body;
    checkToken(token,(result) => {
        if(result.status !=0){
            res.json(result);
        }else{
            let uid =  result.data.uid;
            var isSend='';
            runSql(`select isSend from pletter where pid=?`,[pid],(result1)=>{
                isSend = result1.data[0].isSend; 
                if(isSend == 0 ){
                    runSql(`update pletter set ptitle=?,pcontent=?,pday=? where pid=? and uid=? `,
                    [title,content,pday,pid,uid],(result2)=>{
                        res.json(result2);
                    })
                }else{
                    res.json("isSend,cann't edit!")
                }
            })
        }
    })
})

module.exports = router;