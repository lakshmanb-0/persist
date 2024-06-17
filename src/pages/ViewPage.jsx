import HTMLReactParser from 'html-react-parser/lib/index'
import moment from 'moment'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ViewPage = () => {
    const { state } = useLocation()

    return (
        <main className='max-w-7xl py-5 px-4 mx-auto'>
            <Link to='/' className='hover:text-primary text-white/80'> -Back</Link>
            <img src={state.image.original} alt="" className='pt-5' />
            <div className='px-10 py-5'>
                <h1 className='text-4xl py-3 font-bold'>{state.title}</h1>
                <p>By <span className='text-primary'>{state.authors}</span>  on {moment(state.publish_date).format('MMM D, YYYY')}</p>
                <p className='pt-10  [&_a]:text-primary text-lg space-y-6  '>{HTMLReactParser(state.body)}</p>
            </div>

        </main>
    )
}

export default ViewPage