
import { Route, Switch, useRouteMatch } from "react-router-dom";
import React ,{useEffect} from "react"
const CustomRoutes = ({
    RoutingData,
}) => {
  const route = useRouteMatch();
  const path = route.path;
 
  useEffect(()=>{
  },[RoutingData])
  return (
    <Switch>
        {RoutingData?<><Route exact path={`${path}`} component={RoutingData[0].component}/>
        {RoutingData.map((item,index) =><Route key={index} path={`${path}/${item.path}`} component={item.component}/>)}
        </>:console.log("Null")}
    </Switch>
  );
};
export default CustomRoutes;
