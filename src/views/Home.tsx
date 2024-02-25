import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Table } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('订单统计', '/page1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />), 
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),

  getItem('轮播图管理', '/swiperImages', <FileOutlined />), 
  getItem('商品管理', '/products', <ProductOutlined />),
];

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigateTo = useNavigate();

  const menuClick = (e:{key:string}) =>{
    //use hook
    console.log("clicked!!!",e.key)
    navigateTo(e.key)
  }
 

  return (
    <Layout style={{ minHeight: '100vh' }}>
        {/* Sidebar on the left */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <div className="demo-logo-vertical">logo</div> */}
        <Menu theme="dark" defaultSelectedKeys={['/page1']} mode="inline" items={items} onClick={menuClick}/>
      </Sider>
        {/* The content on the right */}
      <Layout>
        <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
          <Breadcrumb style={{ lineHeight: '64px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '16px 16px 0', background: colorBgContainer }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding:0, lineHeight: '48px' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;