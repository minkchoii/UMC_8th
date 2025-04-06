import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              },
            }
          ),
          axios.get<{ cast: Cast[] }>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              },
            }
          ),
        ]);

        setMovie(movieRes.data);
        setCast(creditRes.data.cast.slice(0, 5));
      } catch (err) {
        setError('영화 정보를 불러오지 못했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500"> 로딩 중...</div>;
  }

  if (error || !movie) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error || '영화 정보를 찾을 수 없습니다'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-gray-300">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-2">{movie.release_date}</p>
          <p className="text-sm text-gray-400 mb-4">{movie.overview}</p>
          <p className="mb-2">
            <strong>장르: </strong>
            {movie.genres.map((g) => g.name).join(', ')}
          </p>
          <p>
            <strong>평점: </strong>⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 gap-x-0">
          {cast.map((actor) => (
            <div key={actor.id} className="text-center">
              {actor.profile_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-24 h-24 object-cover rounded-3xl mx-auto shadow-sm"
                />
            ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-3xl flex items-center justify-center text-xs text-gray-500 mx-auto">
                    사진 없음
                </div>
                )}
                <p className="mt-2 font-sans font-thin text-gray-350">{actor.name}</p>
                <p className="text-sm text-gray-500">({actor.character} 역)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
