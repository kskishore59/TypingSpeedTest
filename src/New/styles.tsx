import styled, { keyframes } from "styled-components";

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 2%;
`;

export const CountDown = styled.h1`
	font-family: Sans-serif;
	font-weight: bold;
	color: grey;
`;

export const MainHeading = styled.h1`
	font-family: Sans-serif;
	font-weight: bold;
	font-size: 1.5rem;
`;

export const InputField = styled.input`
	width: 50%;
	padding: 0.5rem;
	margin-bottom: 1.5rem;
	z-index: -999;
	opacity: 0;
	position: absolute;
`;

export const StartButton = styled.button`
	width: 10rem;
	padding: 1rem;
	background-color: #008cba;
	font-family: Sans-serif;
	border-radius: 0.2em;
	border: 1px solid #ffffff;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: 500;

	&:hover {
		border: 1px solid black;
		border-radius: 0.2em;
		background-color: lightgreen;
	}
`;

export const WordsContainer = styled.div`
	padding: 2rem;
	font-size: 1rem;
	margin-top: 2rem;
	font-family: Comic Sans MS;
	flex-wrap: wrap;
	border: 1px solid grey;
	border-radius: 0.5rem;
	width: 80%;
`;

export const ResultContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 2rem;
`;

export const ResultTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 5rem;
`;

export const ResultHeading = styled.h1`
	font-family: Sans-serif;
	font-weight: bold;
	color: lightblue;
`;

export const ResultText = styled.p`
	font-family: Sans-serif;
	font-weight: bold;
	font-size: 1.5rem;
`;

const spanKeyFrames = keyframes`
50% {
	opacity: 1;
}
`;

interface Span {
	background: string;
	active: string;
}

export const InnerSpan = styled.span.attrs((props: { color: Span }) => props)`
	background-color: ${(props) => {
		return props.color?.background;
	}};
	font-family: Rockwell;
	font-size: 2rem;
	position: relative;

	animation: ${spanKeyFrames} 1s ease-in-out infinite;
`;

export const CursorDiv = styled.div`
	flex-direction: column;
`;

export const blink = keyframes`
	50%{
		opacity: 0
	}
`;

export const CursorLine = styled.hr`
	color: black;
	width: 0.01rem;
	height: 1.8rem;
	background-color: black;
	border: 0.08rem solid black;
	padding: 0px;
	margin: 0px;
	margin-top: 2px;
	animation: ${blink} 1s ease-in-out infinite;
`;

export const ContentDiv = styled.div`
	flex-wrap: wrap;
`;

export const ContentSpan = styled.div`
	flex-wrap: wrap;
`;

export const SubWordsContainer = styled.div`
	flex-wrap: wrap;
	display: flex;
`;
