import React from "react";
import { Layout } from 'antd';

import "./Footer.scss";

export default function(){

    const { Footer } = Layout;

    return (
        <Footer className="footer">
            <p>Juan Diego Pérez Fonseca</p>
        </Footer>
    )
}