import React from 'react';
import '../styles/Favorites.css';

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div className="mt-5">
      <h3 className="text-center text-primary mb-4">Ciudades favoritas</h3>
      {favorites.length === 0 ? (
        <p className="text-center text-muted">No tienes ciudades favoritas aún.</p>
      ) : (
        <ul className="list-group">
          {favorites.map((city, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="text-dark">{city.name}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onRemove(city.name)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
