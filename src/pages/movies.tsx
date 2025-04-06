import { MovieList } from '../components/movieList';

export const PopularMovies = () => <MovieList title="Popular Movies" endpoint="popular" />;
export const TopRatedMovies = () => <MovieList title="Top Rated Movies" endpoint="top_rated" />;
export const UpcomingMovies = () => <MovieList title="Upcoming Movies" endpoint="upcoming" />;
export const NowPlayMovies = () => <MovieList title="Now Playing Movies" endpoint="now_playing" />;


