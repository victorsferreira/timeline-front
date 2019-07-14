import React from "react";
import axios from "axios";
import { history } from "./history";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";
import moment from "moment";
import { Datepicker } from "./Datepicker";
import { Row, Col, Form, Input } from 'antd';
import { Alert, Typography } from 'antd';
import Button from "./Button";
import config from "./config";
import { TiCalendarOutline, TiPlus } from "react-icons/ti";

const { Text, Title } = Typography;

const dateFormat = "YYYY-MM-DD";

interface IState {
    identifier: string;
    secret: string;
    startDate: string;
    endDate: string;
    showError: boolean;
    errorMessage: string;
};

interface IProps {
    eventStore: any;
    errorStore: any
}

@inject("errorStore")
@inject("eventStore")
export class Create extends React.Component<IProps, IState> {
    private timer: any;

    constructor(props: any) {
        super(props);

        this.state = {
            identifier: "",
            secret: "",
            startDate: "",
            endDate: "",
            showError: false,
            errorMessage: ""
        } as IState;
    }

    async create() {
        const data = {
            identifier: this.state.identifier,
            secret: "",
            startDate: moment(this.state.startDate).format(dateFormat),
            endDate: moment(this.state.endDate).format(dateFormat),
        };

        try {
            const response = await axios.post(`${config.SERVER_URL}/event`, data);

            const { eventStore } = this.props;
            const event = response.data.data;
            eventStore.loadEvent(event);

            history.push(`/${this.state.identifier}`);
        } catch (e) {
            this.props.errorStore.add(e.message);
        }
    }

    showError(message: string) {
        this.setState({
            errorMessage: message,
            showError: true
        });

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({
                showError: false
            });
        }, 5000);
    }


    render() {
        return (
            <section className="create-page">
                <Title level={2}> Create your timeline </Title>

                <Form layout="vertical">

                    <Row gutter={6}>
                        <Col span={12}>
                            <Form.Item label={<Text className="label" strong>Identifier</Text>}>
                                <Input size="large" placeholder="Identifier" onChange={(e) => { this.setState({ identifier: e.target.value }) }} value={this.state.identifier} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className="field date" label={<Text className="label" strong>Start date</Text>}>
                                <Datepicker
                                    onChange={
                                        (value) => { this.setState({ startDate: value }) }
                                    }
                                />
                                <TiCalendarOutline className="icon" size="2em" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className="field date" label={<Text className="label" strong>Start end</Text>}>
                                <Datepicker
                                    onChange={
                                        (value) => { this.setState({ endDate: value }) }
                                    }

                                    date={moment().add(1, 'month')}
                                />
                                <TiCalendarOutline className="icon" size="2em" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button onClick={this.create.bind(this)}>Create <TiPlus size="1em" /></Button>
                </Form>
            </section>
        );
    }
}