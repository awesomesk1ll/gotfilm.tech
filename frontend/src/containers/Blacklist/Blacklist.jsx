import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { addToListAndSave, removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Blacklist.scss';


const Blacklist = ({ films, favorites, blacklist, addToListAndSave, removeFromListAndSave }) => {
    let list = films.length && blacklist.data.map(item => {
        let film = films.find(film => film.id === item.id);
        const handleAddToFavorites = () => {
            let checkList = favorites.data.find(item => item.id === film.id);
            if (!checkList) {
                addToListAndSave(film.id, "favorites");
            } else {
                removeFromListAndSave(film.id, "favorites");
            }
        };
        const handleRemoveFromList = () => {
            removeFromListAndSave(film.id, "blacklist");
        };
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={handleAddToFavorites} removeFromList={handleRemoveFromList} status={favorites.list[film.id]} />
    }).reverse();
    return (
        <div className="blacklist--wrapper">
            <div className="blacklist__header">Отклоненные</div>
            <div className="blacklist__list"> 
            { list?.length ? list : (<div className="blacklist__placeholder"/>) }
            </div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Blacklist.propTypes = {
    blacklist: PropTypes.object,
    favorites: PropTypes.object,
    films: PropTypes.array,
    addToListAndSave: PropTypes.func,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites,
    blacklist: filmReducer.blacklist
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave, removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Blacklist);