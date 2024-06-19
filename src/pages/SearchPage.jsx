import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getNews } from '../Api/api'
import { Pagination, News, Search } from '../components/index'
import { Breadcrumb, Spin } from 'antd'

const SearchPage = () => {
    const { id } = useParams()
    const [news, setNews] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(JSON.parse(sessionStorage.getItem('currentPage')) || 1)
    const navigate = useNavigate()

    // cache data from session storage and set to state
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            window.scrollTo(0, 0, { behavior: 'smooth' });
            const cachedNews = sessionStorage.getItem(`news_search_${id}_${page}`);
            if (cachedNews) {
                setNews(JSON.parse(cachedNews));
                setLoading(false);
            } else {
                const data = await getNews((page - 1) * 12, 0, id);
                setNews(data);
                setLoading(false);
                sessionStorage.setItem(`news_search_${id}_${page}`, JSON.stringify(data));
            }
        };
        fetchNews();
    }, [page, id]);


    // pagination handle event
    const pageChange = (value) => {
        clearNewsFromSessionStorage()
        setPage(value)
    }

    // setting current page to session storage
    const handleStorage = () => {
        sessionStorage.setItem('currentPage', page)
        sessionStorage.setItem('selectedCategory', 0)
    }

    // clear previous cache newsData from session storage
    const clearNewsFromSessionStorage = () => {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith('news_search_')) {
                sessionStorage.removeItem(key);
            }
        });
    };

    // handle search value
    const handleSearch = (value) => {
        setPage(1)
        navigate(`/search/${value}`)
    }


    const breadcrumbList = [
        { title: <Link to={'/'} onClick={() => sessionStorage.clear()}>Home</Link>, },
        { title: id, },
    ]


    return (
        <section className='py-5 px-4 max-w-7xl mx-auto'>
            <Breadcrumb
                items={breadcrumbList}
            />
            <h1 className='text-5xl font-bold text-center'>Search</h1>
            <div className='py-10 space-y-5'>
                <Search value={id} handleSearch={handleSearch} />
            </div>
            <div>
                <Spin spinning={loading} >
                    <News news={news?.results ?? []} handleStorage={handleStorage} />
                    {
                        news?.results?.length > 0 &&
                        <Pagination
                            news={news}
                            page={page}
                            pageChange={pageChange} />
                    }
                </Spin>
            </div>
        </section>
    )
}

export default SearchPage