"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Paper, TextField } from "@mui/material";
import { PlayArrow, Pause, Replay } from "@mui/icons-material";
import styled from "styled-components";

const TimerContainer = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    background-color: #333;
    color: white;
    max-width: 400px;
    text-align: center;
`;

const ButtonContainer = styled(Box)`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
    && {
        margin-bottom: 20px;
        width: 100%;
        background-color: #444;
        border-radius: 8px;
    }

    & .MuiOutlinedInput-root {
        color: white;

        & fieldset {
            border-color: #555;
        }
        &:hover fieldset {
            border-color: #888;
        }
        &.Mui-focused fieldset {
            border-color: #ffa83b;
        }
    }
`;

export default function MeditationPage() {
    const [timeLeft, setTimeLeft] = useState(5 * 60); // Default to 5 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(5); // Default input

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleStartPause = () => setIsRunning(!isRunning);
    const handleReset = () => {
        setTimeLeft(inputMinutes * 60);
        setIsRunning(false);
    };

    const handleInputChange = (e) => {
        setInputMinutes(e.target.value);
    };

    const handleSetTime = () => {
        setTimeLeft(inputMinutes * 60);
    };

    return (
        <>
            <Container
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#1a1a2e",
                    flexDirection: "column",
                }}
            >
                <TimerContainer elevation={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Meditation Timer
                    </Typography>
                    <StyledTextField
                        type="number"
                        label="Set Time (minutes)"
                        variant="outlined"
                        value={inputMinutes}
                        onChange={handleInputChange}
                        onBlur={handleSetTime}
                    />
                    <Typography variant="h1" component="p" sx={{ fontSize: "4rem" }}>
                        {formatTime(timeLeft)}
                    </Typography>
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={isRunning ? <Pause /> : <PlayArrow />}
                            onClick={handleStartPause}
                        >
                            {isRunning ? "Pause" : "Start"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<Replay />}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </ButtonContainer>
                </TimerContainer>
            </Container>
        </>
    );
}
