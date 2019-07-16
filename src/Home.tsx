import React from "react";
import moment from "moment";
import { Datepicker } from "./Datepicker";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import Button from "./Button";
import { TiArrowRightThick } from "react-icons/ti";

const { Text, Title } = Typography;

interface IState {
};

interface IProps {
}

export class Home extends React.Component<IProps, IState> {
    render() {
        return (
            <section className="home-page">
                <Title level={1}>Hurry up!</Title>
                <Title level={4}>Create your Timeline and track your progress</Title>
                <div className="home-create-button">
                    <Link className="home-create-button" to="/create">
                        <Button>
                            Create now
                            <TiArrowRightThick className="icon" size="1.2em" />
                        </Button>
                    </Link>
                </div>
            </section>
        );
    }
}