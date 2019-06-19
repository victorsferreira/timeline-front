import React from "react";

import { Typography, Button as AntdButton } from "antd";
const { Text } = Typography;

interface IState {
};

interface IProps {
    onClick?: any;
}

export default class Button extends React.Component<IProps, IState> {
    render() {
        return (
            <AntdButton {...this.props} className="c-button" size="large" type="primary">
                <Text strong>{this.props.children}</Text>
            </AntdButton>
        );
    }
}