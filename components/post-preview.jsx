import { styled } from 'styled-components';

const MyDiv = styled.div`
    padding-bottom: 20px;
`
const MyH4 = styled.h4`
    text-align: center;
    padding-bottom: 5px;
`

export default function PostPreview({ post }) {

    return (
        <MyDiv className="bg-sky-400 rounded-lg p-4 m-2 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
            <MyH4 className="font-bold text-2xl mb-2">{post.title}</MyH4>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
        </MyDiv>
    );
}
