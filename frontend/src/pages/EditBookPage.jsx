import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField, Button, Box, Typography, Select, MenuItem,
    FormControl, List, ListItem, ListItemText,
    ListItemSecondaryAction, Paper, Divider, Modal
} from '@mui/material';

function EditBookPage({ books, setBooks }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        summary: '',
        genre: '',
        publisher: '',
        coverImg: ''
    });

    const bookToEdit = id ? books.find(book => book.id === parseInt(id)) : null;

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title,
                author: bookToEdit.author,
                summary: bookToEdit.summary,
                genre: bookToEdit.genre,
                publisher: bookToEdit.publisher,
                coverImg: bookToEdit.coverImg ?? ''
            });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 표지 생성 관련 상태
    const [openApiKeyModal, setOpenApiKeyModal] = useState(false);
    const [userApiKey, setUserApiKey] = useState('');
    const [generatedCoverImage, setGeneratedCoverImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [coverGenerationError, setCoverGenerationError] = useState('');

    const [selectedModel, setSelectedModel] = useState('dall-e-3');
    const [selectedQuality, setSelectedQuality] = useState('high');
    const [selectedStyle, setSelectedStyle] = useState('realistic');

    const handleModelChange = (e) => setSelectedModel(e.target.value);
    const handleQualityChange = (e) => setSelectedQuality(e.target.value);
    const handleStyleChange = (e) => setSelectedStyle(e.target.value);

    // OpenAI 이미지 생성
    const handleGenerateCover = async () => {
        if (!userApiKey) {
            alert('API 키를 입력해주세요.');
            return;
        }
        setIsGenerating(true);
        setCoverGenerationError('');

        try {
            const prompt = `
                당신은 도서 관리 시스템에서 책 표지를 생성하는 전문가입니다.
                제목: ${formData.title}
                줄거리: ${formData.summary}
                장르: ${formData.genre}
                스타일: ${selectedStyle}, 품질: ${selectedQuality}
            `;

            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: selectedModel,
                    prompt,
                    n: 1,
                    size: '1024x1024',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || '이미지 생성 실패');
            }

            const imageUrl = data.data[0].url;
            setGeneratedCoverImage(imageUrl);
            setFormData(prev => ({ ...prev, coverImg: imageUrl })); // formData 갱신
        } catch (error) {
            setCoverGenerationError(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    // 수정 완료
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookToEdit) return;

        try {
            await axios.put(`/api/books/${bookToEdit.id}`, formData);

            // 클라이언트 state 갱신
            setBooks(prevBooks =>
                prevBooks.map(book =>
                    book.id === bookToEdit.id ? { ...book, ...formData } : book
                )
            );

            alert("수정이 완료되었습니다.");
            navigate('/books');
        } catch (error) {
            console.error(error);
            alert("수정 실패");
        }
    };

    if (!id) {
        // 도서 리스트 화면
        return (
            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                <Typography variant="h4" gutterBottom>수정할 도서 선택</Typography>
                <Paper style={{ maxHeight: '690px', overflow: 'auto' }}>
                    <List>
                        {books.length === 0 ? (
                            <Typography style={{ padding: '20px' }}>등록된 도서가 없습니다.</Typography>
                        ) : (
                            books.map(book => (
                                <React.Fragment key={book.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={book.title}
                                            secondary={`저자: ${book.author} | 출판사: ${book.publisher}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/edit-book/${book.id}`)}
                                            >
                                                수정하기
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Paper>
            </div>
        );
    }

    if (!bookToEdit) {
        return <p style={{ padding: '20px' }}>존재하지 않는 도서 ID입니다.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>도서 정보 수정</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="도서 제목" name="title" value={formData.title} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="작가 이름" name="author" value={formData.author} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="도서 줄거리" name="summary" value={formData.summary} onChange={handleChange} fullWidth required margin="normal" multiline rows={4} />
                    <TextField label="출판사" name="publisher" value={formData.publisher} onChange={handleChange} fullWidth required margin="normal" />

                    <FormControl fullWidth margin="normal">
                        <Select name="genre" value={formData.genre} onChange={handleChange} required>
                            <MenuItem value="ROMANCE">로맨스</MenuItem>
                            <MenuItem value="SF">SF</MenuItem>
                            <MenuItem value="MYSTERY">미스터리</MenuItem>
                            <MenuItem value="THRILLER">공포,스릴러</MenuItem>
                            <MenuItem value="HISTORY">역사</MenuItem>
                            <MenuItem value="ESSAY">에세이</MenuItem>
                        </Select>
                    </FormControl>

                    {formData.coverImg && (
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            <Typography variant="h6">현재 표지 이미지</Typography>
                            <img src={formData.coverImg} alt="Cover" width="60%" style={{ borderRadius: '8px' }} />
                        </div>
                    )}

                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => setOpenApiKeyModal(true)}
                        sx={{ mt: 2 }}
                    >
                        표지 다시 만들기
                    </Button>

                    <Box mt={2} display="flex" gap={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>수정 완료</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/')}>목록으로</Button>
                    </Box>
                </form>
            </Box>

            {/* API 키 입력 Modal */}
            <Modal open={openApiKeyModal} onClose={() => setOpenApiKeyModal(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '8px'
                }}>
                    <Typography variant="h6">API 키 입력</Typography>
                    <TextField
                        label="OpenAI API Key"
                        type="password"
                        value={userApiKey}
                        onChange={(e) => setUserApiKey(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <Select value={selectedModel} onChange={handleModelChange}>
                            <MenuItem value="dall-e-3">DALL-E 3</MenuItem>
                            <MenuItem value="dall-e-2">DALL-E 2</MenuItem>
                            <MenuItem value="gpt-image-1">GPT Image-1</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Select value={selectedQuality} onChange={handleQualityChange}>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Select value={selectedStyle} onChange={handleStyleChange}>
                            <MenuItem value="abstract">Abstract</MenuItem>
                            <MenuItem value="realistic">Realistic</MenuItem>
                            <MenuItem value="fantasy">Fantasy</MenuItem>
                            <MenuItem value="cartoon">Cartoon</MenuItem>
                            <MenuItem value="vintage">Vintage</MenuItem>
                            <MenuItem value="pop art">Pop Art</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleGenerateCover}
                        disabled={isGenerating}
                    >
                        {isGenerating ? '생성 중...' : '표지 생성'}
                    </Button>

                    {coverGenerationError && <Typography color="error" variant="body2">{coverGenerationError}</Typography>}

                    {generatedCoverImage && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography variant="h6">미리보기</Typography>
                            <img src={generatedCoverImage} alt="Generated Cover" width="100%" />
                        </div>
                    )}

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="outlined" color="secondary" onClick={() => setGeneratedCoverImage(null)}>다시 생성</Button>
                        <Button variant="contained" color="primary" onClick={() => setOpenApiKeyModal(false)}>확인</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default EditBookPage;
