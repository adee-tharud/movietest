import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchShows } from '../api/tvmaze';

global.fetch = vi.fn();

describe('TVMaze API - Fetch Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Should return empty array for empty query
  it('should return empty array when query is empty', async () => {
    const result = await searchShows('');
    expect(result).toEqual([]);
  });

  // Test 2: Should call API with correct URL
  it('should call API with correct search query', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    await searchShows('batman');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search/shows?q=batman')
    );
  });

  // Test 3: Should transform API response correctly
  it('should extract shows from API response', async () => {
    const mockResponse = [
      { show: { id: 1, name: 'Show 1' } },
      { show: { id: 2, name: 'Show 2' } }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await searchShows('test');

    expect(result).toEqual([
      { id: 1, name: 'Show 1' },
      { id: 2, name: 'Show 2' }
    ]);
  });

  // Test 4: Should handle API errors
  it('should throw error when API call fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(searchShows('batman')).rejects.toThrow('Network error');
  });
});