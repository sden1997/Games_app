import { Component } from "react";
import { Pagination } from "antd";


class PaginationUI extends Component {
  render() {

    const {current, total, onChange} = this.props;
    const _pageSize = 6;
    return (
        <Pagination hideOnSinglePage={true} total={total} current={current} showSizeChanger={false} onChange={onChange} pageSize={_pageSize}/>
    )
  }
}

export default PaginationUI
