import { Input } from 'antd'
import React from 'react'

const Search = ({ value = '', handleSearch }) => {


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