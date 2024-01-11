import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/api/api';
import { Movie, MovieDetails } from '../../types';

export const DEFAULT_SEARCH_VALUE = 'Alice'; // it is needed because omdbAPI will not return the needed movies array with the empty search parameter

type FetchMoviesArgs = {
  search: string,
  page: number;
}

type Response = {
  Response: string,
  Search?: Movie[],
  Error?: string,
  totalResults?: string,
}

type InitialState = {
  movies: Movie[],
  totalMoviesAmount: number,
  selectedMovie: MovieDetails | null,
  loading: boolean,
  moviesError: string,
  movieError: string,
}

const initialState: InitialState = {
  movies: [],
  totalMoviesAmount: 0,
  selectedMovie: null,
  loading: false,
  moviesError: '',
  movieError: '',
};

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

export const fetchMovies = createAsyncThunk<Response, FetchMoviesArgs>('movies/fetchMovies', async ({ search, page }) => {
  let formattedSearch = search.trim();
  if (formattedSearch.length === 0) {
    formattedSearch = DEFAULT_SEARCH_VALUE;
  }
  const response = await movieApi.get(`?apikey=${API_KEY}&s=${formattedSearch}&page=${page}`);
  return response.data;
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovie', async (movieId: string) => {
  const response = await movieApi.get(`?apikey=${API_KEY}&i=${movieId}&plot=full`);
  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, actions) => {
        state.loading = false;
        
        if (actions.payload.Response === 'True') {
          state.moviesError = '';
          state.movies = actions.payload.Search || [];
          state.totalMoviesAmount = actions.payload.totalResults ? +actions.payload.totalResults : 0;
        } else {
          state.moviesError = 'No matching movies found for the entered search term. Please try entering a different movie title.';
          state.movies = [];
          state.totalMoviesAmount = 0;
        }
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.moviesError = 'Oops, something went wrong...';
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, actions) => {
        state.loading = false;

        if (actions.payload.Response === 'True') {
          state.movieError = '';
          state.selectedMovie = actions.payload;
        } else {
          state.movieError = 'No movie with such an id was found.';
          state.selectedMovie = null;
        }
      })
      .addCase(fetchMovieById.rejected, (state) => {
        state.loading = false;
        state.movieError = 'Oops, something went wrong...';
      });
  }
});

export default moviesSlice.reducer;