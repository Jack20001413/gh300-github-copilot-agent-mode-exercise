/**
 * Utility function to handle API fetch requests with error handling
 * @param {string} url - The API endpoint URL
 * @param {string} resourceName - The name of the resource being fetched (e.g., 'teams', 'users')
 * @returns {Promise} Promise that resolves to the parsed JSON data
 * @throws {Error} Throws an error with a descriptive message if the request fails
 */
export const fetchWithErrorHandling = async (url, resourceName) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
