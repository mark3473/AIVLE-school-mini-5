import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = () => {
    return (
        <div className="page-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <Outlet /> {/* NewBookPage, BookListPage 등 렌더링 */}
                </div>
            </div>
        </div>
    );
};

export default Layout;