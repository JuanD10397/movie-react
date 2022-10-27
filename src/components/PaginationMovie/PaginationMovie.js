import React from 'react';
import Pagination from 'rc-pagination';

import './PaginationMovie.scss'

export default function PaginationMovie(props){

    //página actual, total de elementos (no por página, global), función para cambiar de página
    const { currentPage, totalItems, onChangePage } = props;

    return (
        <Pagination 
            className="pagination" 
            current={currentPage}
            total={totalItems}
            pageSize={20}   //Cantidad de películas por página
            onChange={onChangePage}  //este componente Pagination envía el onChangePage automáticamente sin que nosotros hagamos nada
        />
    );
}