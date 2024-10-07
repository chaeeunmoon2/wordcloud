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
const jsonData2 = [
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

const jsonData1 = [
    {"word": "호기심", "count": 7},
    {"word": "역할극", "count": 7},
    {"word": "상상력", "count": 7},
    {"word": "자주성", "count": 5},
    {"word": "Active", "count": 5},
    {"word": "적극성", "count": 4},
    {"word": "사회성", "count": 4},
    {"word": "부끄러움", "count": 4},
    {"word": "모험", "count": 4},
    {"word": "가족", "count": 4},
    {"word": "창의성", "count": 3},
    {"word": "장난감", "count": 3},
    {"word": "수다쟁이", "count": 3},
    {"word": "동물", "count": 3},
    {"word": "창의력", "count": 2},
    {"word": "집중력", "count": 2},
    {"word": "노래", "count": 2},
    {"word": "친구", "count": 1},
    {"word": "책", "count": 1},
    {"word": "규칙", "count": 1},
    {"word": "공룡", "count": 1}
];

// 최최종
const jsonData = [
    {"word": "상상력", "count": "17"},
    {"word": "자립심", "count": "14"},
    {"word": "자율성", "count": "13"},
    {"word": "활동성", "count": "12"},
    {"word": "문제 해결력", "count": "12"},
    {"word": "창의성", "count": "10"},
    {"word": "내향성", "count": "10"},
    {"word": "호기심", "count": "9"},
    {"word": "탐구심", "count": "9"},
    {"word": "상호작용성", "count": "9"},
    {"word": "소심함", "count": "7"},
    {"word": "집중력", "count": "6"},
    {"word": "에너지", "count": "6"},
    {"word": "몰입력", "count": "6"},
    {"word": "모험심", "count": "6"},
    {"word": "학습 욕구", "count": "4"},
    {"word": "창의력", "count": "4"},
    {"word": "지적 호기심", "count": "4"},
    {"word": "음악성", "count": "4"},
    {"word": "언어 표현력", "count": "4"},
    {"word": "소통능력", "count": "4"},
    {"word": "사회성", "count": "4"},
    {"word": "협동성", "count": "3"},
    {"word": "인내심", "count": "3"},
    {"word": "안정감", "count": "3"},
    {"word": "실용성", "count": "3"},
    {"word": "사교성", "count": "3"},
    {"word": "목표 지향성", "count": "3"},
    {"word": "독립심", "count": "3"},
    {"word": "기술 이해력", "count": "3"},
    {"word": "기술 이해력2", "count": "3"},
];

const WordCloudComponent = () => {
    const canvasRef = useRef(null);
    const [wordList, setWordList] = useState(jsonData); // 기본 값으로 jsonData 사용
    const [numKeywords, setNumKeywords] = useState(keywords.length); // 입력 값 설정
    const [inputValue, setInputValue] = useState(''); // JSON 입력 값

    useEffect(() => {
        const words = wordList.map(item => [item.word, item.count]); // wordList에서 단어와 count 추출

        const wordCount = wordList.length;
        let weightFactor = 10;

        console.log(wordCount);

        if (wordCount >= 10) {
            weightFactor = 8;
        } else {
            weightFactor = 14;
        }

        console.log(`weightFactor = ${weightFactor}`);

        const options = {
            list: words,
            gridSize: 10,
            weightFactor: 8,
            rotateRatio: 0,
            rotationSteps: 2,
            shape: function(theta) {
                // 가로 타원의 방정식
                let a = 2; // 가로 방향으로 더 늘어나는 비율
                let b = 1; // 세로 방향 비율
                return 1 / Math.sqrt((a * Math.sin(theta))**2 + (b * Math.cos(theta))**2);
            },
            ellipticity: 1.5,
            shrinkToFit: true,
            minSize: 6,
            classes: 'word-cloud-item',
            // fontFamily: 'Bagel Fat One',
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

    const handleJsonClick = () => {
        try {
            const parsedData = JSON.parse(inputValue); // 입력된 JSON 문자열을 파싱
            const formattedData = parsedData.map(item => ({
                word: item.word,
                count: Number(item.count) || 1 // count를 숫자로 변환, 기본값은 1
            }));
            setWordList(formattedData); // 파싱한 데이터로 wordList 업데이트
        } catch (error) {
            console.error("Invalid JSON input:", error);
            alert("유효한 JSON 형식이 아닙니다. 다시 시도하세요.");
        }
    }

    return (
        <>
            {/*<h2>현재 키워드 최대 {keywords.length + 1}개</h2>*/}
            {/*<div className="flex">*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        value={numKeywords}*/}
            {/*        onChange={handleInputChange} // input 변경 시 호출*/}
            {/*        min="1"*/}
            {/*        max={keywords.length + 1}*/}
            {/*    />*/}
            {/*    <button className="btn" onClick={handleDefaultClick}>*/}
            {/*        기본*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <p>기본은 19개 keyword로 구성</p>*/}
            {/*    <p>카운트 값은 1 ~ 15까지 랜덤으로 구성</p>*/}
            {/*</div>*/}
            <div>
                <div>
                    <textarea
                        className="text-json"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='JSON 형식의 데이터를 입력하세요'
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <button className="btn" onClick={handleJsonClick}>확인</button>
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
                    margin-top: 1rem;
                    margin-bottom: 3rem;
                }
                body, h2, p, input, .btn {
                  //font-family: 'Pretendard', sans-serif;
                }
                
                .text-json {width: 100% }
            `}</style>
        </>
    );
};

export default WordCloudComponent;
