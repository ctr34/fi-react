import { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    ProductOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  import { Menu } from 'antd';
  import { useNavigate, useLocation } from 'react-router-dom';

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

const Comp: React.FC = () => {
    const navigateTo = useNavigate()
    const currentRoute = useLocation()
    const menuClick = (e:{key:string}) =>{
      //use hook
      navigateTo(e.key)
    }

    return (
        <Menu 
            theme="dark" 
            defaultSelectedKeys={[currentRoute.pathname]} 
            mode="inline" 
            items={items} 
            onClick={menuClick}/>
    )
}

export default Comp