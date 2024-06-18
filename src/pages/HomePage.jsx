import React, { useEffect, useState } from 'react'
import FIlter from '../components/FIlter'
import Search from '../components/Search'
import News from '../components/News'
import Pagination from '../components/Pagination'
import { Spin } from 'antd'
import { getNews } from '../Api/api'

const HomePage = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(sessionStorage.getItem('categories') || 0)
    const [page, setPage] = useState(sessionStorage.getItem('page') || 1)

    useEffect(() => {
        const newsFetch = async () => {
            setLoading(true);
            window.scrollTo(0, 0, { behavior: 'smooth' });

            const cachedNews = sessionStorage.getItem(`news_${categories}_${page}`);
            if (cachedNews) {
                setNews(JSON.parse(cachedNews));
                setLoading(false);
            } else {
                let data = await getNews((page - 1) * 10, categories);
                setNews(data);
                setLoading(false);
                sessionStorage.setItem(`news_${categories}_${page}`, JSON.stringify(data.results));
            }
        };
        newsFetch();
    }, [page, categories]);

    const handleFilter = (value) => {
        clearNewsFromSessionStorage()
        setPage(1)
        setCategories(value)
    }
    const pageChange = (value) => {
        clearNewsFromSessionStorage()
        setPage(value)
    }
    const clearNewsFromSessionStorage = () => {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith('news_')) {
                sessionStorage.removeItem(key);
            }
        });
    };

    const handleStorage = () => {
        sessionStorage.setItem('page', page)
        sessionStorage.setItem('categories', categories)
        sessionStorage.setItem(`news_${categories}_${page}`, JSON.stringify(news))
    }
    return (
        <section>
            <h1 className='text-5xl font-bold text-center'>News</h1>
            <div className='py-10 space-y-5'>
                <div className='flex justify-between'>
                    <FIlter handleFilter={handleFilter} options={options} />
                    <p>Favorite</p>
                </div>

                <Search />
            </div>

            <div>
                <Spin spinning={loading} >
                    <News news={news?.results ?? []} handleStorage={handleStorage} />

                </Spin>
                <Pagination news={news} page={page} pageChange={pageChange} />
            </div>
        </section>
    )
}

export default HomePage


const options = [
    {
        "id": 0,
        "name": "All"
    },
    {
        "id": 18,
        "name": "Games"
    },
    {
        "id": 17,
        "name": "Film"
    },
    {
        "id": 134,
        "name": "Guides"
    },
    {
        "id": 66,
        "name": "Deals"
    },
    {
        "id": 23,
        "name": "TV"
    },
    {
        "id": 58,
        "name": "Features"
    },
    {
        "id": 65,
        "name": "Standard Feature"
    },
    {
        "id": 64,
        "name": "Preview"
    }
]