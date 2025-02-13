import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight:"100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f0f2f5",
          padding: "0 20px",
        }}
      >
        <div className="logo">
          <Link to="/list" style={{ color: "#000", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
            <h3 style={{ margin: 0 }}>HandMeOff - Avito клон для избранных!</h3>
          </Link>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={{ background: "transparent", color: "#000" }}>
          <Menu.Item key="1">
            <Link to="/list" style={{ color: "#000" }}>
              Каталог
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/form" style={{ color: "#000" }}>
              Создать объявление
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/drafts" style={{ color: "#000" }}>
              Черновики
            </Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "20px 50px", background: "#fff" }}>{children}</Content>

      <Footer style={{ textAlign: "center" }}>
        HandMeOff © {new Date().getFullYear()}. Arman Khat.
      </Footer>
    </Layout>
  );
};

export default AppLayout;