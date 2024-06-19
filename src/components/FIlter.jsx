import { Select } from 'antd'
import React from 'react'

const FIlter = ({ handleFilter, options }) => {
    const valueName = options.find((item) => item.id === JSON.parse(sessionStorage.getItem('selectedCategory')))

    return (
        <Select
            defaultValue={valueName?.name || 'All'}
            style={{ width: 150 }}
            onSelect={handleFilter} >
            {
                options.map((item) => (
                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                ))
            }
        </Select>
    )
}

export default React.memo(FIlter)