"use client"

import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
    margin-right:10%;
`
export default function Header(){

    return(
        <header>
            <h2>Peace of Mind</h2>
            <nav>

                <StyledLink href="/">
                    Peace of Mind
                </StyledLink>

                <StyledLink href="/page1">
                    Page 1
                </StyledLink>
            </nav>
        </header>
    );
}