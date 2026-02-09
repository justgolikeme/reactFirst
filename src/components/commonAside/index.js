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
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {selectMenuList} from '../../store/reducers/tab'

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
    //需要调用拿到navigate实例,菜单跳转时需要用到这个实例，navigate返回的是一个函数能跳转对应的路径
    const navigate = useNavigate()

    //点击菜单时，需要调用reducer
    const dispatch = useDispatch()

    //创建方法添加数据到store方法，将数据设置进store里面
    const setTabsList = (val) => {
        dispatch(selectMenuList(val))
    }

    //点击菜单  在 CommonAside 中点击菜单时，会将菜单信息存储到 Redux
    const selectMenu = (e) =>{
        //怎么样实现跳转
        console.log(e,"点击菜单返回")  //e   keyPath:['/home']
        let data
        MenuConfig.forEach(item => {
            //找到当前的数据
            if(item.path === e.keyPath[e.keyPath.length - 1]){
                data = item
                //如果有二级菜单  keyPath: ['/other/pageOne', '/other']
                if(e.keyPath.length > 1){
                    data = item.children.find(child => {   //需要将data传给commontag组件，所以涉及到兄弟间的通信，要用到rudux
                        return child.path == e.key
                    })
                    console.log(data,"common aside的tag表单")   //path: '/other/pageTwo', name: 'page2', label: '页面2', icon: 'SettingOutlined'
                }
            }
        })
        // ... 查找菜单数据
        setTabsList({  // 存储到 Redux  这里调用了 tab.js
            path: data.path,
            name: data.name,
            label: data.label
        })
        navigate(e.key)
    }

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
          onClick={selectMenu}     
        />
      </Sider>
    )
}

export default CommonAside