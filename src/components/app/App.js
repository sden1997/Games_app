import { Component } from "react";

import RawgService from "../../services/RawgService"
import HeaderTabs from "../headerTabs/HeaderTabs";

import CardList from "../cardList/CardList";

import './app.scss'
import SearchInput from "../searchInput/SearchInput";


class App extends Component {
    gameService = new RawgService();

    state = {
        query: '',
        tab: 'Search',
    }

    onChangeTabs = (key) => {
        this.setState({
            tab: key
        })
    }

    searchGames = (query) => {
        this.setState({
            query: query.trim().toLowerCase()
        })
    }

    render() {

        return (
            <>
               <HeaderTabs onChangeTabs={this.onChangeTabs} />
               <main className="main-search">
                    {this.state.tab === 'Search' ? <SearchInput searchGames={this.searchGames} /> : null}
                    <CardList tab={this.state.tab} query={this.state.query}/>
               </main>
               
            </>
        )
    }
}



export default App