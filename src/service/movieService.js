import axios from "axios";

class MovieService {

   getMovies() {
    const url = `${process.env.REACT_APP_MOVIE_API}/data`;
    return axios.get(url);
  }
}

export default new MovieService();
