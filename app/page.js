"use client"

import Image from "next/image";
import {Container} from "@mui/material"
import {ThemeProvider} from "@mui/material";

import CustomStepper from "@/app/components/stepper";
import SideNav from "@/app/components/sideNav";
import CustomTimeline from "@/app/components/timeline";

import Header from "@/app/components/Header";

import styled from "styled-components";


const StyledDiv = styled.div`

`

const StyledCenter = styled.div`
    margin-top: 5%;
    display:flex;
    flex-direction: row;
    border: 2px solid white;
    padding: 10px;
`

export default function Home() {
  return (
      <>

          <Container sx={{
              height: "150vh",
              bgcolor: "black",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(/spaceGif.gif)`, // Correct path to the GIF
              backgroundPosition: "center",
              backgroundSize: "cover", // Optional: makes the background cover the entire container
          }}
          >
              <Header/>
              <StyledCenter>

                  <SideNav/>
                  <CustomTimeline/>

              </StyledCenter>
              <StyledDiv>
                  <CustomStepper/>
              </StyledDiv>


          </Container>

      </>
  );
}
