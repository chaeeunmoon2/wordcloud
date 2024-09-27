import React, { useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

// JSON 데이터 (totoAfricaLyrics 대신 사용)
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

// 단어 빈도수 리스트로 변환
const words = jsonData.map((item) => ({
    text: item.word,
    value: item.count
}));

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

// 폰트 크기 스케일 설정
const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [10, 100],
});
const fontSizeSetter = (datum) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;

function getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
}

export default function Example({ width, height, showControls }) {
    const [spiralType, setSpiralType] = useState('archimedean');
    const [withRotation, setWithRotation] = useState(false);

    return (
        <div className="wordcloud">
            <Wordcloud
                words={words}
                width={width}
                height={height}
                fontSize={fontSizeSetter}
                font={'Impact'}
                padding={2}
                spiral={spiralType}
                rotate={withRotation ? getRotationDegree : 0}
                random={fixedValueGenerator}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => (
                        <Text
                            key={w.text}
                            fill={colors[i % colors.length]}
                            textAnchor={'middle'}
                            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                            fontSize={w.size}
                            fontFamily={w.font}
                        >
                            {w.text}
                        </Text>
                    ))
                }
            </Wordcloud>
            {showControls && (
                <div>
                    <label>
                        Spiral type &nbsp;
                        <select
                            onChange={(e) => setSpiralType(e.target.value)}
                            value={spiralType}
                        >
                            <option key={'archimedean'} value={'archimedean'}>
                                archimedean
                            </option>
                            <option key={'rectangular'} value={'rectangular'}>
                                rectangular
                            </option>
                        </select>
                    </label>
                    <label>
                        With rotation &nbsp;
                        <input
                            type="checkbox"
                            checked={withRotation}
                            onChange={() => setWithRotation(!withRotation)}
                        />
                    </label>
                    <br />
                </div>
            )}

            {/*<style jsx>{`*/}
            {/*  .wordcloud {*/}
            {/*    display: flex;*/}
            {/*    flex-direction: column;*/}
            {/*    user-select: none;*/}
            {/*  }*/}
            {/*  .wordcloud svg {*/}
            {/*    margin: 1rem 0;*/}
            {/*    cursor: pointer;*/}
            {/*  }*/}

            {/*  .wordcloud label {*/}
            {/*    display: inline-flex;*/}
            {/*    align-items: center;*/}
            {/*    font-size: 14px;*/}
            {/*    margin-right: 8px;*/}
            {/*  }*/}
            {/*  .wordcloud textarea {*/}
            {/*    min-height: 100px;*/}
            {/*  }*/}
            {/*`}</style>*/}
        </div>
    );
}
