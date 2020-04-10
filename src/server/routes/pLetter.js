var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';

/**
 * 获取所有私密写信件
 * GET
 * 接收参数:
 *      uid:用户id
 *      toNick：收件人昵称
 * 
 */
router.get('/getletter', function (req, res, next) {
    //http://localhost:8000/v1/private/getletter?toUid=1
    let {toNick } = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            // console.log(result);
            let uid = result.data.uid;
            runSql(`select pletter.* from pletter where uid=? and toNick=? and isDelete=?`, [uid,toNick,0], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 删除私密写的信件
 * POST
 * 接收参数:
 *   pid：信件id
 */
router.post('/getletter/pdelete', function (req, res, next) {
    //http://localhost:8000/v1/private/getletter/pdelete
    let {pid} = req.body;
    // console.log(pid);
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            // console.log(result);
            let uid = result.data.uid;
            runSql(`select isDelete from pletter where uid=? and pid=?`,[uid,pid],(result1) =>{
                // console.log(result1.data[0].isDelete);
                if(result1.data[0].isDelete == 0){
                    runSql(`update pletter set isDelete=? where uid=? and pid=? `, [1,uid,pid], (result2) => {
                        // console.log(result2);                        
                            res.json(result2);
                    })
                }
            });
        }
    });
});

/**
 * 书写信件内容
 * POST
 * 接收参数:
 *      title:信件标题
 *      content：信件内容
 *      toUid:收件人id
 *      toNick:收信人称呼
 *      pday:创建日期
 * 
 */
router.post('/writeletter', function (req, res, next) {
    let { Ptitle, Pcontent,toUid,toNick,Pday,ppid } = req.body;
    // console.log(req.body);
    let token = req.header('token');
    // console.log(token);
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`insert into pletter(Ptitle, Pcontent, Uid,toUid,toNick,isSend,Pday,isCollection,isDelete,ppid) values (?,?,?,?,?,?,?,?,?,?)`, [Ptitle, Pcontent,uid,null,toNick,0,Pday,0,0,ppid],(result1)=>{
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});

/**
 * 展示收信人列表
 *请求方式
 *  GET
 * 接受参数：
 * 
 * 返回参数：
 *      Uimage：用户头像
 *      Uname：用户名
 *      toNick：收信人昵称
 *      toUid：收信人id
 */
router.get('/getlist',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        let uid = result.data.uid;
        console.log(uid);
        if(result.status != 0){
            res.json(result);
        }else{
                runSql('select toNick from pletter where uid=?',[uid],(result)=>{
                    if(result.data.length == 0){
                        runSql(`select user.uimage,user.uname,toNick from user where user.uid=?`,[uid],
                        (result1)=>{
                            let pday = new Date().getTime();
                            runSql(`insert into pletter(Ptitle, Pcontent, Uid,toUid,toNick,isSend,Pday,isCollection,isDelete,ppid) values (?,?,?,?,?,?,?,?,?,?) `,
                                ["快来给他写信吧","他的信箱还没有东西哦",uid,null,'致自己',0,pday,0,0,null],
                                (result3)=>{
                                    console.log("添加成功")
                            })
                            res.json(result1);
                        });
                    }else{
                        runSql(`select distinct user.uimage,user.uname,pletter.toNick from user,pletter where user.uid=? and(user.uid=pletter.uid)`,[uid],
                        (result1)=>{
                            res.json(result1);
                        });
                    }
                    
                })
        }
    });
});
/**
 *更换收信人昵称
 *请求方式
 *  POST
 * 接受参数：
 *      toNick：收信人昵称 
 *      toUid：收信人id
 * 返回参数： 
 */
router.post('/changetoNick',function(req,res,next){
    // https://yf.htapi.pub/v1/private/changetoNick
    let {newtoNick,oldtoNick} = req.body; 
    let token = req.header('token');
    // console.log(req.body);
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`update pletter set toNick=? where uid=? and toNick=?`,[newtoNick,uid,oldtoNick],
            (result1)=>{
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 添加收信人列表
 * 请求方式：
 *      POST
 * 接受参数：
 *      toNick：收信人昵称
 *      pday:创建日期
 * 返回参数：
 *      
 */
router.post('/addlist',function(req,res,next){
    let {toNick,pday} =  req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0) {
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select toNick from pletter where toNick=? and uid=? `,[toNick,uid],(result1)=>{
                var data = result1.data;
                var arr = Object.getOwnPropertyNames(data);
                if(arr.length == 1){
                    // console.log("sdjgk");
                     runSql(`insert into pletter(Ptitle, Pcontent, Uid,toUid,toNick,isSend,Pday,isCollection,isDelete,ppid) values (?,?,?,?,?,?,?,?,?,?) `,
                    ["快来给他写信吧","他的信箱还没有东西哦",uid,null,toNick,1,pday,0,0,null],(result2)=>{
                        // console.log(result2);
                        res.json(result2);
                    })
                }else {
                    res.json("Already exists, please change nickname!")
                }
            })
        }
    })
})
/**
 * 删除收件人昵称
 * 请求方式：
 *      POST
 * 接收参数：
 *      toNick：用户昵称
 * 返回参数：
 *      
 */
router.post('/dellist',function(req,res,next){
    let {toNick} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result);
        }else{
            let uid= result.data.uid
            runSql(`delete from pletter where uid=? and toNick=?`,[uid,toNick],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 获取信纸图片
 * 请求方式：
 *      GET
 * 接受参数：
 * 返回参数：
 */
router.get('/getback',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(ree.json);
        }else{
            runSql(`select * from paper`,[],(result1)=>{
                // console.log(result1)
                res.json(result1);
            })
        }
    })
})
/**
 * 更换信纸
 * 请求方式：
 *      POST
 * 接收参数：
 *      pid：信件id
 *      ppid：更换后的信纸id
 */
router.post('/changeback',function(req,res,next){
    let token = req.header('token');
    let {pid,ppid} =  req.body;
    // console.log(pid,ppid);
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result)
        }else{
            runSql('update pletter set ppid=? where pid=? ',[ppid,pid],(result1)=>{
                // console.log(result1);
                res.json(result1);
            })
        }
    })
})


// /**
//  * 获取第一封信
//  * 请求方式：
//  *      GET
//  * 接收参数：
//  */
// router.get('/getpid',function(req,res,next){
//     let token = req.header('token');
//     // let {pid,ppid} =  req.body;
//     // console.log(pid,ppid);
//     checkToken(token,(result)=>{
//         if(result.status != 0){
//             res.json(result)
//         }else{
//             runSql('select * from pletter where pid=? ',[72],(result1)=>{
//                 // console.log(result1);
//                 res.json(result1);
//             })
//         }
//     })
// })

module.exports = router;
