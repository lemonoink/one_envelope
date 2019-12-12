import React, { Component } from 'react'
import '../css/analy.css';
import { DatePicker,Table, Input, Button, Icon} from 'antd';
import moment from 'moment';

import Highlighter from 'react-highlight-words';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY年MM月DD日';

const data = [
    {
        key: '1',
        Uday: '2019-11-26',
        newletter: 100,
        newShare:800,
        letterSum: 1000,
    },
    {
        key: '2',
        Uday: '2019-11-28',
        newletter: 100,
        newShare:800,
        letterSum: 1000,
    },
    {
        key: '3',
        Uday: '2019-11-29',
        newletter: 100,
        newShare:800,
        letterSum: 1000,
    },
    {
        key: '4',
        Uday: '2019-12-30',
        newletter: 100,
        newShare:800,
        letterSum: 1000,
    }
];
export default class UserAnaly extends Component {

    state = {
        searchText: '',
        searchedColumn: '',
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
    onChange=(value,dateString)=>{
        console.log(dateString);
    }
    render() {
        const columns = [
            {
                title: '时间',
                dataIndex: 'Uday',
                key: 'Uday',
                ...this.getColumnSearchProps('Uday'),
            },
            {
                title: '新增写信',
                dataIndex: 'newletter',
                key: 'newletter',
                ...this.getColumnSearchProps('newletter'),
            },
            {
                title: '新增分享链接',
                dataIndex: 'newShare',
                key: 'newShare'
            },
            {
                title: '累计写信',
                dataIndex: 'letterSum',
                key: 'letterSum'
            }
        ];
        return (
            <div className='right-con'>
               <div className='ruseranaly'>
                   <div className='bruser-title'>信件分析</div>
                   <div className='bruser-con'>
                       <li>
                           <span>昨日新增加写信数</span>
                           <span className='usernum'>100</span>
                       </li>
                       <li>
                           <span>昨日新增分享链接数</span>
                           <span className='usernum'>100</span>
                       </li>
                       <li id='usertr'>
                           <span>累计写信数</span>
                           <span className='usernum'>100</span>
                       </li>
                   </div>
               </div>
                <div className='rdata-inquire'>
                    <div className='bruser-title'>历史数据查询</div>
                    <Table columns={columns} dataSource={data} />             
                </div>
            </div>
        )
    }
}








