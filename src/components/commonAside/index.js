import React from 'react'
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;   // 组件解构出来

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

//处理菜单的数据
const items = MenuConfig.map((icon=>{
    //没有子菜单
    const child = {
        key: icon.path,
        icon:iconToElement(icon.icon),
        label:icon.label
    }
    //有子菜单
    if(icon.children){
        child.children = icon.children.map(item => {
            return{
                key:item.path,
                label:item.label
            }
        })
    }
    return child
}))



const CommonAside=({collapsed})=>{
    console.log(collapsed,'commonaside')
    return(
     <Sider trigger={null} collapsed={collapsed}>
        <h3 className="app-name">{collapsed?'后台':'后台通用管理系统'}</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
              height: '100%'
          }}
        />
      </Sider>
    )
}

export default CommonAside