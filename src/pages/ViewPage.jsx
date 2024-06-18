import { Breadcrumb } from 'antd'
import HTMLReactParser from 'html-react-parser/lib/index'
import moment from 'moment'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ViewPage = () => {
    const { state } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0, { behavior: 'smooth' })
    }, [])

    const breadcrumbList = [
        { title: <Link to={'/'}>Home</Link>, },
        !!state?.fromSearch && {
            title: <Link to={-1}>Search</Link>,
        },
        { title: state.id, },
    ]
    return (
        <main className='max-w-7xl py-5 px-4 mx-auto'>
            <Breadcrumb
                items={breadcrumbList}
            />
            <div className='sm:px-5 md:px-10 py-5'>
                <h1 className='text-2xl sm:text-5xl py-4 font-bold'>{state.title}</h1>
                <p className='text-sm text-right'>By <span className='text-primary'>{state.authors}</span>  on {moment(state.publish_date).format('MMM D, YYYY')}</p>
            </div>
            <img src={state.image.original} alt="" className='pt-5 mx-auto' />
            <div className='pt-10 [&_a]:text-primary sm:text-lg space-y-6  overflow-hidden'>{HTMLReactParser(state.body)}</div>
        </main>
    )
}

export default ViewPage