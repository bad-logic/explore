import React from "react";
import { StaticRouter } from "react-router-dom";
import Routes from "./routes";

interface ServerProps {
  location: string;
}
const Server: React.FC<ServerProps> = ({ location }) => {
  return (
    <StaticRouter location={location}>
      <Routes />
    </StaticRouter>
  );
};

export default Server;
