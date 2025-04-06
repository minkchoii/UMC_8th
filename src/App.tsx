import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import { NowPlayMovies, PopularMovies, TopRatedMovies, UpcomingMovies } from './pages/movies.tsx';
import RootLayout from './layout/root-layout.tsx';
import MovieDetailPage from './pages/movieDetail.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'movies/popular',
        element: <PopularMovies />
      },
      {
        path: 'movies/upcoming',
        element:<UpcomingMovies/>,
      },
      {
        path: 'movies/top_rated',
        element:<TopRatedMovies/>,
      },
      {
        path: 'movies/now_playing',
        element:<NowPlayMovies/>,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage/>,
      },
      
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

