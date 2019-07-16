import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Input } from "antd";

interface IProps {
  date?: Date | moment.Moment;
  onChange?: (date: any) => void;
}

interface IState {
  date: Date | moment.Moment | undefined;
}

export class Datepicker extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      date: undefined
    };
  }

  componentDidMount() {
    if (this.props.date) {
      this.setValue(this.props.date);
    } else {
      this.setValue(new Date());
    }
  }

  onChange = (date: any) => {
    this.setValue(date);
  }

  setValue(_date: any) {
    const date = moment(_date);
    
    this.setState({
      date
    });

    if (this.props.onChange) this.props.onChange(date);
  }

  render() {
    const selected = moment(this.state.date).toDate();

    return (
      <DatePicker
        className="date-picker"
        customInput={<Input size="large" />}
        selected={selected}
        onChange={this.onChange}
      />
    );
  }
}