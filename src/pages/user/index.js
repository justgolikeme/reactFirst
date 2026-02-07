import React from 'react'
import {Button,Form,Input} from 'antd'
import './user.css'
const User=()=>{
    //新增
    const handleClick = ()=>{

    }
    //输入框中输入数据后按搜索会把输入框中的值返回到handleFinish的e中
    const handleFinish =(e)=>{
        console.log(e)
    }
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
        </div>
    )
}

export default User