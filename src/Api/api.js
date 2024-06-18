
export const getNews = async (page, category, search) => {
    try {
        const response = await fetch(`/api/articles/?api_key=6191a39707bc5cb1a482124413627c04fd620000&format=json&sort=publish_date:desc&limit=12&offset=${page}${category > 0 && `&filter=categories:${category}`}${search && `&filter=title:${search} `}`,
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
}