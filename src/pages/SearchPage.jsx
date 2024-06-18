import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getNews } from '../Api/api'
import News from '../components/News'
import Search from '../components/Search'
import { Spin } from 'antd'
import Pagination from '../components/Pagination'

const SearchPage = () => {
    const { id } = useParams()
    const [news, setNews] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(JSON.parse(sessionStorage.getItem('page')) || 1)
    const navigate = useNavigate()

    console.log(page)
    useEffect(() => {
        const fetchNews = async () => {
            console.log(page)
            setLoading(true);
            window.scrollTo(0, 0, { behavior: 'smooth' });
            const cachedNews = sessionStorage.getItem(`news_search_${id}_${page}`);
            if (cachedNews) {
                setNews(JSON.parse(cachedNews));
                setLoading(false);
            } else {
                let data = await getNews((page - 1) * 12, 0, id);
                setNews(data);
                setLoading(false);
                sessionStorage.setItem(`news_search_${id}_${page}`, JSON.stringify(data));
            }
        };
        fetchNews();
    }, [page, id]);

    const pageChange = (value) => {
        clearNewsFromSessionStorage()
        setPage(value)
    }

    const handleStorage = () => {
        sessionStorage.setItem('page', page)
        sessionStorage.setItem('categories', 0)
    }

    const clearNewsFromSessionStorage = () => {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith('news_search_')) {
                sessionStorage.removeItem(key);
            }
        });
    };

    const handleSearch = (value) => {
        setPage(1)
        navigate(`/search/${value}`)
    }

    return (
        <section className='py-5 px-4 max-w-7xl mx-auto'>
            <div>
                <Link to='/' className='hover:text-primary text-white/80' onClick={() => sessionStorage.clear()}> Home
                </Link> {`> `}
                {id}
            </div>
            <h1 className='text-5xl font-bold text-center'>Search</h1>
            <div className='py-10 space-y-5'>
                <Search value={id} handleSearch={handleSearch} />
            </div>
            <div>
                <Spin spinning={loading} >
                    <News news={news?.results ?? []} handleStorage={handleStorage} />
                </Spin>
                {news?.results?.length > 0 && <Pagination news={news} page={page} pageChange={pageChange} />}
            </div>


        </section>
    )
}

export default SearchPage