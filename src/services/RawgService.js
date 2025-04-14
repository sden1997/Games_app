class RawgService {
    _apiBase = 'https://api.rawg.io/api/games';
    _apiKey = 'df80077893d3412190fece23e13f2371';

    _pageSize = 6;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllGames = async (query = '', page = 1) => {
        const searchParam = query ? `&search=${query}` : '';
        const res = await this.getResource(`${this._apiBase}?key=${this._apiKey}${searchParam}&page=${page}&page_size=${this._pageSize}`)
        return {
            games: res.results.map(this._transformGame),
            count: res.count
        }
    }
 
    _transformGame = (game) => {
        return {
            id: game.id,
            name: game.name,
            thumbnail: game.background_image,
            genre: game.genres.length > 0 ? game.genres[0].name : "Неизвестный жанр",
            rating: game.rating,
            date: game.released,
            platforms: game.platforms ? game.platforms.map(platform => platform.platform.name) : [],
        }
    }

}

export default RawgService;