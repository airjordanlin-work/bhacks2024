import styled, { keyframes } from "styled-components";
import Image from "next/image";
import evo1 from "@/app/public/evo1.png";
import evo2 from "@/app/public/evo2.png";
import evo3 from "@/app/public/evo3.png";
import { Typography, Button, IconButton, Paper } from "@mui/material";
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const DateContext = React.createContext();

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const StyledWrapper = styled(Paper)`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
    gap: 20px;
    background-color: #1a1a1a;
    border-radius: 10px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 10px;
        align-items: center;
    }
`;

const StyledRight = styled(Paper)`
    padding: 20px;
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2c2c2c;

    @media (max-width: 768px) {
        width: 100%;
        padding: 10px;
    }
`;

const StyledDiv = styled.div`
    border-radius: 10px;
    width: 85%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        padding: 10px;
    }
`;

const ImageTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${bounce} 2s infinite;
`;

const Bubble = styled(Paper)`
    padding: 15px 20px;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    text-align: center;
    background-color: #ffa83b;
    color: black;

    @media (max-width: 768px) {
        padding: 10px;
        font-size: 0.9rem;
    }
`;

const DateText = styled(Typography)`
    color: white;
    font-size: 1rem;
    margin-top: 5px;
`;

const StyledCalendarWrapper = styled(Paper)`
    padding: 10px;
    background-color: #2c2c2c;
    border-radius: 10px;
    color: white;
    width: 80vh;

    .MuiTypography-root, .MuiSvgIcon-root {
        color: white !important;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    background-color: #1976d2;
    color: white;

    &:hover {
        background-color: #1565c0;
    }

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const MoodTracker = styled(Paper)`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    background-color: #333;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledIconButton = styled(IconButton)`
    transition: transform 0.2s ease, color 0.2s ease;

    &:hover {
        color: deepskyblue;
        transform: scale(1.2);
    }
`;


export default function BuddyTerminal() {
    const [evolutionStage, setEvolutionStage] = React.useState(1);
    const [selectedDate, setSelectedDate] = React.useState(dayjs().format("MMMM D, YYYY"));
    const [mood, setMood] = React.useState(null);

    const evolutionImages = [evo1, evo2, evo3];
    const currentImage = evolutionImages[evolutionStage - 1];

    const handleEvolveClick = () => {
        setEvolutionStage((prevStage) => Math.min(prevStage + 1, evolutionImages.length));
    };

    const handleRevertClick = () => {
        setEvolutionStage((prevStage) => Math.max(prevStage - 1, 1));
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate.format("MMMM D, YYYY"));
    };

    const handleMoodClick = (newMood) => {
        setMood(newMood);
    };

    return (
        <DateContext.Provider value={selectedDate}>
            <StyledWrapper elevation={3}>
                <StyledRight elevation={3}>
                    <Typography variant="h6" style={{ color: 'white' }}>Task Points:</Typography>
                    <StyledButton variant="contained" size="large" onClick={handleEvolveClick}>
                        Evolve Crash
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        size="large"
                        onClick={handleRevertClick}
                        sx={{ marginTop: '10px', backgroundColor: '#d32f2f' }}
                    >
                        Revert Crash
                    </StyledButton>
                </StyledRight>
                <StyledDiv>
                    <ImageTextContainer>
                        <Image
                            src={currentImage}
                            alt="Asteroid mascot"
                            width={300}
                            height={300}
                        />
                        <Bubble elevation={3}>
                            <Typography variant="h5">Hello There Traveler... Are you here for a Crash Report?</Typography>
                            <DateText variant="caption">Selected Date - {selectedDate}</DateText>
                            <br/>
                            <DateText variant="caption">
                                Today's Mood -  {mood ? mood : "No mood selected"}
                            </DateText>
                        </Bubble>
                    </ImageTextContainer>
                    <StyledCalendarWrapper elevation={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={dayjs(selectedDate)}
                                onChange={(newDate) => handleDateChange(newDate)}
                            />
                        </LocalizationProvider>
                        <Typography variant="h6" style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
                            Mood Tracker
                        </Typography>
                        <MoodTracker elevation={3}>
                            <StyledIconButton onClick={() => handleMoodClick("Very Dissatisfied")}>
                                <SentimentVeryDissatisfiedIcon fontSize="large" />
                            </StyledIconButton>
                            <StyledIconButton onClick={() => handleMoodClick("Dissatisfied")}>
                                <SentimentDissatisfiedIcon fontSize="large" />
                            </StyledIconButton>
                            <StyledIconButton onClick={() => handleMoodClick("Neutral")}>
                                <SentimentNeutralIcon fontSize="large" />
                            </StyledIconButton>
                            <StyledIconButton onClick={() => handleMoodClick("Satisfied")}>
                                <SentimentSatisfiedIcon fontSize="large" />
                            </StyledIconButton>
                            <StyledIconButton onClick={() => handleMoodClick("Very Satisfied")}>
                                <SentimentVerySatisfiedIcon fontSize="large" />
                            </StyledIconButton>
                        </MoodTracker>
                    </StyledCalendarWrapper>
                </StyledDiv>
            </StyledWrapper>
        </DateContext.Provider>
    );
}
