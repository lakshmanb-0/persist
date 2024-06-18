import React from 'react'
import NewsItem from './NewsItem'

const News = ({ news, handleStorage }) => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5' onClick={handleStorage}>
            {
                news?.map((item) => (
                    <NewsItem key={item.id} data={item} />
                ))
            }
            {news?.length === 0 && <p>No news found</p>}
        </div>
    )
}

export default News