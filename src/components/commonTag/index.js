import React from "antd"
import {Tag, Space } from 'antd'
import { useSelector } from "react-redux" 
import './index.css'

const CommonTag = () => {  
    const tabsList = useSelector(state => state.tab.tabList)  //Tag 组件从 Redux 读取数据
    console.log(tabsList,"tabsList")
    const handleClose = (tabList) =>{

    }
    return (
        <Space className="common-tag" size={[0,8]} wrap>
            {/* tag高亮，聚焦在当前路由所对应的tag上  tag显示要tag名称*/}
            <Tag>首页</Tag>
            <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
                用户列表
            </Tag>
        </Space>
    )
}

export default CommonTag


// 用户交互
//     ↓
// CommonAside.js（处理点击）
//     ↓ dispatch(selectMenuList(data))
//     ↓
// tab.js（存储数据）
//     ↓ 检查并更新 tabList
//     ↓
// 所有组件都能访问
//     ↓
// CommonTag.js（读取 tabList）
//     ↓
// 显示标签