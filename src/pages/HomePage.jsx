import React, { useCallback, useEffect, useState } from 'react'
import { FIlter, News, Search, Pagination, Favorite } from '../components/index'
import { Spin } from 'antd'
import { getNews } from '../Api/api'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const [newsData, setNewsData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(JSON.parse(sessionStorage.getItem('selectedCategory')) || 0)
    const [currentPage, setCurrentPage] = useState(JSON.parse(sessionStorage.getItem('currentPage')) || 1)

    const navigate = useNavigate()

    // cache data from session storage and set to state
    useEffect(() => {
        const newsFetch = async () => {
            setIsLoading(true);
            window.scrollTo(0, 0, { behavior: 'smooth' });

            const cachedNews = JSON.parse(sessionStorage.getItem(`news_${selectedCategory}_${currentPage}`))
            if (!!cachedNews) {
                setNewsData(cachedNews);
                handleStorage()
            } else {
                const data = await getNews((currentPage - 1) * 12, selectedCategory);
                setNewsData(data);
                handleStorage()
                sessionStorage.setItem(`news_${selectedCategory}_${currentPage}`, JSON.stringify(data));
            }
            setIsLoading(false);
        };
        newsFetch();
    }, [currentPage, selectedCategory]);


    // change page and category when click filter
    const handleFilter = useCallback((value) => {
        clearNewsFromSessionStorage()
        setCurrentPage(1)
        setSelectedCategory(value)
    }, [])

    // pagination handle event
    const pageChange = (value) => {
        clearNewsFromSessionStorage()
        setCurrentPage(value)
    }

    // clear news from session storage
    const clearNewsFromSessionStorage = () => {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith('news_')) {
                sessionStorage.removeItem(key);
            }
        });
    };

    // set current page and category to session storage
    const handleStorage = () => {
        sessionStorage.setItem('currentPage', currentPage)
        sessionStorage.setItem('selectedCategory', selectedCategory)
    }

    // search onclick handler
    const onClickSearch = useCallback((value) => {
        sessionStorage.clear()
        navigate(`/search/${value}`)
    }, [])

    return (
        <section>
            <h1 className='text-5xl font-bold text-center'>News</h1>
            <div className='py-10 space-y-5'>
                <div className='flex justify-between'>
                    <FIlter handleFilter={handleFilter} options={options} />
                    <Favorite />
                </div>
                <Search handleSearch={onClickSearch} />
            </div>

            <div>
                <Spin spinning={isLoading} >
                    <News news={newsData?.results ?? []} handleStorage={handleStorage} />
                </Spin>
                {
                    newsData?.results?.length &&
                    <Pagination
                        news={newsData}
                        page={currentPage}
                        pageChange={pageChange} />
                }
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
        "id": 64,
        "name": "Preview"
    }
]