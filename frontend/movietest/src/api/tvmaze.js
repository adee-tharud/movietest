const API_SHOWS_URL = import.meta.env.VITE_SHOWS_API_URL;

export async function searchShows(query, signal) {
  if (!query?.trim()) return [];

  const encodedQuery = encodeURIComponent(query.trim());

  const res = await fetch(
    `${API_SHOWS_URL}/search/shows?q=${encodedQuery}`,
    // add headers
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch shows');
  }

  const data = await res.json();
  return data.map((item) => item.show);
}
