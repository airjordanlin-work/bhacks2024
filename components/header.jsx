"use client";

import styled from "styled-components";
import { Typography } from "@mui/material";
import { usePoints } from '@/app/context/PointsContext'; // Import the points context

// Header styling
const StyledHeader = styled.header`
  position: relative;
  margin-right: 10%;
  text-align: center;
  color: Orange;
  width: 50%;
`;

// Points bubble styling
const PointsBubble = styled.div`
  position: absolute;

  background-color: white;
  color: green;
  border-radius: 50%;
  width: 40px;height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export default function Header() {
    const { points } = usePoints(); // Access points from context

    return (
        <StyledHeader>
            <PointsBubble>{points}</PointsBubble>
            <Typography variant="h3" sx={{ color: "green" }}>Plan-It</Typography>
        </StyledHeader>
    );
}
