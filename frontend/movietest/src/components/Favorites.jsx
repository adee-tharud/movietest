import { useState } from 'react';
import { useShowSearch } from '../hooks/useShowSearch';
import { PRE_LOADED_SHOWS } from '../data/preLoadShows';

import { IoSearch } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';

const VISIBLE_COUNT = 6;

export default function Favorites() {
  const [selected, setSelected] = useState([...PRE_LOADED_SHOWS]);
  const [showAll, setShowAll] = useState(false);

  const { query, setQuery, suggestions, loading, showDropdown, clear } = useShowSearch({
    minLength: 3,
    debounceMs: 300,
  });

  const addFromSearch = (show) => {
    if (selected.some((s) => s.id === show.id)) return;

    setSelected((prev) => [
      ...prev,
      {
        id: show.id,
        name: show.name,
        image: show.image?.medium || '',
        summary: show.summary || '',
        url: show.url || '',
        type: show.type || '',
      },
    ]);

    clear();
  };

  const removeItem = (id) => {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;

    card.classList.add('removing');

    setTimeout(() => {
      setSelected((prev) => prev.filter((s) => s.id !== id));
    }, 200);
  };

  const moviesToShow = showAll ? [...selected] : [...selected].slice(0, VISIBLE_COUNT);

  return (
    <section className="max-width-container">
      <div className="favorites">
        <div className="favorites-header">
          <h2>Collect your favorites</h2>

          <div className="search-box">
            <input
              placeholder="Search title and add to grid"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button disabled>
              <IoSearch />
            </button>

            {showDropdown && (
              <ul className="search-dropdown">
                {loading && <li className="loading">Searching...</li>}

                {!loading && suggestions.length === 0 && <li className="empty">No results</li>}

                {!loading &&
                  suggestions.map((item) => (
                    <li key={item.id} onClick={() => addFromSearch(item)}>
                      <img src={item.image?.medium} alt={item.name} />
                      <span>{item.name}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div className="divider" />

        <div className="favorites-grid">
          {moviesToShow.map((show) => (
            <div
              id={`card-${show.id}`}
              key={show.id}
              className="favorite-card"
              onClick={() => show.url && window.open(show.url, '_blank')}
            >
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(show.id);
                }}
              >
                <FiX className="icon" />
              </button>

              <img src={show.image} alt={show.name} />

              <div className="card-content">
                <h4>{show.name}</h4>
                <span className="show-type">{show.type}</span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: show.summary?.slice(0, 100) + '...',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {selected.length > VISIBLE_COUNT && (
          <div className="show-more-wrapper">
            <button className="show-more-btn" onClick={() => setShowAll((prev) => !prev)}>
              {showAll ? 'Show less' : 'Show more'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
