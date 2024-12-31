const backendUrl = "https://backend-production-3ae0.up.railway.app"

export async function fetchBoulders() {
    try {
        const response = await fetch(`${backendUrl}/boulders`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching boulders:', error);
        throw error;
    }
}

export async function addBoulder(boulder) {
    try {
        const response = await fetch(`${backendUrl}/add-boulder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boulder),
        });
        const data = await response.json();
        console.log('Boulder added:', data);
    } catch (error) {
        console.error('Error adding boulder:', error);
    }
}