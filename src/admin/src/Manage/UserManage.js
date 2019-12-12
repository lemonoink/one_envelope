import React, { Component } from 'react'
import '../css/analy.css'
import { Table, Input, Button, Icon,Avatar,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';

const { Search } = Input;
export default class UserManage extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data: [
            {
                key: '1',
                Uimage: <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />,
                Uname: 'yifeng',
                Uid:1,
                Uphone:'15231148825',
                share:1,
                Uday:'2019-11-27'
            },
            {
                key: '2',
                Uimage:  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />,
                Uname: "haha",
                Uid:2,
                Uphone:'17631695087',
                share:1,
                Uday:'2019-11-27'
            },
            {
                key: '3',
                Uimage:  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />,
                Uname: 'lala',
                Uid:3,
                Uphone:'17631695087',
                share:1,
                Uday:'2019-11-27'
            }
        ]
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
            ),
        filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            (this.state.searchedColumn === dataIndex) ?
            <Highlighter
                highlightStyle={{ backgroundColor: '#00bcd48c', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
            : text
        ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
        const columns = [
            {
                title: '用户头像',
                key: 'Uimage',
                dataIndex: 'Uimage'
            },
            {
                title: '昵称',
                dataIndex: 'Uname',
                key: 'Uname',
                ...this.getColumnSearchProps('Uname'),
            },
            {
                title: '用户id',
                dataIndex: 'Uid',
                key: 'Uid',
                ...this.getColumnSearchProps('Uid'),
            },
            {
                title: '手机号',
                dataIndex: 'Uphone',
                key: 'Uphone',
                ...this.getColumnSearchProps('Uphone'),
            },
            {
                title: '分享链接数',
                dataIndex: 'share',
                key: 'share',
            },
            {
                title: '注册时间',
                dataIndex: 'Uday',
                key: 'Uday',
                ...this.getColumnSearchProps('Uday'),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => 
                this.state.data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" 
                    // onConfirm={() => this.handleDelete(record.key)}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  ) : null,
                
            }
        ];
        return (
            <div>
                <div className='bmuser'>
                    <span className='bmanage_user'>用户管理</span>
                    <span className='buser_sum'>总用户数：</span>
                </div>
                <div style={{background:'rgb(238, 238, 238)',height:10}}></div>
                <div className='if_search'>
                    <span className='if_search_child'>按条件搜索</span>
                    <i className='iconfont iconzhuyi'style={{float:'right',margin:'15px 50px 0'}}></i>
                </div>
                <div className='buser_list'>
                    <span className='buser_list_title'>用户列表</span>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}
