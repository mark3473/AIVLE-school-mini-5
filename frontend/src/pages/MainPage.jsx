import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function MainPage() {
    const [signupData, setSignupData] = useState({
        loginId: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData)
            });

            if (!response.ok) {
                throw new Error("회원가입 실패");
            }

            const result = await response.json();
            console.log("회원가입 성공:", result);

            alert("회원가입이 완료되었습니다. 로그인 해주세요!");
            navigate('/login');

        } catch (error) {
            console.error("에러 발생:", error);
            alert("회원가입 과정에서 오류가 발생했습니다.");
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <form onSubmit={handleSignupSubmit}>
                    <TextField
                        label="아이디"
                        name="loginId"
                        value={signupData.loginId}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="비밀번호(최소 8글자 이상)"
                        name="password"
                        type="password"
                        value={signupData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        가입하기
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default MainPage;