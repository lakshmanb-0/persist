import React, { useState } from 'react'
import { useEffect } from 'react'
import { getNews } from '../Api/api'
import NewsItem from './NewsItem'
import { Pagination, Select, Spin } from 'antd'

const News = () => {
    const [news, setNews] = useState()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(0)
    const [page, setPage] = useState(sessionStorage.getItem('page') || 0)

    useEffect(() => {
        setLoading(true)
        console.log(page, categories)
        const news = async () => {
            let data = await getNews((page - 1) * 10, categories)
            console.log(data)
            setNews(data)
            setLoading(false)
        }
        news()
    }, [page, categories])

    const options = [
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
    return (
        <section>
            <h1 className='text-3xl font-bold text-center'>News</h1>
            <div className='py-10'>
                <Select
                    defaultValue='All'
                    style={{ width: 120 }}
                    onSelect={value => { setPage(1), setCategories(value) }} >
                    {
                        options.map((item) => (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        ))
                    }
                </Select>
            </div>
            <Spin spinning={loading} >
                <div className='grid grid-cols-3 gap-5'>
                    {
                        news?.results?.map((item) => (
                            <NewsItem key={item.id} data={item} page={page} />
                        ))
                    }
                </div>
            </Spin>
            <Pagination
                current={page}
                className='bg-white my-10'
                onChange={page => setPage(page)}
                total={news?.number_of_total_results} />

        </section>
    )
}

export default News