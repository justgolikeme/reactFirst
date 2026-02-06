import React,{useEffect,useState} from 'react'
import {Col,Row,Card,Table} from 'antd'
import './home.css'
import { getData } from '../../api'
import * as Icon from '@ant-design/icons';
import MyEcharts from '../../components/Echarts'
import Echarts from '../../components/Echarts';
// import * as echarts from 'echarts';

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
  //订单统计数据
  const countData = [
    {
      "name": "今日支付订单",
      "value": 1234,
      "icon": "CheckCircleOutlined",
      "color": "#2ec7c9"
    },
    {
      "name": "今日收藏订单",
      "value": 3421,
      "icon": "ClockCircleOutlined",
      "color": "#ffb980"
    },
    {
      "name": "今日未支付订单",
      "value": 1234,
      "icon": "CloseCircleOutlined",
      "color": "#5ab1ef"
    },
    {
      "name": "本月支付订单",
      "value": 1234,
      "icon": "CheckCircleOutlined",
      "color": "#2ec7c9"
    },
    {
      "name": "本月收藏订单",
      "value": 3421,
      "icon": "ClockCircleOutlined",
      "color": "#ffb980"
    },
    {
      "name": "本月未支付订单",
      "value": 1234,
      "icon": "CloseCircleOutlined",
      "color": "#5ab1ef"
    }
  ]
  //动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

const Home=()=>{
    const userImg = require("../../assets/images/user.png")
    //创建echarts响应数据
    const [ echartData, setEchartData] = useState({})
    //dom首次渲染完成
    useEffect(()=>{
        getData().then(({data})=>{
            console.log(data.data,'res')
            const {tableData, orderData } = data.data
            setTableData(tableData)
            //对于echarts数据的组装
            const order = orderData
            //x轴的数据
            const xData = order.date
            //series数据组装
            const keyArray = Object.keys(order.data[0])
            const series = []
            keyArray.forEach(key => {
                series.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: 'line'
                })
            })
            setEchartData({
                order: {
                    xData,
                    series
                }
            })
        })

        // //echarts要在dom渲染完成后才初始化
        // // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init(document.getElementById('main'));
        // // 绘制图表
        // myChart.setOption({
        // title: {
        //     text: 'ECharts 入门示例'
        // },
        // tooltip: {},
        // xAxis: {
        //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        // },
        // yAxis: {},
        // series: [
        //     {
        //     name: '销量',
        //     type: 'bar',
        //     data: [5, 20, 36, 10, 10, 20]
        //     }
        // ]
        // });
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
            <Col span={16}>
                <div className="num">
                    {
                        countData.map((item,index)=>{
                            return(
                                <Card key={index}>
                                    <div className="icon-box" style={{background:item.color}}>
                                        {iconToElement(item.icon)}
                                    </div>
                                    <div className="detail">
                                        <p className="num">￥{item.value}</p>
                                        <p className="txt">{item.name}</p>
                                    </div>  
                                    
                                </Card>
                            )
                        })
                    }
                </div>
                {/* <div id="main" style={{height:"300px"}}></div> */}
                { echartData.order && <MyEcharts chartData={echartData.order} style={{height:'280px'}}/>}
            </Col>
        </Row>
    )
}

export default Home