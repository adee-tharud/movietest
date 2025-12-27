const API_SHOWS_URL = import.meta.env.VITE_SHOWS_API_URL;

export async function searchShows(query) {
  if (!query) return [];
  const res = await fetch(`${API_SHOWS_URL}/search/shows?q=${query}`);
  const data = await res.json();
  return data.map((item) => item.show);
}
