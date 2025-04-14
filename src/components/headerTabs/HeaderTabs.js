import { Component } from "react";
import { Tabs } from "antd";

import "./headerTabs.scss"


class HeaderTabs extends Component {
    render() {
        const items =  [
            {
                key: "Search",
                label: 'Search',
            },
            {
                key: "Rated",
                label: "Rated",
            },
        ]; 

        return (
            <header className="header-tabs">
                <Tabs
                    defaultActiveKey="Search"
                    items={items}
                    tabBarStyle={{ fontFamily: 'Inter, sans-serif', margin: '0 auto 20px' }}
                    tabBarGutter={16}
                    onChange={this.props.onChangeTabs}
                />
            </header>
        )
    }
}



export default HeaderTabs