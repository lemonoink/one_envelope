import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import {Link,Route} from 'react-router-dom'
import '../css/Back.css'
import UserAnaly from '../Statistics/UserAnaly';
import LetterAnaly from '../Statistics/LetterAnaly';
import UserManage from '../Manage/UserManage';
import PrivateWrite from '../Manage/PrivateWrite';
import PaperManage from '../Manage/PaperManage';
import TogetherWrite from '../Manage/TogetherWrite';
import Administrator from '../Manage/Administrator';
import {Addform} from '../Manage/Add';
import {clearTokenAll} from '../redux/actions';
import Help from '../Manage/Help';
import {Backform} from '../Manage/BackMessage';
import OpenManager from '../Manage/OpenManager';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class TotalLetter extends Component {
    constructor(){
      super();
      this.state={
          name : ''
      }
    }
    componentDidMount(){
      this.$api.getname().then(res => {
        if(res.data.status ===0){
          if(res.data.data[0] == undefined){
            this.props.history.push("/");      
          }else{
            this.setState({
            name:res.data.data[0].aname
          })
          }
          
        }
      })
    }
    handleClick =()=>{
      this.$store.dispatch(clearTokenAll())
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <img src={require('../image/yifeng.jpg')} style={{width:50,height:50,float:'left'}}/>
                    <span className='top-font'>一封管理平台</span>
                    <div>
                        <img src={require('../image/avatar.png')} alt='' className='top-avatar'/>
                        <span className='top-admin'>{this.state.name}</span>
                        <i className="iconfont icontuichu" id='top-exit'></i>
                        <Link id='top-et' to='/' onClick={this.handleClick}>退出</Link>
                    </div>
                </Header>
                <Layout>
                <Sider>
                  <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}
                  >
                    <SubMenu
                      key="sub1"
                      title={
                        <span>
                            <i className="iconfont iconweibiaoti5" style={{color:'#888',fontSize:'14px'}}> 统计</i>
                        </span>
                      }
                    >
                        <Menu.Item key="1"><Link to='/backhome/buseranaly'>用户分析</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/backhome/bletteranaly'>信件分析</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub2"
                      title={
                        <span>
                            <i className="iconfont iconweibiaoti5" style={{color:'#888',fontSize:'14px'}}> 管理</i>
                        </span>
                      }
                    >
                      <Menu.Item key="5"><Link to='/backhome/administrator'>管理员管理</Link></Menu.Item>
                      <Menu.Item key="6"><Link to='/backhome/busermanage'>用户管理</Link></Menu.Item>
                      <Menu.Item key="7"><Link to='/backhome/bprivatemanage'>私密信管理</Link></Menu.Item>
                      <Menu.Item key="8"><Link to='/backhome/btogethermanage'>一起写管理</Link></Menu.Item>
                      <Menu.Item key="9"><Link to='/backhome/bopenmanage'>公开写管理</Link></Menu.Item>
                      <Menu.Item key="10"><Link to='/backhome/bpapermanage'>信纸管理</Link></Menu.Item>
                      <Menu.Item key="11"><Link to='/backhome/help'>帮助与反馈</Link></Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 300,
                        }}
                    >
                        <Route path='/backhome/buseranaly' component={UserAnaly}/>
                        <Route path='/backhome/bletteranaly' component={LetterAnaly}/>
                        <Route path='/backhome/administrator' component={Administrator}/>
                        <Route path='/backhome/busermanage' component={UserManage}/>
                        <Route path='/backhome/bprivatemanage' component={PrivateWrite}/>
                        <Route path='/backhome/btogethermanage' component={TogetherWrite}/>
                        <Route path='/backhome/bpapermanage' component={PaperManage}/>
                        <Route path='/backhome/bopenmanage' component={OpenManager}/>
                        <Route path='/backhome/add' component={Addform}/>
                        <Route path='/backhome/help' component={Help}/>
                        <Route path='/backhome/backmessage' component={Backform}/>
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        )
    }
}
