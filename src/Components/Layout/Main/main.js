import React from "react";
import { Layout } from "antd";
import Footer from "../Footer/footer";
import styles from "./main.module.css";
import Container from "@material-ui/core/Container";
import CustomRoutes from "../../../Routes/CustomRoutes";

const Main = ({
  routingData,
  role
}) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Content className={styles.mainContainer}>
        <Container maxWidth="lg">
        <CustomRoutes RoutingData={routingData} Role={role}/>
        </Container>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Main;
