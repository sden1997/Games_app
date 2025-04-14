import { Component } from "react"; 
import { Spin, Flex } from "antd";
import {LoadingOutlined} from '@ant-design/icons';


class Spinner extends Component {

    render() {
        return (
            <Flex align="center" gap="middle">
                <Spin indicator={<LoadingOutlined style={{fontSize: 100}} spin />} />
            </Flex>
        )
    }
}

export default Spinner;