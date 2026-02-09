import React from "antd"
import {Tag, Space } from 'antd'
import { useSelector, useDispatch } from "react-redux" 
import {useLocation, useNavigate} from 'react-router-dom'
import {closeTab,setCurrentMenu} from '../../store/reducers/tab'
import './index.css'

const CommonTag = () => {  
    const tabsList = useSelector(state => state.tab.tabList)  //Tag 组件从 Redux 读取数据
    const currentMenu = useSelector(state => state.tab.currentMenu)   //获取当前选中的数据
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    console.log(tabsList,"tabsList")
    const handleClose = (tag,index) =>{
        // console.log(tabsList,"tabsList1")
        let length = tabsList.length - 1
        dispatch(closeTab(tag))
        //关闭的不是当前的tag
        if(tag.path !== action.pathname){
            return 
        }
        if(index === length){
            //设置当前数据  关闭的是最后一个标签，跳转到前一个
            const curData = tabsList[index-1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        }else{
            //如果tag至少存在一个数据，则选中后一个tag
            if(tabsList.length > 1){
                //下一个tag
                const nextData = tabsList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }

    //点击tag
    const handleChange = (tag) =>{
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }

    //tag的显示
    const setTag = (flag, item, index) => {
        return (  // 如果是当前选中的标签flag=1
            flag ? <Tag color="#55acee" closeIcon onClose={() => handleClose(item,index)} key={item.name}>  {item.label}  </Tag>
            :
            <Tag onClick={()=>handleChange(item)} key={item.name}>  {item.label}  </Tag>
        )
    }


    return (
        <Space className="common-tag" size={[0,8]} wrap>
            {/* tag高亮，聚焦在当前路由所对应的tag上  tag显示要tag名称   tag页面处理渲染要改成动态的*/}
            {/* <Tag>首页</Tag>
            <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
                用户列表
            </Tag>    currentMenu判断当前选中的数据是否存在 currentMenu存在永远为真，所以要拿currentMenu.name属性进行判断  */}
                {/* // 3. 调用 setTag 函数渲染每个标签
                //    参数1：是否高亮（当前路径对比）
                //    参数2：标签数据
                //    参数3：标签索引（用于关闭时定位） */}
            {
                currentMenu.name && tabsList.map((item,index) => (setTag(item.path === currentMenu.path, item,index)))
            }


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