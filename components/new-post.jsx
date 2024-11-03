import { Button, FormHelperText, TextField, Paper } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useState } from "react";
import styled from "styled-components";

// Styled components for the form layout and bubbles
const FormContainer = styled(Paper)`
    width: 100%;
    background-color: rgba(26, 26, 26, 0.9); /* Semi-transparent dark */
    padding: 20px;
    margin: 0;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const PromptContainer = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px;
    background-color: #333;
    border: 1px solid white;
    border-radius: 50px;
    margin-bottom: 20px;
`;

const PromptText = styled(FormHelperText)`
    color: white;
    font-size: 1.1rem;
    margin: 0;
    text-align: center;
`;

const InputWrapper = styled(Paper)`
    background-color: #333; /* Dark background for input bubbles */
    border-radius: 10px;
    padding: 10px;
    width: 95%; /* Wider input wrapper */
    margin-bottom: 15px;
    box-shadow: none;
`;

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        color: white; /* Text color */
    }
    & .MuiFilledInput-root {
        background-color: #222; /* Darker background for input fields */
        border-radius: 8px;
        padding: 5px 10px;
    }
    & .MuiInputLabel-root {
        color: #bbb; /* Lighter label color */
    }
    & .MuiInputLabel-root.Mui-focused {
        color: #fff; /* Label color on focus */
    }
    & .MuiFilledInput-underline:before,
    & .MuiFilledInput-underline:after {
        display: none;
    }
`;

const ExpandingTextarea = styled(Textarea)`
    width: 100%;
    color: white;
    background-color: #222;
    border-radius: 8px;
    padding: 10px;
    min-height: 80px;
    resize: vertical;
    font-size: 1rem;
    transition: height 0.3s ease;
`;

const CreateButton = styled(Button)`
    width: 120px;
    font-weight: bold;
    color: white;
    background-color: #4b0082;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        background-color: #6a0dad;
        transform: scale(1.08); /* Enhanced scale-up effect on hover */
        box-shadow: 0 6px 15px rgba(106, 13, 173, 0.4); /* Shadow on hover */
    }
`;

export default function NewPost({ createFunc }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function submitNewPost() {
        if (await createFunc(title, content)) {
            setTitle("");
            setContent("");
        }
    }

    return (
        <FormContainer
            elevation={3}
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                submitNewPost();
            }}
        >
            <PromptContainer>
                <PromptText>What's on your mind?</PromptText>
            </PromptContainer>
            <InputWrapper>
                <StyledTextField
                    variant="filled"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                <ExpandingTextarea
                    variant="soft"
                    placeholder="Content"
                    minRows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </InputWrapper>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <CreateButton
                    variant="contained"
                    type="submit"
                    disabled={title.length === 0 || content.length === 0}
                >
                    Create
                </CreateButton>
            </div>
        </FormContainer>
    );
}
