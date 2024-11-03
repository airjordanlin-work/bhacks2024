"use client";

import Image from "next/image";
import { Container } from "@mui/material";
import explainer from "@/app/public/explain.png";
import Header from "@/components/Header";
import BuddyTerminal from "@/components/Buddy";
import TaskTimeline from "@/components/timeline";
import styled from "styled-components";
import { PointsProvider } from './context/PointsContext';
import * as React from "react";

const StyledCenter = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  border: 2px solid white;
  padding: 10px;
  align-items: flex-start;
  gap: 20px;
`;

const ChatBubbleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ChatBubble = styled.div`
    background-color: ${(props) => (props.completed ? "#4a90e2" : "#ffa83b")}; /* Blue when completed */
    color: ${(props) => (props.completed ? "white" : "#333")}; /* White text when completed */
    border-radius: 20px;
    padding: 15px 20px;
    position: relative;
    font-size: 1rem;
    font-weight: bold;
    max-width: 200px;
    height: 100px;
    text-align: center;
    margin-left: 20px;

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-right-color: ${(props) => (props.completed ? "#4a90e2" : "#ffa83b")}; /* Blue arrow when completed */
        border-left: 0;
        margin-top: -10px;
    }
`;

export default function Home() {
    const [completedTasks, setCompletedTasks] = React.useState([]);

    const handleTaskCompletion = (completedTasksList) => {
        setCompletedTasks(completedTasksList);
    };

    return (
        <>
            <PointsProvider>
                <Container
                    sx={{
                        height: "150vh",
                        bgcolor: "black",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(/spaceGif.gif)`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <Header />
                    <BuddyTerminal />
                    <StyledCenter>
                        <TaskTimeline onTaskComplete={handleTaskCompletion} /> {/* Pass completion handler */}
                        <Image
                            src={explainer}
                            alt="Asteroid mascot"
                            width={300}
                            height={300}
                        />
                        <ChatBubbleContainer>
                            <ChatBubble completed={completedTasks.length > 0}>
                                {completedTasks.length > 0 ? "Good job!" : "I'm here to help you manage your tasks!"}
                            </ChatBubble>
                        </ChatBubbleContainer>
                    </StyledCenter>
                </Container>
            </PointsProvider>
        </>
    );
}
