import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./history";
import { Create } from "./Create";
import { Event } from "./Event";
import { Home } from "./Home";

import 'antd/dist/antd.css';
import "./app.scss";
import "animate.css/animate.min.css";
import { Col, Row } from 'antd';
import { Errors } from './Errors';
import config from "./config";

const App: React.FC = () => {
  return (
    <Router history={history}>

      <Row className="main" type="flex" justify="center">
        <Col span={16}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/:identifier" component={Event} />
          </Switch>
        </Col>
        <Errors />
      </Row>
    </Router>
  );
}

export default App;
