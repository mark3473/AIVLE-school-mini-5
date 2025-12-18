import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl, Modal } from '@mui/material';

function NewBookPage({ addNewBook }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        summary: '',
        genre: '',
        publisher: '',
        coverImg: ''  // 표지 이미지 URL 추가
    });
    const [openApiKeyModal, setOpenApiKeyModal] = useState(false); // API 키 입력 팝업 상태
    const [userApiKey, setUserApiKey] = useState(''); // 입력된 API 키 상태
    const [generatedCoverImage, setGeneratedCoverImage] = useState(null); // 생성된 표지 이미지 URL
    const [isGenerating, setIsGenerating] = useState(false); // 이미지 생성 중인지 여부
    const [coverGenerationError, setCoverGenerationError] = useState(''); // 에러 메시지

    // 모델, 품질, 스타일 상태 추가
    const [selectedModel, setSelectedModel] = useState('dall-e-3');
    const [selectedQuality, setSelectedQuality] = useState('high');
    const [selectedStyle, setSelectedStyle] = useState('realistic');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 모델, 품질, 스타일 선택 핸들러
    const handleModelChange = (e) => setSelectedModel(e.target.value);
    const handleQualityChange = (e) => setSelectedQuality(e.target.value);
    const handleStyleChange = (e) => setSelectedStyle(e.target.value);

    // API 호출 및 이미지 URL 처리
    const handleGenerateCover = async () => {
        if (!userApiKey) {
            alert('API 키를 입력해주세요.');
            return;
        }

        setIsGenerating(true);
        setCoverGenerationError(''); // 오류 초기화

        try {
            // 도서 제목, 줄거리, 장르를 기반으로 프롬프트 생성
            const prompt = `
        당신은 도서 관리 시스템에서 책 표지를 생성하는 전문가입니다.
        다음은 사용자가 제공한 도서 정보입니다. 이 정보를 바탕으로 도서의 특성에 맞는 책 표지 이미지를 생성해주세요.

        - **제목**: ${formData.title}
        - **줄거리**: ${formData.summary}
        - **장르**: ${formData.genre}

        추가적으로, 아래의 설정을 적용하여 책 표지를 생성해주세요:
        - **모델**: ${selectedModel}
        - **스타일**: ${selectedStyle}
        - **품질**: ${selectedQuality}

        이 정보를 바탕으로 도서의 정면 표지를 디자인해 주세요.`;

            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: selectedModel,  // 사용자가 선택한 모델
                    prompt,
                    n: 1,
                    size: '1024x1024',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message || '이미지 생성에 실패했습니다.');
            }

            const imageUrl = data.data[0].url;
            setGeneratedCoverImage(imageUrl); // 생성된 이미지 URL 상태에 저장
            setFormData(prevData => ({ ...prevData, coverImg: imageUrl }));  // formData에 이미지 URL 저장

        } catch (error) {
            setCoverGenerationError(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    // 도서 등록 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const response = await fetch("http://localhost:8080/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("도서 등록 실패");
            }

            const data = await response.json();
            alert("도서가 성공적으로 등록되었습니다!");
            addNewBook(formData);  // formData를 부모 컴포넌트에 전달
            navigate("/books");
        } catch (error) {
            console.error("도서 등록 오류:", error);
            alert("도서 등록 중 오류가 발생했습니다.");
        }
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    // 이미지를 로컬에 저장하는 함수
    const handleDownloadImage = (imageUrl) => {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = 'book_cover.png';  // 원하는 파일명
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{
                width: '100%',
                maxWidth: 600,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#fff'
            }}>
                <Typography variant="h4" gutterBottom>도서 등록</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="도서 제목"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="작가 이름"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="도서 줄거리"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="출판사"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>장르 선택</InputLabel>
                        <Select
                            label="장르 선택"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="ROMANCE">로맨스</MenuItem>
                            <MenuItem value="SF">SF</MenuItem>
                            <MenuItem value="MYSTERY">미스터리</MenuItem>
                            <MenuItem value="THRILLER">공포,스릴러</MenuItem>
                            <MenuItem value="HISTORY">역사</MenuItem>
                            <MenuItem value="ESSAY">에세이</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => setOpenApiKeyModal(true)} // 표지 생성 버튼 클릭 시 API 키 입력 팝업 열기
                    >
                        표지 생성
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        도서 등록
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleGoBack}
                    >
                        이전 페이지로 돌아가기
                    </Button>
                </form>
            </Box>

            {/* API 키 입력 팝업 */}
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

                    {/* 모델, 품질, 스타일 선택 */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>모델 선택</InputLabel>
                        <Select
                            value={selectedModel}
                            onChange={handleModelChange}
                        >
                            <MenuItem value="dall-e-3">DALL-E 3</MenuItem>
                            <MenuItem value="dall-e-2">DALL-E 2</MenuItem>
                            <MenuItem value="gpt-image-1">GPT Image-1</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>품질</InputLabel>
                        <Select
                            value={selectedQuality}
                            onChange={handleQualityChange}
                        >
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>스타일</InputLabel>
                        <Select
                            value={selectedStyle}
                            onChange={handleStyleChange}>

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
                        disabled={isGenerating} // 이미지 생성 중일 경우 비활성화
                    >
                        {isGenerating ? '생성 중...' : '생성'}
                    </Button>

                    {/* 에러 메시지 표시 */}
                    {coverGenerationError && <Typography color="error" variant="body2">{coverGenerationError}</Typography>}

                    {/* 이미지 미리보기 */}
                    {generatedCoverImage && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography variant="h6">미리보기</Typography>
                            <img src={generatedCoverImage} alt="Generated Cover" width="100%" />
                        </div>
                    )}

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setGeneratedCoverImage(null)} // 다시 생성 버튼
                        >
                            다시 생성
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setOpenApiKeyModal(false); // 팝업 닫기
                            }}
                        >
                            확인
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default NewBookPage;