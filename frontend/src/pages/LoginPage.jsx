import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function LoginPage() {
    const [loginData, setLoginData] = useState({
        loginId: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error("로그인 실패");
            }

            const result = await response.json();
            console.log("로그인 성공:", result);

            navigate('/new-book'); // 로그인 성공 후 이동

        } catch (error) {
            console.error("에러 발생:", error);
            alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form onSubmit={handleLoginSubmit}>
                    <TextField
                        label="아이디"
                        name="loginId"
                        value={loginData.loginId}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        로그인
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default LoginPage;