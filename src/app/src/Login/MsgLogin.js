import React, { Component } from 'react'
import { Button,Modal} from 'antd-mobile';

const regTel = /^1\d{10}$/;
const alert = Modal.alert;

export default class MsgLogin extends Component {
    constructor(){
        super();
        this.state = {
            code : "获取验证码",
            btn : false
        }
    }
    toLogin=()=>{
        this.props.history.push("/login");
    }
    getVcode=()=>{
        var tel = this.tel.value;
        if(tel == ""){
            alert("请输入电话号码");
        }else if(!regTel.test(tel)){
            alert("电话号码格式错误");
        }else{
            var time = 30;
            var timer = setInterval(() => {
                time = time -1;
                if(time <0){
                    this.setState({
                        code:"获取验证码",
                        btn : false
                    })
                    clearInterval(timer);
                }else{
                    var str = "重新获取验证码"+"("+time+")";
                    this.setState({
                        code : str,
                        btn :true
                    })
                }
                
            },1000);
        }
    }
    render() {
        return (
            <div>
                <div className="msg-top">
                    <span onClick={this.toLogin}>
                        <img src={require("../imgs/Home/cancel.png")} style={{marginTop:"3px",marginLeft:"10px"}} />
                    </span>
                    <span className="pwdLogin" onClick={this.toLogin}>密码登录</span>
                </div>
                <div className="msg">
                    <input ref={(inp)=>{this.tel=inp}} type="phone" placeholder="请输入手机号"/>
                    <input ref={(inp)=>{this.vcode=inp}} type="text" placeholder="请输入验证码" style={{marginTop:"20px"}} />
                    <Button style={{marginTop:"50px",background:"rgb(93, 179, 255)",color:"white"}}
                    activeStyle={{background:"rgb(75, 142, 243)"}}
                    onClick={this.getVcode}
                    disabled={this.state.btn}
                    >{this.state.code}</Button>
                </div>
            </div>
        )
    }
}
