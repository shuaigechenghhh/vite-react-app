import { createHashRouter} from "react-router-dom";
import React,{lazy} from 'react';
import { LaptopOutlined } from '@ant-design/icons';
 export const routerList =[
  {
    path: "/login",
    Component: lazy(()=>import('../pages/login/index.tsx')),
    type:'onter'
  },
  {
    path: "/home",
    Component: lazy(()=>import('../layout/index.tsx')),
    redirect:'/home/home1',
    type:'inter',
    children:[
      {
        path:'home1',
        root:'home',
        Component: lazy(()=>import('../pages/test/index')),
        icon:React.createElement(LaptopOutlined),
      },
      {
        path:'home2',
        root:'home',
        Component: lazy(()=>import('../pages/home/index.tsx')),
        icon:React.createElement(LaptopOutlined)
      },
    ]
  },
  {
    path: "/test",
    Component: lazy(()=>import('../layout/index.tsx')),
    redirect:'/test/test2',
    type:'inter',
    children:[
      {
        path:'test2',
        root:'test',
        Component: lazy(()=>import('../pages/test2/index')),
        icon:React.createElement(LaptopOutlined),
      },
    ]
  },
 ]
 const router = createHashRouter(routerList);

export default router