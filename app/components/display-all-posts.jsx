"use client";
import { useState } from "react";
import styled from "styled-components";
import PostPreview from "./post-preview";
import NewPost from "./new-post";
import createNewPost from "@/lib/createNewPosts";

// Styled components for the layout
const Container = styled.div`
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

const TopBar = styled.div`

    color: white;
    width: 100%;
    padding: 10px;
    text-align: center;
`;

const BookContainer = styled.div`
    display: flex;
    width: 80%;
    margin-bottom: 20px;
    border: solid dimgrey 5px;
    border-radius: 25px;
    background-color: antiquewhite;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    padding: 20px 0;
    font-family: monospace, "Droid Sans Mono", sans-serif;

    /* Center line */
    &::before {
        content: "";
        position: absolute;
        top: 10px; /* Adjust to match padding */
        bottom: 10px; /* Adjust to match padding */
        left: 50%;
        width: 2px;
        background-color: dimgrey;
        transform: translateX(-50%);
    }
`;


const PageHalf = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 2em;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
        color: lightgray;
    }

    &:disabled {
        color: gray;
        cursor: default;
    }
`;

const LeftArrow = styled(ArrowButton)`
    left: -40px;
`;

const RightArrow = styled(ArrowButton)`
    right: -40px;
`;

export default function DisplayAllPosts({ inputPosts }) {
    const [posts, setPosts] = useState(inputPosts);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 4; // Two posts per half (left and right) per page
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    async function addNewPost(title, content) {
        const p = await createNewPost(title, content);
        if (p === null) {
            return false;
        }
        setPosts([p, ...posts]);
        return true;
    }

    function nextPage() {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    }

    function prevPage() {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    }

    return (
        <Container>
            <TopBar>
                <NewPost createFunc={addNewPost} />
            </TopBar>
            <BookContainer>
                <LeftArrow onClick={prevPage} disabled={currentPage === 0}>
                    {"<"}
                </LeftArrow>
                <PageHalf>
                    {posts.slice(startIndex, startIndex + postsPerPage / 2).map((p, i) => (
                        <PostPreview key={i + p.title} post={p} />
                    ))}
                </PageHalf>
                <PageHalf>
                    {posts.slice(startIndex + postsPerPage / 2, endIndex).map((p, i) => (
                        <PostPreview key={i + p.title} post={p} />
                    ))}
                </PageHalf>
                <RightArrow onClick={nextPage} disabled={currentPage === totalPages - 1}>
                    {">"}
                </RightArrow>
            </BookContainer>
        </Container>
    );
}
