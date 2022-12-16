import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../config/Req';

const Favorites = () => {
    const [favoritesMovies, setFavoritesMovies] = useState([]);
    const [favoritesTv, setFavoritesTv] = useState([]);

    // Get stored movies
    useEffect(() => {
        let moviesArr = [];
        let moviesId = window.localStorage.movies ? window.localStorage.movies.split(',') : [];
        for (let i=0; i < moviesId.length; i++){
            axios.get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d`)
            .then(res => moviesArr.push(res.data))
            .then(() => setFavoritesMovies(moviesArr));     
        }
    },[])
    // Get stored Tv shows
    useEffect(() => {
        let tvArr = [];
        let tvId = window.localStorage.tv ? window.localStorage.tv.split(',') : [];
        for (let i=0; i < tvId.length; i++){
            axios.get(`https://api.themoviedb.org/3/tv/${tvId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d`)
            .then(res => tvArr.push(res.data))
            .then(() => setFavoritesTv(tvArr));    
        }
    },[])
    console.log(favoritesMovies)
    console.log(favoritesTv)
    return (
        <div className='favorites'>
            <div className="favorites-movies">
                <h2>My favorites movies :</h2>
                <div className="favorites-cards-container">
                {favoritesMovies.map((movie) => (
                    <div className='favorites-card' key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
                    </div>
                ))}
                </div>
            </div>
            <div className="favorites-tv">
                <h2>My favorites tv shows :</h2>
                <div className="favorites-cards-container">
                {favoritesTv.map((tv) => (
                    <div className='favorites-card' key={tv.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`} />
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;