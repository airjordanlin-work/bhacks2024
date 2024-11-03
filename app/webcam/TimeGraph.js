// TimeDisplay.js

import React from 'react';
import styled from 'styled-components';

const SmallDiv = styled.div`
    background-color: #1a1a1a;
    margin: 5% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: auto;
    border-radius: 50px;
    border: solid black 5px;
    padding: 5%;
`;

const Bubble = styled.div`
    background-color: #4b0082;
    color: white;
    padding: 15px 25px;
    margin: 10px;
    border-radius: 25px;
    text-align: center;
    font-size: 1.2em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 80%;
`;

const Title = styled.h3`
    color: white;
    text-align: center;
    margin-bottom: 20px;
`;

const TimeDisplay = ({ timeInBoxes }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SmallDiv>
            <Title>Time Spent in Each Box</Title>
            {timeInBoxes.map((time, index) => (
                <Bubble key={index}>
                    You have spent {formatTime(time)} in box {index + 1}
                </Bubble>
            ))}
        </SmallDiv>
    );
};

export default TimeDisplay;
