import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 예: localStorage에서 로그인 정보 삭제
        localStorage.removeItem('loginId');
        // 로그인 페이지로 이동
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/books" className={({ isActive }) => isActive ? "active" : ""}>
                            전체 도서
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" className={({ isActive }) => isActive ? "active" : ""}>
                            검색
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-book" className={({ isActive }) => isActive ? "active" : ""}>
                            도서 추가
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/edit-book" className={({ isActive }) => isActive ? "active" : ""}>
                            도서 수정
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/change-password" className={({ isActive }) => isActive ? "active" : ""}>
                            비밀번호 변경
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button className="logout-button" onClick={handleLogout}>
                로그아웃
            </button>
        </aside>
    );
}

export default Sidebar;