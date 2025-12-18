import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        loginId: '',
        oldPassword: '',
        newPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/users/${formData.loginId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "비밀번호 변경 실패");
            }

            alert("비밀번호가 성공적으로 변경되었습니다!");
            navigate("/login");   // 로그인 페이지로 이동

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
                width: "100%",
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
                <Typography variant="h5" gutterBottom>
                    비밀번호 변경
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="로그인 ID"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        label="기존 비밀번호"
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        label="새 비밀번호 (8자 이상)"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? "변경 중..." : "비밀번호 변경"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default ChangePasswordPage;