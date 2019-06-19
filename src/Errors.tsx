import React from "react";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";
import { Alert, Col } from 'antd';

interface IState {
    errors: any[];
    total: number;
};

interface IProps {
    errorStore?: any;
}

@inject("errorStore")
@observer
export class Errors extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        autorun(() => {
            if (this.props.errorStore.errors.length > this.state.total) {
                this.addError(this.props.errorStore.errors, this.props.errorStore.currentError);
            }
        });

        this.state = {
            total: 0,
            errors: []
        };
    }

    addError(_errors: any[], message: any) {
        if (!message) return false;

        const error = {
            message,
            id: Date.now()
        }

        const errors = this.state.errors;
        errors.push(error);

        this.setState({ errors, total: _errors.length });
        setTimeout(() => { this.removeError(error.id); }, 5000);
    }

    removeError = (id: any) => {
        const errors = this.state.errors.filter(error => error.id !== id);
        this.setState({ errors: errors });
    }

    render() {
        return (
            <Col span={4} className="errors">
                <div>
                    {
                        this.state.errors.map(error => {
                            return (
                                <Alert
                                    className="animated tada error-alert item"
                                    message="Oops... there was an error"
                                    description={error.message}
                                    type="error"
                                    closable
                                />
                            );
                        })
                    }
                </div>
            </Col>
        );
    }
}