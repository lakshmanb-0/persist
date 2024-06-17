
export const getNews = async (page, category) => {
    try {
        const response = await fetch(`https://www.gamespot.com/api/articles/?api_key=6191a39707bc5cb1a482124413627c04fd620000&format=json&sort=publish_date:desc&limit=20&offset=${page}${category > 0 && `&filter=categories:${category}`}`,)
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Try to parse the JSON data
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return null; // or handle the error as needed
    }
}