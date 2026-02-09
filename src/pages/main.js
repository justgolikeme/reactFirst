import React from 'react';
import {Outlet} from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonheader';
import {useSelector} from 'react-redux'
import CommonTag from '../components/commonTag';

const { Header, Sider, Content } = Layout;   // 组件解构出来


const Main=()=>{
    // const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
   //获取展开收起的状态
   const collapsed = useSelector(state => state.tab.isCollapse)
    return (
      <Layout className="main-container">
        <CommonAside collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed}/>
          <CommonTag />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
}

export default Main