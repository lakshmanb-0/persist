import { Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NewsItem = ({ data, page }) => {
    const { title, authors, image, publish_date } = data
    const navigate = useNavigate()

    const handleClick = () => {
        sessionStorage.setItem('page', page)
        navigate(`/news/${data.id}`, { state: data })
    }
    return (
        <button
            onClick={handleClick}
            className='flex flex-col gap-4 bg-secondary rounded-xl overflow-hidden h-fit' >
            <img src={image.original} alt="" className='w-full' />
            <div className='p-4'>
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