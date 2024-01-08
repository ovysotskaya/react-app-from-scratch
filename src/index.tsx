import React from "react";
import {App} from './app/App';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
