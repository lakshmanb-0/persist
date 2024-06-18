import { Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Search = ({ value = '' }) => {
    const navigate = useNavigate()

    const handleSearch = (value) => {
        sessionStorage.clear()
        navigate(`/search/${value}`)
    }
    return (
        <Input.Search
            defaultValue={value}
            placeholder="Search"
            className='px-3'
            onSearch={handleSearch}
            enterButton
        />
    )
}

export default Search