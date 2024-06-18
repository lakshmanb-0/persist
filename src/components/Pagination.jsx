import React from 'react'
import { Pagination as AntPagination } from 'antd'
const Pagination = ({ news, page, pageChange }) => {
    return (
        <AntPagination
            current={page}
            responsive
            className='my-10 mx-auto w-fit'
            pageSize={12}
            showSizeChanger={false}
            onChange={pageChange}
            total={news?.number_of_total_results} />
    )
}

export default Pagination