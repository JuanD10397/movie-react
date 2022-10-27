import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ReactPlayer from 'react-player';

import "./ModalVideo.scss";


export default function ModalVideo(props){

    //isOpen es para saber si el modal está abierto y close es para cerrarlo
    const { videoKey, videoPlatform, isOpen, close } = props;

    // En urlVideo guardaré el url del trailer de la película
    const [urlVideo, setUrlVideo ] = useState(null);

    // Dependiendo de la plataforma en la que esté el trailer guardo el url. videoKey contiene una parte de la dirección url del trailer
    useEffect(() => {
        switch (videoPlatform) {
            case "YouTube":
                setUrlVideo(`https://youtu.be/${videoKey}`);
                break;
            case "Vimeo":
                setUrlVideo(`https://vimeo.com/${videoKey}`);
                break;
            default:
                break;
        }

    }, [videoKey, videoPlatform]); //Si alguna de estas 2 variables son modificadas se vuelve a ejecutar el useEffect

    

    return (
        <Modal
            className="modal-video"
            visible={isOpen}
            centered
            onCancel={close}
            footer={false}
        >
            <ReactPlayer url={urlVideo} controls/> {/**controls permite detener, adelantar, etc el video */}
        </Modal>
    );
}