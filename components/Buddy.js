import styled from "styled-components";
import Image from "next/image";
import evo1 from "@/app/public/evo1.png";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch; 
`;

const StyledDiv = styled.div`
    margin-top: 3%;
    border: 3px solid grey;
    border-radius: 5px;
    width: 90%;
    padding: 2%;
    display: flex;
    flex-direction: row;
    height: auto;
    align-items: flex-start;
`;

const StyledText = styled(Typography)`
    color: white; /* Ensure the text is visible on a dark background */
    padding: 0;
    margin: 10px 0;
`;

const StyledCalendarWrapper = styled.div`
    margin-left: 20px;
    padding: 10px;
    background-color: #2c2c2c; /* Dark background for the calendar */
    border: 2px solid grey;
    border-radius: 8px;
    color: white;

    .MuiTypography-root, .MuiSvgIcon-root {
        color: white !important; /* Ensure text and icons are white */
    }
`;

const StyledButton = styled(Button)`
    height: 10%;
`;

const StyledBr = styled.br`
    padding: 30%;
`;

const StyledRight = styled.div`
    padding: 5%;
    margin-top: 3%;
    width: 20%;
    height: auto; 
    border: 3px solid gray;
    border-radius: 5px;
`;

export default function BuddyTerminal() {
    return (
        <StyledWrapper>
            <StyledDiv>
                <Image
                    src={evo1}
                    alt="Asteroid mascot"
                    width={500}
                    height={500}
                />
                <div>
                    <StyledText variant="h5">Hello There Traveler</StyledText>
                </div>
                <StyledCalendarWrapper>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                    </LocalizationProvider>
                </StyledCalendarWrapper>
            </StyledDiv>

            <StyledRight>
                <Typography>Task Points:</Typography>
                <StyledBr />
                <StyledButton variant="contained" size="large">
                    Evolve Crash
                </StyledButton>
            </StyledRight>
        </StyledWrapper>
    );
}
