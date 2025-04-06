import { useEffect, useState } from 'react'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState(false)

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
        )
        if (!res.ok) throw new Error('데이터 불러오기 실패')
        const data = await res.json()
        setMovies(data.results)
      } catch (e) {
        console.error(e)
        setError(true)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">🎬 인기 영화</h1>

      {error ? (
        <p className="text-center text-red-600 text-lg">영화 데이터를 불러오는 데 실패했습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group shadow-lg rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto group-hover:blur-sm transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 text-center">
                <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
                <p className="text-sm line-clamp-4">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
