import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { addToListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Favorites.scss';


const Favorites = ({ films, favorites, addToListAndSave }) => {
    let list = films.length && favorites.data.map(item => {
        let film = films.find(film => film.id === item.id);
        const handleAddToFavorites = (filmId) => {
            addToListAndSave(film.id, "favorites");
        };
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={handleAddToFavorites} />
    }).reverse();
    return (
        <div className="favorites--wrapper">
            <div className="favorites__header">Отклоненные</div>
            <div className="favorites__list"> 
            { list?.length ? list : (<div className="favorites__placeholder"/>) }
            </div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Favorites.propTypes = {
    favorites: PropTypes.object,
    films: PropTypes.array,
    addToListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);