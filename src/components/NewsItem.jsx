import { Tooltip } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/newsSlice';

const NewsItem = ({ data }) => {
    const { title, authors, image, publish_date } = data
    const [imageUrl, setImageUrl] = useState(image.screen_tiny)
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)


    // navigate to view page
    const handleClick = () => {
        navigate(`/news/${data.id}`, { state: { ...data, fromSearch: pathname.includes('/search') } })
    }

    // toggle like
    const handleLike = () => {
        if (liked) {
            setLiked(false)
            dispatch(removeFavorite(data.id))
        } else {
            setLiked(true)
            dispatch(addFavorite(data))
        }
    }

    useEffect(() => {
        // Check if the current news item is in the favorites
        const isLiked = favorites?.some(item => item.id === data.id)
        setLiked(isLiked)
    }, [favorites, data.id])

    return (
        <button
            onClick={handleClick}
            className='flex flex-col gap-4 bg-secondary rounded-xl overflow-hidden relative shadow-2xl '
        >
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
            <div className='absolute top-2 right-2' onClick={(e) => e.stopPropagation()}>
                {
                    liked
                        ? <GoHeartFill className=' fill-primary' size={35} onClick={handleLike} />
                        : <GoHeart className=' text-primary' size={35} onClick={handleLike} />
                }
            </div>
        </button>
    )
}

export default NewsItem