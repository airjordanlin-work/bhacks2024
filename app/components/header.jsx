"use client"

import styled from "styled-components";
import {Typography} from "@mui/material";

const StyledHeader = styled.header`
    margin-right:10%;
    text-align:center;
    color: green;
    width: 50%;

`;

export default function Header(){

    return(
        <StyledHeader>

            <Typography variant="h3" sx={{ color: "green" }}>Peace of Mind</Typography>

        </StyledHeader>
    );
}