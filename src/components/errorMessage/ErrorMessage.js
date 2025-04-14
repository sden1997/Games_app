import { Component } from "react";
import { Alert } from "antd";


class ErrorMessage extends Component {
    render() {
        return (
                <Alert className="error" message="Ошибка" type="error" description="Произошла ошибка" showIcon />
        )
    }
}

export default ErrorMessage