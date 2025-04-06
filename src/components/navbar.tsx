import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const linkStyle = "font-semibold transition duration-300 hover:text-blue-500";

  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link
        to="/"
        className={`${linkStyle} ${location.pathname === '/' ? 'text-green-600' : 'text-gray-600'}`}
      >
        홈
      </Link>
      <Link
        to="/movies/popular"
        className={`${linkStyle} ${location.pathname === '/movies/popular' ? 'text-green-600' : 'text-gray-600'}`}
      >
        인기 영화
      </Link>
      <Link
        to="/movies/upcoming"
        className={`${linkStyle} ${location.pathname === '/movies/upcoming' ? 'text-green-600' : 'text-gray-600'}`}
      >
        개봉 예정
      </Link>
      <Link
        to="/movies/top_rated"
        className={`${linkStyle} ${location.pathname === '/movies/top_rated' ? 'text-green-600' : 'text-gray-600'}`}
      >
        평점 높은 영화
      </Link>
      <Link
        to="/movies/now_playing"
        className={`${linkStyle} ${location.pathname === '/movies/now_playing' ? 'text-green-600' : 'text-gray-600'}`}
      >
        현재 상영 중
      </Link>
    </nav>
  );
};
