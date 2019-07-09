import React from 'react';
import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';
import { inject } from 'mobx-react';

interface IProps {
    percent: number;
    refStore?: any;
    onFinish?: any;
}

interface IState {
    currentPercent: number;
}

@inject("refStore")
export default class LinearDeterminate extends React.Component<IProps, IState> {
    private tm: any;

    constructor(props: any) {
        super(props);

        this.state = {
            currentPercent: 0
        };
    }

    componentDidMount() {
        this.increase();
    }

    increase = () => {
        const percent = this.state.currentPercent + 1;
        if (percent >= this.props.percent) {
            clearTimeout(this.tm);
            if(this.props.onFinish) this.props.onFinish();
            return;
        }
        this.setState({ currentPercent: percent });
        this.tm = setTimeout(this.increase, 10);
    }

    render() {
        return (
            <div ref={(ref) => {
                this.props.refStore.addRef('bar', ref);
            }}>
                <Line
                    percent={this.state.currentPercent}
                    strokeWidth={8}
                    trailWidth={8}
                    strokeColor="#ffc832"
                    trailColor="#c8961e"
                />
            </div>
        );
    }
}