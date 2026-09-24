import fallbackMovies from '../data/movies';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Read API key from environment variable
const RAW_KEY = (import.meta.env.VITE_TMDB_API_KEY || '').trim();
const IS_PLACEHOLDER = !RAW_KEY || RAW_KEY === 'your_tmdb_api_key_here';
const IS_BEARER = RAW_KEY.startsWith('eyJ');

// Known TMDB Genres mapping
export const MOVIE_GENRES = [
  { id: 0, name: 'All' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' }
];

export const TV_GENRES = [
  { id: 0, name: 'All' },
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 9648, name: 'Mystery' },
  { id: 10765, name: 'Sci-Fi & Fantasy' }
];

const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics'
};

export function isApiKeyConfigured() {
  return !IS_PLACEHOLDER;
}

export function getImageUrl(path, size = 'w500') {
  if (!path) {
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

async function tmdbFetch(endpoint, params = {}) {
  if (IS_PLACEHOLDER) {
    throw new Error('TMDB API Key is not configured. Please set VITE_TMDB_API_KEY in your .env file.');
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  const headers = {
    accept: 'application/json'
  };

  if (IS_BEARER) {
    headers['Authorization'] = `Bearer ${RAW_KEY}`;
  } else {
    url.searchParams.set('api_key', RAW_KEY);
  }

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      url.searchParams.set(key, val);
    }
  });

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    throw new Error(`TMDB HTTP error ${response.status}: ${response.statusText}`);
  }
  return await response.json();
}

function resolveGenreName(genreIds = [], fallback = 'Movie') {
  if (!genreIds || genreIds.length === 0) return fallback;
  const firstId = typeof genreIds[0] === 'object' ? genreIds[0].id : genreIds[0];
  return GENRE_MAP[firstId] || (typeof genreIds[0] === 'object' ? genreIds[0].name : fallback);
}

export function normalizeMovieCard(item, mediaType = 'movie') {
  const type = item.media_type || mediaType;
  const title = item.title || item.name || 'Untitled';
  const rawDate = item.release_date || item.first_air_date || '';
  const year = rawDate ? rawDate.slice(0, 4) : 'N/A';
  const rating = item.vote_average ? Number(item.vote_average).toFixed(1) : '7.5';
  const genre = resolveGenreName(item.genre_ids || item.genres, type === 'tv' ? 'Series' : 'Movie');
  const image = getImageUrl(item.poster_path, 'w500');

  return {
    id: item.id,
    title,
    year,
    genre,
    rating,
    image,
    backdrop: getImageUrl(item.backdrop_path, 'original'),
    overview: item.overview,
    type
  };
}

/**
 * Fetch Trending Movies / Series
 */
export async function getTrending(type = 'movie', timeWindow = 'day') {
  try {
    const data = await tmdbFetch(`/trending/${type}/${timeWindow}`);
    return (data.results || []).map((item) => normalizeMovieCard(item, type));
  } catch (err) {
    console.warn(`TMDB getTrending failed (${err.message}). Using fallback data.`);
    return fallbackMovies.map((m) => ({
      id: m.id,
      title: m.title,
      year: String(m.year),
      genre: Array.isArray(m.genre) ? m.genre[0] : m.genre,
      rating: String(m.rating),
      image: m.poster,
      backdrop: m.backdrop,
      overview: m.description,
      type: 'movie'
    }));
  }
}

/**
 * Fetch Movies by category or genre
 */
export async function getMovies({ category = 'popular', genreId = 0, page = 1 } = {}) {
  try {
    let data;
    if (genreId && Number(genreId) > 0) {
      data = await tmdbFetch('/discover/movie', {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page
      });
    } else {
      data = await tmdbFetch(`/movie/${category}`, { page });
    }
    return (data.results || []).map((item) => normalizeMovieCard(item, 'movie'));
  } catch (err) {
    console.warn(`TMDB getMovies failed (${err.message}). Using fallback data.`);
    return fallbackMovies.map((m) => ({
      id: m.id,
      title: m.title,
      year: String(m.year),
      genre: Array.isArray(m.genre) ? m.genre[0] : m.genre,
      rating: String(m.rating),
      image: m.poster,
      backdrop: m.backdrop,
      overview: m.description,
      type: 'movie'
    }));
  }
}

/**
 * Fetch Series (TV Shows) by category or genre
 */
export async function getSeries({ category = 'popular', genreId = 0, page = 1 } = {}) {
  try {
    let data;
    if (genreId && Number(genreId) > 0) {
      data = await tmdbFetch('/discover/tv', {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page
      });
    } else {
      data = await tmdbFetch(`/tv/${category}`, { page });
    }
    return (data.results || []).map((item) => normalizeMovieCard(item, 'tv'));
  } catch (err) {
    console.warn(`TMDB getSeries failed (${err.message}). Using fallback TV series.`);
    // Fallback popular series
    return [
      {
        id: 1399,
        title: "Game of Thrones",
        year: "2011",
        genre: "Drama",
        rating: "8.4",
        image: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
        type: "tv"
      },
      {
        id: 66732,
        title: "Stranger Things",
        year: "2016",
        genre: "Sci-Fi",
        rating: "8.6",
        image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        type: "tv"
      },
      {
        id: 1396,
        title: "Breaking Bad",
        year: "2008",
        genre: "Crime",
        rating: "8.9",
        image: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
        type: "tv"
      },
      {
        id: 85271,
        title: "WandaVision",
        year: "2021",
        genre: "Sci-Fi & Fantasy",
        rating: "8.2",
        image: "https://image.tmdb.org/t/p/w500/glKDrtVTv4895MfSY5Jg92gUt66.jpg",
        type: "tv"
      }
    ];
  }
}

/**
 * Fetch Full Details for a Movie or TV Show
 */
export async function getDetails(id, type = 'movie') {
  try {
    let res;
    let actualType = type;
    try {
      res = await tmdbFetch(`/${type}/${id}`, {
        append_to_response: 'credits,videos,similar,reviews,release_dates,content_ratings'
      });
    } catch {
      // If requested as movie and failed, try as tv, or vice versa
      const altType = type === 'movie' ? 'tv' : 'movie';
      res = await tmdbFetch(`/${altType}/${id}`, {
        append_to_response: 'credits,videos,similar,reviews,release_dates,content_ratings'
      });
      actualType = altType;
    }

    const title = res.title || res.name || 'Untitled';
    const rawDate = res.release_date || res.first_air_date || '';
    const year = rawDate ? rawDate.slice(0, 4) : 'N/A';

    let duration = 'N/A';
    if (res.runtime) {
      const hrs = Math.floor(res.runtime / 60);
      const mins = res.runtime % 60;
      duration = `${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
    } else if (res.episode_run_time && res.episode_run_time.length > 0) {
      duration = `${res.episode_run_time[0]}m/ep`;
    } else if (res.number_of_seasons) {
      duration = `${res.number_of_seasons} Season${res.number_of_seasons > 1 ? 's' : ''}`;
    }

    const genre = (res.genres || []).map((g) => g.name);
    const rating = res.vote_average ? Number(res.vote_average).toFixed(1) : '7.5';

    // Find certification (e.g., PG-13, R, TV-MA)
    let certificate = 'PG-13';
    if (actualType === 'movie' && res.release_dates?.results) {
      const usRelease = res.release_dates.results.find((r) => r.iso_3166_1 === 'US');
      const cert = usRelease?.release_dates?.find((d) => d.certification)?.certification;
      if (cert) certificate = cert;
    } else if (actualType === 'tv' && res.content_ratings?.results) {
      const usRating = res.content_ratings.results.find((r) => r.iso_3166_1 === 'US');
      if (usRating?.rating) certificate = usRating.rating;
    }

    // Credits
    const crew = res.credits?.crew || [];
    const director = crew.find((c) => c.job === 'Director' || c.department === 'Directing')?.name || (res.created_by?.[0]?.name) || 'N/A';
    const writers = crew
      .filter((c) => c.department === 'Writing' || c.job === 'Screenplay' || c.job === 'Writer')
      .slice(0, 3)
      .map((c) => c.name);

    const cast = (res.credits?.cast || []).slice(0, 10).map((c) => ({
      name: c.name,
      character: c.character || 'Cast',
      image: c.profile_path
        ? getImageUrl(c.profile_path, 'w300')
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    }));

    // Trailer
    const videos = res.videos?.results || [];
    const trailerVideo = videos.find(
      (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    ) || videos.find((v) => v.site === 'YouTube');
    const trailer = trailerVideo
      ? `https://www.youtube.com/embed/${trailerVideo.key}`
      : 'https://www.youtube.com/embed/YoHD9XEInc0';

    // Similar
    const similarMovies = (res.similar?.results || []).slice(0, 4).map((s) => ({
      id: s.id,
      title: s.title || s.name,
      year: (s.release_date || s.first_air_date || '').slice(0, 4) || 'N/A',
      rating: s.vote_average ? Number(s.vote_average).toFixed(1) : '7.0',
      genre: resolveGenreName(s.genre_ids, actualType === 'tv' ? 'Series' : 'Movie'),
      image: getImageUrl(s.poster_path, 'w500'),
      type: actualType
    }));

    // Reviews
    const reviews = (res.reviews?.results || []).slice(0, 3).map((r) => ({
      user: r.author || 'Movie Fan',
      rating: r.author_details?.rating || 8,
      comment: r.content?.length > 350 ? `${r.content.slice(0, 350)}...` : r.content
    }));

    // Spoken language & country & production
    const language = res.spoken_languages?.[0]?.english_name || res.original_language?.toUpperCase() || 'English';
    const country = res.production_countries?.[0]?.name || (res.origin_country?.[0]) || 'USA';
    const production = res.production_companies?.[0]?.name || 'Universal Studios';

    return {
      id: res.id,
      title,
      year,
      duration,
      genre: genre.length > 0 ? genre : ['Drama'],
      rating,
      certificate,
      poster: getImageUrl(res.poster_path, 'w500'),
      backdrop: getImageUrl(res.backdrop_path, 'original'),
      description: res.overview || 'No overview available for this title.',
      director,
      writers: writers.length > 0 ? writers : [director],
      language,
      country,
      production,
      cast,
      trailer,
      similarMovies,
      reviews: reviews.length > 0 ? reviews : [
        {
          user: 'BingeFan',
          rating: 9,
          comment: 'Spectacular story and incredible visuals! Worth every minute of bingeing.'
        }
      ],
      type: actualType
    };
  } catch (err) {
    console.warn(`TMDB getDetails failed for ID ${id} (${err.message}). Checking fallback data.`);
    const fallback = fallbackMovies.find((m) => m.id === Number(id)) || fallbackMovies[0];
    return fallback;
  }
}

/**
 * Search Movies & Series
 */
export async function searchTitles(query, page = 1) {
  if (!query || !query.trim()) return [];
  try {
    const data = await tmdbFetch('/search/multi', {
      query: query.trim(),
      page
    });
    return (data.results || [])
      .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
      .map((item) => normalizeMovieCard(item, item.media_type));
  } catch (err) {
    console.warn(`TMDB searchTitles failed (${err.message}). Using fallback search.`);
    const q = query.toLowerCase();
    return fallbackMovies
      .filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (Array.isArray(m.genre) && m.genre.some((g) => g.toLowerCase().includes(q)))
      )
      .map((m) => ({
        id: m.id,
        title: m.title,
        year: String(m.year),
        genre: Array.isArray(m.genre) ? m.genre[0] : m.genre,
        rating: String(m.rating),
        image: m.poster,
        backdrop: m.backdrop,
        overview: m.description,
        type: 'movie'
      }));
  }
}
