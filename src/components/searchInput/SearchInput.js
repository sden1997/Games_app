import { Component } from "react";

import './searchInput.scss'

class SearchInput extends Component {
    
    state = {
        value: '',
    }  

    onChange = (event) => {
        this.setState({
            value: event.target.value
        })
        this.props.searchGames(event.target.value)
    }


    render() {
        return (
            <form className="form" onSubmit={(event) => event.preventDefault()}>
                <input 
                className="search-input" 
                placeholder="Type to search..." 
                value={this.state.value} 
                onChange={this.onChange}/>
            </form>
        )
    }
}


export default SearchInput;