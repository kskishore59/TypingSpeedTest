import { useEffect, useState, useRef } from "react";
//@ts-ignore
import randomWords from "random-words";
//import * as randomWords from  "random-words";
import {
	ContentSpan,
	CountDown,
	CursorLine,
	InnerSpan,
	InputField,
	MainContainer,
	MainHeading,
	ResultContainer,
	ResultHeading,
	ResultText,
	ResultTextContainer,
	StartButton,
	SubWordsContainer,
	WordsContainer,
} from "./styles";
import Cursor from "../Cursor";

const number_of_words = 200;
const seconds = 0;

interface Color {
	color: string;
}

function TypingSpeed() {
	const [words, setWords] = useState<String[]>([]);
	const [countDown, setCountDown] = useState<number>(0);
	const [currInput, setCurrInput] = useState("");
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [incorrect, setIncorrect] = useState(0);
	const [status, setStatus] = useState("waiting");
	const [currChar, setCurrChar] = useState("");
	const [currCharIndex, setCurrCharIndex] = useState(-1);
	const [intervalId, setIntervalId] = useState<any>();
	const [prevCode, setPrevCode] = useState<any>();
	const [correctWords, setCorrectWords] = useState<number>(0);
	const [color, setColor] = useState<Color[]>([]);
	const [key, setKey] = useState<number>(0);
	const textInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const generatedWords = generateWords();
		const newWords = generatedWords.map((each) => each);
		console.log(newWords);
		setWords(newWords);
	}, []);

	useEffect(() => {
		if (status === "started") {
			textInput.current?.focus();
		}
	}, [status]);

	function generateWords() {
		return new Array(number_of_words).fill(null).map(() => randomWords());
	}

	const start = () => {
		if (status === "finished") {
			setWords(generateWords());
			setCurrWordIndex(0);
			setCorrect(0);
			setIncorrect(0);
			setCurrCharIndex(-1);
			setCurrChar("");
			setCorrectWords(0);
		}
		if (status !== "started" && countDown <= 20) {
			setStatus("started");
			let interval = setInterval(() => {
				setCountDown((prev): number => {
					if (prev === 20) {
						clearInterval(interval);
						setStatus("finished");
						setCurrInput("");
						return seconds;
					} else {
						return prev + 1;
					}
				});
			}, 1000);
			setIntervalId(interval);
		}
	};

	const stop = () => {
		clearInterval(intervalId);
		setStatus("finished");
		setCurrInput("");
		setCountDown(seconds);
		setCorrectWords(0);
	};

	const checkMatch = () => {
		const wordsCompare = words[currWordIndex];
		const doesItMatch = wordsCompare === currInput.trim();
		if (doesItMatch) {
			setCorrect(correct + 1);
		} else {
			setIncorrect(incorrect + 1);
		}
	};

	const handleKeyDown = ({ keyCode, key }: any) => {
		if (keyCode === 32 && currCharIndex === words[currWordIndex].length - 1) {
			setCurrInput("");
			if (prevCode !== 32) {
				setCurrWordIndex(currWordIndex + 1);
				setKey(32);
			}
			setCorrectWords(correctWords + 1);
			setCurrCharIndex(-1);
		} else if (key === words[currWordIndex][currCharIndex + 1]) {
			setCurrCharIndex(currCharIndex + 1);
			setCurrChar(key);
			setKey(keyCode);
		}

		setPrevCode(keyCode);
	};

	const getCharClass = (wordIdx: any, charIdx: any, char: any): any => {
		if (
			wordIdx === currWordIndex &&
			charIdx === currCharIndex &&
			currChar &&
			status !== "finished  "
		) {
			if (char === currChar) {
				//const newColor = {words[wordIdx][charIdx]: true}
				//setColor((prev) => [...prev]);3
				return { background: "#50ba6c", active: "true", color: "grey" };
			} else {
				return { background: "red" };
			}
		} else if (
			wordIdx === currWordIndex &&
			currCharIndex >= words[currWordIndex].length
		) {
			return "red";
		} else {
			return "";
		}
	};

	return (
		<MainContainer>
			<MainHeading>Typing Speed Test</MainHeading>
			<div>
				<CountDown>{countDown}</CountDown>
			</div>
			<div>
				<InputField
					disabled={status !== "started"}
					ref={textInput}
					type="text"
					onKeyDown={(event) => {
						if (event.key === "Backspace") {
							event.preventDefault();
							event.stopPropagation();
						} else if (
							event.key !== words[currWordIndex][currCharIndex + 1] &&
							event.key !== " "
						) {
							event.preventDefault();
							event.stopPropagation();
							setIncorrect(incorrect + 1);
						} else {
							handleKeyDown(event);
							setCorrect(correct + 1);
						}
					}}
					value={currInput}
					onChange={(e) => setCurrInput(e.target.value)}
				></InputField>
			</div>
			{status !== "started" ? (
				<div>
					<StartButton onClick={start}>Start</StartButton>
				</div>
			) : (
				<div>
					<StartButton onClick={stop}>Stop</StartButton>
				</div>
			)}

			{status === "started" && (
				<WordsContainer>
					<SubWordsContainer>
						{words.map((word, i) => (
							<ContentSpan key={i}>
								{word.split("").map((char, idx) => {
									//console.log(char);
									return (
										<>
											{/* {currChar === words[currWordIndex][currCharIndex] ? (
												<CursorLine />
											) : (
												""
											)} */}
											{key === 32 &&
											currCharIndex === idx - 1 &&
											currWordIndex === i ? (
												<CursorLine />
											) : (
												""
											)}

											<InnerSpan color={getCharClass(i, idx, char)}>
												{char}
											</InnerSpan>

											{/* {if(currWordIndex === i && currCharIndex === idx){
												return (<Cursor />);
											}} */}
											{currWordIndex === i &&
											currCharIndex === idx &&
											key !== 32 ? (
												<CursorLine />
											) : (
												""
											)}
										</>
									);
								})}
								<span>_</span>
							</ContentSpan>
						))}
					</SubWordsContainer>
				</WordsContainer>
			)}
			{status === "finished" && (
				<ResultContainer>
					<ResultTextContainer>
						<ResultHeading>Words Per Minute</ResultHeading>
						<ResultText>{correctWords}</ResultText>
					</ResultTextContainer>
					<ResultTextContainer>
						<div>
							<ResultHeading>Accuracy %</ResultHeading>
						</div>
						<div>
							<ResultText>
								{correct !== 0
									? Math.round((correct / (correct + incorrect)) * 100)
									: 0}{" "}
								%{" "}
							</ResultText>
						</div>
					</ResultTextContainer>
				</ResultContainer>
			)}
		</MainContainer>
	);
}

export default TypingSpeed;
