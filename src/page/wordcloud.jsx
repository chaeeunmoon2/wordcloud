import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';

const keywords = [
    "집중력",
    "예술감성",
    "노래",
    "가족",
    "부끄러움",
    "Active",
    "호기심",
    "적극성",
    "친구",
    "수다쟁이",
    "규칙",
    "공룡",
    "역할극",
    "책",
    "장난감",
    "상상력",
    "창의성",
    "동물",
    "자주성",
    "춤",
    "그림",
    "창의력",
    "모험",
    "사회성",
];

// 기본 JSON 데이터
const jsonData = [
    { "word": "호기심", "count": 11 },
    { "word": "공룡", "count": 1 },
    { "word": "가족", "count": 4 },
    { "word": "부끄러움", "count": 3 },
    { "word": "집중력", "count": 1 },
    { "word": "예술감성", "count": 3 },
    { "word": "그림", "count": 3 },
    { "word": "창의성", "count": 6 },
    { "word": "자주성", "count": 7 },
    { "word": "적극성", "count": 4 },
    { "word": "active", "count": 8 },
    { "word": "상상력", "count": 10 },
    { "word": "역할극", "count": 7 },
    { "word": "규칙", "count": 1 },
    { "word": "모험", "count": 4 },
    { "word": "장난감", "count": 3 },
    { "word": "동물", "count": 2 },
    { "word": "사회성", "count": 4 },
    { "word": "수다쟁이", "count": 3 }
];

const WordCloudComponent = () => {
    const canvasRef = useRef(null);
    const [wordList, setWordList] = useState(jsonData); // 기본 값으로 jsonData 사용
    const [numKeywords, setNumKeywords] = useState(keywords.length); // 입력 값 설정

    useEffect(() => {
        const words = wordList.map(item => [item.word, item.count]); // wordList에서 단어와 count 추출

        const options = {
            list: words,
            gridSize: 10,
            weightFactor: 14,
            rotateRatio: 0,
            rotationSteps: 2,
            shape: "circle",
            ellipticity: 1.5,
            shrinkToFit: true,
            minSize: 6,
            classes: 'word-cloud-item',
            fontFamily: 'Bagel Fat One',
        };

        WordCloud(canvasRef.current, options);
    }, [wordList]); // wordList가 변동될 때마다 실행

    // input에서 받은 숫자만큼 랜덤으로 단어의 count를 생성하는 함수
    const handleInputChange = (e) => {
        const num = parseInt(e.target.value, 10);
        setNumKeywords(num); // 입력받은 숫자로 상태 설정
        const newWordList = keywords.slice(0, num).map(word => ({
            word: word,
            count: Math.floor(Math.random() * 16) + 1// 0 ~ 20 랜덤 값
        }));
        setWordList(newWordList); // 새로운 wordList로 설정
    };

    // 기본 버튼 클릭 시 jsonData로 wordList 설정
    const handleDefaultClick = () => {
        setWordList(jsonData);
    };

    return (
        <>
            <h2>현재 키워드 최대 {keywords.length + 1}개</h2>
            <div className="flex">
                <input
                    type="number"
                    value={numKeywords}
                    onChange={handleInputChange} // input 변경 시 호출
                    min="1"
                    max={keywords.length + 1}
                />
                <button className="btn" onClick={handleDefaultClick}>
                    기본
                </button>
            </div>
            <div>
                <p>기본은 19개 keyword로 구성</p>
                <p>카운트 값은 1 ~ 15까지 랜덤으로 구성</p>
            </div>
            <canvas ref={canvasRef} width="1000" height="1000"></canvas>

            <style jsx>{`
              @import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Moirai+One&family=Song+Myung&display=swap');
                
                .flex {
                    margin-bottom: 20px;
                }
                input {
                    margin-right: 10px;
                    padding: 5px;
                    font-size: 16px;
                }
                .btn {
                    padding: 5px 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
                body, h2, p, input, .btn {
                  //font-family: 'Pretendard', sans-serif;
                }
            `}</style>
        </>
    );
};

export default WordCloudComponent;
