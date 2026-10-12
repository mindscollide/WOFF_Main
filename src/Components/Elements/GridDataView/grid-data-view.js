import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Typography } from "antd";

const GridDataView = () => {
  const { Title, Text } = Typography;

  const data = [
    { heading: "Action By", text: "101252456772" },
    { heading: "Action On", text: "1 June 2021 - 10:21:00" },
    {
      heading: "Description",
      text: "Write Off case modified for Pakistan Auto Industries – CG7GSW - 0137238",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container>
        {data.map((item, index) => {
          return (
            <Grid item lg={6} md={6} sm={6}>
              <Title
                level={5}
                style={{
                  fontWeight: "bold",
                  color: "#025f5c",
                  fontSize: "16px",
                }}
              >
                {item.heading}
              </Title>
              <Text>{item.text}</Text>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default GridDataView;
