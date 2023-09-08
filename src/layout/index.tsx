import React, { Suspense, startTransition } from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { routerList } from "../router/index";
import "./index.less";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const makeChildrenList = (item: any) => {
  let child: any = [];
  item.map((i: any) => {
    if (i.children && i.children.length) {
      child = makeChildrenList(i.children);
    }
  });
  return [...item, ...child];
};
const Loading = () => (
  <>
    <div className="loadsvg">
      <div>loading...</div>
    </div>
  </>
);

const rotuerViews = (routerItems: any) => {
  if (routerItems && routerItems.length) {
    return routerItems.map(({ path, Component, children, redirect }) => {
      return redirect ? (
        <Route path={path} element={<Navigate to={redirect} />}></Route>
      ) : (
        <Route
          path={path}
          key={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        ></Route>
      );
    });
  }
};
const makeRouterMap=(list:any)=>{
    const childList:any=[]
    list.forEach((element:any) => {
        if(element?.children.length){
            childList.push(...element.children)
        }
    });
    return childList
    
}
const layout: React.FC = () => {
  const children = routerList.filter((ite)=>ite.type==='inter')
  const routerMap=makeRouterMap(children)
  const routeItem: MenuProps["items"] = children.map(
    (item: any) => {
      return {
        ...item,
        key: `${item.path}`,
        label: `${item.label||item.path}`,
        children: item.children?.map((i: any) => {
          return {
            ...i,
            key: `${i.path}`,
            path:`/${i.root}/${i.path}`,
            label: `${i.label||i.path}`,
          };
        }),
      };
    }
  );
  const navigate = useNavigate();
  const handleClick = (item: any) => {
    startTransition(()=>{
    const jump= item.keyPath.reverse().join('/')
    navigate(jump);
    })
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={routeItem}
            onClick={(item) => handleClick(item)}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
            className="layout-content"
          >
            <Routes>{rotuerViews(routerMap)}</Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default layout;
