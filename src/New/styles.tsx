import styled from "styled-components";

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
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
`;

export const StartButton = styled.button`
	width: 30%;
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
	}
`;

export const WordsContainer = styled.div`
	width: 80%;
	padding: 2rem;
	background-color: #e7e7e7;
	font-size: 1rem;
	font-family: Sans-serif;
	margin-top: 2rem;
	text: center;
	margin-left: 5rem;
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

export const InnerSpan = styled.span.attrs((props: { color: string }) => props)`
	background-color: ${(props) => {
		return props.color;
	}};
`;
