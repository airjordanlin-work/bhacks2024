"use client";
import WebcamWithBoundingBox from "@/app/components/Webcam";
import { styled } from "styled-components";

const BigDiv = styled.div`
    background-color: #1a1a1a;
    margin: 1% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 90%;
    border-radius: 50px;
    border: solid white 10px;
`;

const Myh1 = styled.h1`
    text-align: center;
    color: blueviolet;
    padding-top: 1%;
`;

const SmallDiv = styled.div`
    background-color: blueviolet;
    margin: 5% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: auto;
    border-radius: 50px;
    border: solid black 5px;
    padding: 20px;
`;

const WebcamBubble = styled.div`
    background-color: #333;
    border: solid #4b0082 3px;
    border-radius: 25px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
`;

const DescriptionBubble = styled.div`
    background-color: #4b0082;
    color: white;
    padding: 15px;
    margin: 10px;
    border-radius: 15px;
    text-align: center;
    font-size: 1.1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
`;

export default function Main() {
    return (
        <BigDiv>
            <Myh1>Activity Tracking Demo</Myh1>
            <WebcamBubble>
                <WebcamWithBoundingBox />
            </WebcamBubble>
            <SmallDiv>
                <DescriptionBubble>
                    Our mission is to create an innovative tool that helps astronauts maintain their
                    physical and mental health while on challenging space missions. This app is
                    designed to track their activities through bounding boxes placed around key
                    areas: sleeping quarters, workout stations, dining areas, and workspaces. In an
                    actual application, we would have cameras set up around the space ship to ensure
                    good visual coverage of the spacecraft, while also paying mind to the astronauts
                    privacy. By monitoring time spent in each activity zone, we can offer valuable insights
                    into their daily routines, identifying where adjustments may benefit their overall
                    well-being. With this data, astronauts can achieve a balanced schedule, ensuring
                    they’re dedicating enough time to essential activities while avoiding burnout.
                    Ground control also gains a powerful tool to remotely oversee their safety,
                    providing real-time updates on activity levels. Our project aims to enhance
                    astronaut health, safety, and work-life balance, contributing to successful,
                    sustainable missions.
                </DescriptionBubble>
            </SmallDiv>
        </BigDiv>
    );
}


