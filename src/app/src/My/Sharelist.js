import React, { Component } from 'react'
import '../css/My.css'
import {Link,Switch} from 'react-router-dom'
import { SwipeAction, List } from 'antd-mobile';

export default class Sharelist extends Component {
    constructor(){
        super();
        this.state={
            arr:[{'collection':'1'}],
            brr:[]
        }
    }
    componentDidMount(){
        this.$api.favorite().then(res => {
            this.setState({
                arr:res.data.data
            })
        }) 
        this.$api.sendlist().then(res => {
            console.log(res)
            this.setState({
                brr:res.data.data
            })
        }) 
        console.log(this.state.brr)
    }
    // 取消收藏
    deleEmail =(pid)=>{
        console.log("pid:"+pid);
        this.$api.delcollect({pid:pid}).then(res => {});
        let list = this.state.arr;
        for(let i= 0; i < list.length;i++){
            if(list[i].Pid == pid){
                list.splice(i,1);
            }
        }
        this.setState({
            dataList : list
        })
    }
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    我的分享
                    <Link to="/home/my" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"                       
                    }}
                    ></Link>
                    <i                           
                    className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"     
                    }}></i>
                </div>
                
                {/* content */}
                <List>
                    {this.state.brr.map((item,index)=>{
                    return(
                        <SwipeAction>
                            <List.Item className='my-text' onClick={() => {}} 
                            key={index}>
                                <img src={item.img} style={{
                                    borderRadius:'50%',
                                    height:'50%',
                                    width:'15%',
                                    margin:'1em'
                                }} /> 
                                <span className="my-title">{item.toNick}</span>
                                <span className="my-date">{new Date(item.Pday).toLocaleString()}</span>
                                <span className="my-user">{item.Ptitle}</span>
                                <span className="my-content">
                                    {item.Pcontent}
                                </span>
                                {/* </Link> */}
                            </List.Item>
                        </SwipeAction>
                    )})}
                </List>
            </div>
        )
    }
}
