import { Route, Routes } from "react-router";
import React from "react";
// Rendered under App's "/Wof/*" route, so these paths are relative to /Wof:
// the role's first entry is the index (landing) page, and every item.path is
// a bare relative segment like "Admin/NewRequestList".
const CustomRoutes = ({ RoutingData }) => {
  const IndexComponent = RoutingData ? RoutingData[0].component : null;
  return (
    <Routes>
      {RoutingData ? (
        <>
          <Route index element={<IndexComponent />} />
          {RoutingData.map((item, index) => (
            <Route key={index} path={item.path} element={<item.component />} />
          ))}
        </>
      ) : null}
    </Routes>
  );
};
export default CustomRoutes;
