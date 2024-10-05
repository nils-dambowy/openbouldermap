const backendUrl = "https://gregarious-exploration-production.up.railway.app/"

export async function fetchMovies() {
    try {
        const response = await fetch(`${backendUrl}/movies`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}