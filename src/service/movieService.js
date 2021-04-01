import axios from "axios";

class MovieService {

  getMovies= async ()=> {
    const url = `${process.env.REACT_APP_MOVIE_API}?format=json`;
    return await axios.get(url);
  }
}

export default new MovieService();
