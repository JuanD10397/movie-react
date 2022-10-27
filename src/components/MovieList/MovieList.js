import React from 'react';
//Avatar es la imágen pequeña de la película
import { List, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { RightOutlined } from "@ant-design/icons";

import "./MovieList.scss";


export default function MovieList(props){

    const { title, movies } = props;

    if(movies.loading || !movies.result) {
        return <Loading />
    }

    return (
        <List 
            className="movie-list"
            size="default"
            header={<h2>{title}</h2>}
            bordered
            dataSource={movies.result.results} //Aquí están los resultados del fetch
            renderItem={movie => <RenderMovie movie={movie} />} //Por cada iteración va a renderizar una sola película
        >

        </List>
    )
}

// COMPONENTE INTERNO
// Renderiza la información de cada película en la lista
function RenderMovie(props){

    const{ movie: { id, title, poster_path } } = props
    const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
        <List.Item className="movie-list__movie">
            <List.Item.Meta 
                avatar={<Avatar src={posterPath} />}
                title={<Link to={`/movie/${id}`}>{title}</Link>}
            />
            <Link to={`/movie/${id}`}>
                <Button type="primary" shape="circle">
                    <RightOutlined />
                </Button>
            </Link>
        </List.Item>
    );
}