import React from "react";
import { inject, observer } from "mobx-react";
import axios from "axios";
import LoadBar from "./LoadBar";
import moment from "moment";
import BookmarkButton from "./BookmarkButton";
import Title from "antd/lib/typography/Title";

interface IProps {
    refStore: any;
    eventStore: any;
    match: any;
}

interface IState {
    showToday: boolean;
    showButtons: boolean;
}

@inject("refStore")
@inject("eventStore")
@observer
export class Event extends React.Component<IProps, IState> {
    private loadBarRef: any;

    constructor(props: any) {
        super(props);

        this.state = {
            showToday: false,
            showButtons: false,
        };
    }

    componentDidMount() {
        const { eventStore } = this.props;
        if (!eventStore.event) {
            this.loadEvent();
        }
    }

    async loadEvent() {
        const { identifier } = this.props.match.params;
        const response = await axios.get(`${process.env.SERVER_URL}/event/${identifier}`);

        const event = response.data.data;
        this.props.eventStore.loadEvent(event);

        this.setupButtons();
    }

    private setupButtons() {
        const bar = this.props.refStore.getRef("bar");
    }

    private resolvePercentageStyle(percentage: number) {
        if (percentage < 96) {
            return `${percentage}%`;
        } else {
            return `calc(${percentage}% - 50px)`;
        }
    }

    private onFinishLoadingBar = () => {
        this.setState({
            showToday: true
        });
    }

    private formatDate(date: moment.Moment) {
        return date.format("DD/MM/YYYY");
    }

    render() {
        const { event } = this.props.eventStore;
        if (!event) return null;
        const { startDate, endDate } = event;
        const start = moment(startDate);
        const end = moment(endDate);
        const now = moment();

        const totalDiff = end.diff(start, 'days');
        const remainingDiff = end.diff(now, 'days');

        const percentage = (1 - (remainingDiff / totalDiff)) * 100;

        return (
            <section className="event-page">
                <Title level={2}>{event.identifier}</Title>
                <LoadBar onFinish={this.onFinishLoadingBar} percent={percentage} />
                <div className="dates">
                    <span className="start">
                        {this.formatDate(start)}
                    </span>

                    {
                        this.state.showToday &&
                        <span className="animated tada today" style={{ left: this.resolvePercentageStyle(percentage) }}>Today</span>
                    }

                    <span className="end">
                        {this.formatDate(end)}
                    </span>
                </div>
                <BookmarkButton>Bookmark me!</BookmarkButton>
            </section>
        );
    }
}