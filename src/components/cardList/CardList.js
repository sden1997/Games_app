import { Component } from "react";

import "./cardList.scss"
import notImage from '../../resources/no_image.jpg'

import RawgService from "../../services/RawgService";
import ErrorMessage from "../errorMessage/ErrorMessage"
import Spinner from "../spinner/Spinner";
import { Rate } from "antd";
import dayjs from "dayjs";
import PaginationUI from "../pagination/PaginationUI";
import debounce from "lodash.debounce";


class CardList extends Component {

    state = {
        gamesList: [],
        loading: true,
        error: false,
        currentPage: 1,
        totalCount: 0,
    }

    gameService = new RawgService();

    componentDidMount() {
        this.onRequest(this.state.currentPage, this.props.query)
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.currentPage !== prevState.currentPage) {
            this.onRequest(this.state.currentPage, this.props.query)
        }

        if (this.props.query !== prevProps.query) {
            this.debounceRequest(this.state.currentPage, this.props.query);
        }

    }

    componentWillUnmount() {
        this.debounceRequest.cancel()
    }

    onRequest = (currentPage, query) => {
        this.onGamesListLoading();
        this.gameService.getAllGames(query, currentPage)
            .then(this.onGamesListLoaded)
            .catch(this.onError)
        }

    debounceRequest = debounce((currentPage, query) => {
        this.onRequest(currentPage, query)
    }, 1500)

    onGamesListLoaded = (newGamesList) => {
        const {games, count} = newGamesList;
        this.setState({
            gamesList: games,
            loading: false,
            totalCount: count
        })
    }

    onGamesListLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = (err) => {
        console.error("Ошибка при загрузке данных:", err)
        this.setState({
            error: true,
            loading: false,
        })
    }

    onHandlePageChange = (page) => {
        this.setState({
            currentPage: page,
        })
    }

    getRatingColor = (rating) => {
        if (rating < 3) {
           return  'rating__low'
        } else if (rating < 5) {
           return 'rating__middle'
        } else if (rating < 7) {
           return 'rating__high'
        } else {
           return 'rating__highest'
        }
    }

    render() {
        const {loading, error, gamesList, currentPage, totalCount} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const cardList = !(loading || error) ?  <RenderItems gamesList={gamesList} getRatingColor={this.getRatingColor} /> : null;

        return (
            <>
            <ul className="card-list">
                {errorMessage}
                {spinner}
                {cardList}
            </ul>
            <PaginationUI current={currentPage} total={totalCount} onChange={this.onHandlePageChange}/>
            </>
        )
    }
}

const RenderItems = ({gamesList, getRatingColor}) => {
     return gamesList.map((item) => {

        const {id, thumbnail, name, rating, date, genre, platforms} = item;
        const ratingFixed = rating.toFixed(1);
        const ratingColor = getRatingColor(rating);
        const dateFixed = date ? dayjs(date).format('MMMM DD, YYYY') : 'Release date is unknown';
        const arrPlatforms = platforms.map(platform => platform).join(', ')

        return (
            <li className="card" key={id}>
                <img className="card__img" src={thumbnail ? thumbnail : notImage} alt={`Card ${name}`} />
                <div className="card__content">
                    <div className="card__header">
                        <div className="card__info">
                            <h2 className="card__title">{name}</h2>
                            <p className={`card__rating ${ratingColor}`}>{ratingFixed}</p>
                        </div>
                        <p className="card__date">{dateFixed}</p>
                        <div className="card__genre">{genre}</div>
                    </div>
                    <div className="card__platforms">
                        <p className="platforms__title">Platforms:</p>
                        <p>{`${arrPlatforms}`}</p>
                    </div>
                    <Rate className="card__rate" allowHalf value={rating} count={10}/>
                </div>
            </li>
        )
    })
}



export default CardList