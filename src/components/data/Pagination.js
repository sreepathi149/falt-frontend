import React from 'react'
import { Container } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'

const PaginationD = (props) => {
    const { nPages, currentPage, setCurrentPage } = props
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <Container fluid className='d-flex justify-content-center mt-3'>
            <Pagination>
                <Pagination.Prev onClick={goToPrevPage}/>
                {pageNumbers.map((pgNumber) => {
                    return currentPage === pgNumber ? <Pagination.Item key={pgNumber} onClick={() => setCurrentPage(pgNumber)} active >{pgNumber}</Pagination.Item> : <Pagination.Item key={pgNumber} onClick={() => setCurrentPage(pgNumber)} >{pgNumber}</Pagination.Item>
                })}
                <Pagination.Ellipsis />
                <Pagination.Next onClick={goToNextPage}/>
            </Pagination>
        </Container>
    )
}

export default PaginationD