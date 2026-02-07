import React,{useEffect, useState} from 'react'
import {Button,Form,Input, Popconfirm, Table} from 'antd'
import './user.css'
import {getUser} from '../../api'
const User=()=>{
    const [ listData, setListData ] = useState({
        name:''
    })
    const [ tableData, setTableData ] = useState([])
    //新增
    const handleClick = (type,rowData)=>{

    }
    //输入框中输入数据后按搜索会把输入框中的值返回到handleFinish的e中
    const handleFinish =(e)=>{
        setListData({
            name: e.name
        })
        console.log(e)
    }

    //删除
    const handleDelete = (rowData) => {

    }
    //Table分为两步，首先是获取Table数据源，然后是Table的显示效果
    //table的数据是通过接口返回的，需要在页面首次加载的时候去请求当前的数据接口
    //页面首次加载是通过useEffect来模拟的
    const getTableData = ()=> {
        getUser(listData).then(({data}) => {
            // console.log(res, 'res')
            setTableData(data.list)
        })
    }
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name' 
        },{
            title: '年龄',
            dataIndex: 'age'
        },{
            title: '性别',
            dataIndex: 'sex',
            render: (val) => {
                return val ? '女':'男'
            }
        },{
            title: '出生日期',
            dataIndex: 'birth'
        },{
            title: '地址',
            dataIndex: 'addr'
        },{
            title: '操作',
            render: (rowData) =>{
                return(
                    <div className="flex-box">
                        <Button style={{marginRight:'5px'}} onClick={()=>handleClick('edit',rowData)}>编辑</Button>
                        <Popconfirm 
                            type="提示" 
                            description="此操作将删除该用户，是否继续"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => handleDelete(rowData)}
                        >
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        //调用后端接口获取用户列表数据，现在是调用mock
        getTableData()
    },[])



    return(
        //首先实现顶部的form表单 新增的按钮
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table columns={columns} dataSource={tableData} rowKey={'id'}/>
        </div>
    )
}

export default User