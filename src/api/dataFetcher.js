import { NEWS_API_KEY, MOVIE_API_KEY } from "../config.js";

const fetchNews = async () => {
  const corsProxyUrl = "https://api.allorigins.win/raw?url=";

  const apiUrl = encodeURIComponent(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
  );
  const response = await fetch(`${corsProxyUrl}${apiUrl}`);

  const data = await response.json();
  return data.articles.map((article) => ({
    id: article.url,
    title: article.title,
    content: article.description,
    category: "News",
    image:
      article.urlToImage || "https://via.placeholder.com/300x200?text=News",
  }));
};

const fetchBooks = async () => {
  const response = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20"
  );
  const data = await response.json();
  return data.items.map((book) => ({
    id: book.id,
    title: book.volumeInfo.title,
    content: book.volumeInfo.description || "No description available",
    category: "Books",
    image:
      book.volumeInfo.imageLinks?.thumbnail ||
      "https://via.placeholder.com/300x200?text=Book",
  }));
};

const fetchMovies = async () => {
  const corsProxyUrl = "https://api.allorigins.win/raw?url=";

  const apiUrl = encodeURIComponent(
    `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}`
  );
  const response = await fetch(`${corsProxyUrl}${apiUrl}`);

  const data = await response.json();
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    content: movie.overview,
    category: "Movies",
    image:
      `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
      "https://via.placeholder.com/300x200?text=Movie",
  }));
};

export const fetchAllData = async () => {
  try {
    const [news, books, movies] = await Promise.all([
      fetchNews(),
      fetchBooks(),
      fetchMovies(),
    ]);
    return [...news, ...books, ...movies];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
