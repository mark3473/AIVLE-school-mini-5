import React from 'react';
import { Box, Typography, Button, Stack, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

function BookDetailModal({ book, onClose, onDelete }) {
    if (!book) return null;

    const handleDelete = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(book.id);
            onClose();
        }
    };

    return (
        <Box sx={style}>
            <Typography variant="h4" component="h1" gutterBottom>
                {book.title}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box
                        component="img"
                        src={book.coverImg}
                        alt={book.title}
                        sx={{
                            width: "70%",
                            height: "auto",
                            borderRadius: 2,
                            objectFit: "cover",
                            boxShadow: 2,
                        }}
                    />
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="subtitle1" gutterBottom>
                        저자: {book.author}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        출판사: {book.publisher}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        장르: {book.genre}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        줄거리: {book.summary || "줄거리 정보 없음"}
                    </Typography>
                </Grid>
            </Grid>

            <Box mt={3} textAlign="right">
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        삭제
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        닫기
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default BookDetailModal;