import { useState, useRef } from 'react';
import { searchShows } from '../api/tvmaze';
import { IoSearch } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import batmanImg from '../assets/img/shows/batman.svg';
import spidermanImg from '../assets/img/shows/spiderman.svg';
import wildwestImg from '../assets/img/shows/wild.svg';

const PRE_LOADED_SHOWS = [
  {
    id: 1,
    name: 'Batman Returns',
    image: batmanImg,
    url: '',
    type: 'Action',
    summary:
      '<p>Batman Returns is a 1992 American superhero film directed by Tim Burton, based on the DC Comics character Batman. It is the sequel to the 1989 film Batman and stars Michael Keaton as Bruce Wayne / Batman, alongside Danny DeVito, Michelle Pfeiffer, Christopher Walken, and Michael Gough.</p>',
  },
  {
    id: 2,
    name: 'Wild Wild West',
    image: wildwestImg,
    url: '',
    type: 'Adventure',
    summary:
      "<p>Special Agent Jim West and inventive US Marshal Artemus Gordon are ordered by President Ulysses Grant to team up to save the world from Dr Arliss Loveless's enormous steam-powered tarantula.</p>",
  },
  {
    id: 3,
    name: 'The Amazing Spiderman',
    image: spidermanImg,
    url: '',
    type: 'Fantasy',
    summary:
      "<p>Peter Parker, an outcast high school student, gets bitten by a radioactive spider and attains superpowers. While unravelling his parents' disappearance, he must fight against the Lizard.</p>",
  },
];

export default function Favorites() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([...PRE_LOADED_SHOWS]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const handleSearchChange = (value) => {
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);

      // cancel debounce & request
      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
      return;
    }

    // debounce (lazy load)
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      // cancel previous request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setLoading(true);

      try {
        const data = await searchShows(value, {
          signal: abortRef.current.signal,
        });

        setSuggestions(data);
        setShowDropdown(true);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 300); // lazy load after 300ms to reduce API calls
  };

  const addFromSearch = (show) => {
    if (selected.find((s) => s.id === show.id)) return;

    const movieData = {
      id: show.id,
      name: show.name,
      image: show.image?.medium || '',
      summary: show.summary || '',
      url: show.url || '',
      type: show.type || '',
    };

    setSelected([...selected, movieData]);
    setSuggestions([]);
    setShowDropdown(false);
    setQuery('');
  };

  const removeItem = (id) => {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;

    card.classList.add('removing');

    setTimeout(() => {
      setSelected((prev) => prev.filter((s) => s.id !== id));
    }, 200);
  };

  return (
    <section className="max-width-container">
      <div className="favorites ">
        <div className="favorites-header">
          <h2>Collect your favorites</h2>

          <div className="search-box">
            <input
              placeholder="Search title and add to grid"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
            />

            <button disabled>
              <IoSearch />
            </button>

            {showDropdown && (
              <ul className="search-dropdown">
                {loading && <li className="loading">Searching...</li>}

                {!loading && suggestions?.length === 0 && <li className="empty">No results</li>}

                {!loading &&
                  suggestions?.map((item) => (
                    <li key={item?.id} onClick={() => addFromSearch(item)}>
                      <img src={item?.image?.medium} alt={item?.name} />
                      <span>{item?.name}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div className="divider" />

        <div className="favorites-grid">
          {selected?.map((show) => (
            <div
              id={`card-${show.id}`}
              key={show.id}
              className="favorite-card"
              onClick={() => {
                if (show.url === '') return;
                window.open(show.url, '_blank');
              }}
            >
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(show?.id);
                }}
              >
                <FiX className="icon" />
              </button>

              <img src={show?.image} alt={show.name} />

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
      </div>
    </section>
  );
}
