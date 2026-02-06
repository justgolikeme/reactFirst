import React,{useEffect,useState} from 'react'
import {Col,Row,Card,Table} from 'antd'
import './home.css'
import { getData } from '../../api'

//table列的数据
const columns = [
    {
      title: '课程',
      dataIndex: 'name'
    },
    {
      title: '今日购买',
      dataIndex: 'todayBuy'
    },
    {
      title: '本月购买',
      dataIndex: 'monthBuy'
    },
    {
      title: '总购买',
      dataIndex: 'totalBuy'
    }
  ]

const Home=()=>{
    const userImg = require("../../assets/images/user.png")
    useEffect(()=>{
        getData().then(({data})=>{
            // console.log(data.data,'res')
            const {tableData} = data.data
            setTableData(tableData)
        })
    },[])
    //定义table数据
    const [tableData,setTableData] = useState([])
    return(
        <Row className="home">
            <Col span={8}>
                <Card hoverable>
                    <div className="user">
                        <img src={userImg}/>
                        <div className="userinfo">
                            <p className="name">Admin</p>
                            <p className="access">超级管理员</p>
                        </div>
                    </div>
                    <div className="login-info">
                        <p>上次登录的时间：<span>2021-6-8</span></p>
                        <p>上次登录的地点：<span>武汉</span></p>
                    </div>
                </Card>
                <Card>
                    <Table rowKey={"name"} columns={columns} dataSource={tableData} pagination={false} />
                </Card>
            </Col>
            <Col span={16}></Col>
        </Row>
    )
}

export default Home