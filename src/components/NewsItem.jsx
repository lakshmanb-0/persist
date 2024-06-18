import { Tooltip } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewsItem = ({ data }) => {
    const { title, authors, image, publish_date } = data
    const [imageUrl, setImageUrl] = useState(image.screen_tiny)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/news/${data.id}`, { state: data })
    }
    return (
        <button
            onClick={handleClick}
            className='flex flex-col gap-4 bg-secondary rounded-xl overflow-hidden' >
            <img src={imageUrl} alt="" className='w-full' />
            <img src={image.original} alt="" className='hidden' onLoad={() => setImageUrl(image.original)} />
            <div className='p-4 w-full'>
                <Tooltip title={title} >
                    <h1 className='text-xl font-bold line-clamp-2'>{title}</h1>
                </Tooltip>
                <div className='pt-5 flex justify-between items-center'>
                    <p className='font-medium text-primary'>{authors}</p>
                    <p className='text-white/40'>{moment(publish_date).format('MMM D, YYYY')}</p>
                </div>
            </div>
        </button>
    )
}

export default NewsItem