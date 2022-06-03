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
const seconds = 60;

function TypingSpeed() {
	const [words, setWords] = useState<String[]>([]);
	const [countDown, setCountDown] = useState<number>(seconds);
	const [currInput, setCurrInput] = useState("");
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [incorrect, setIncorrect] = useState(0);
	const [status, setStatus] = useState("waiting");
	const [currChar, setCurrChar] = useState("");
	const [currCharIndex, setCurrCharIndex] = useState(-1);
	const [intervalId, setIntervalId] = useState<any>();
	const textInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setWords(generateWords());
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
		}
		if (status !== "started") {
			setStatus("started");
			let interval = setInterval(() => {
				setCountDown((prev): number => {
					if (prev === 0) {
						clearInterval(interval);
						setStatus("finished");
						setCurrInput("");

						return seconds;
					} else {
						return prev - 1;
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
		if (keyCode === 32) {
			checkMatch();
			setCurrInput("");
			setCurrWordIndex(currWordIndex + 1);
			setCurrCharIndex(-1);
		} else if (keyCode === 8) {
			if (currCharIndex > 0) {
				setCurrCharIndex(currCharIndex - 1);
			} else if (currCharIndex <= 0) {
				setCurrCharIndex(words[currWordIndex - 1].length - 1);
				setCurrWordIndex(currWordIndex - 1);
			}
			setCurrChar("");
		} else {
			setCurrCharIndex(currCharIndex + 1);
			setCurrChar(key);
		}
	};

	const getCharClass = (wordIdx: any, charIdx: any, char: any): any => {
		if (
			wordIdx === currWordIndex &&
			charIdx === currCharIndex &&
			currChar &&
			status !== "finished  "
		) {
			if (char === currChar) {
				return { background: "#50ba6c", active: "true" };
			} else {
				return { background: "red", active: "true" };
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
					onKeyDown={handleKeyDown}
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
								{word.split("").map((char, idx) => (
									<>
										<InnerSpan color={getCharClass(i, idx, char)}>
											{char}
										</InnerSpan>
										{/* {if(currWordIndex === i && currCharIndex === idx){
											return (<Cursor />);
										}} */}
										{currWordIndex === i && currCharIndex === idx ? (
											<CursorLine />
										) : (
											""
										)}
									</>
								))}
								<span>{`[space]`}</span>
							</ContentSpan>
						))}
					</SubWordsContainer>
				</WordsContainer>
			)}
			{status === "finished" && (
				<ResultContainer>
					<ResultTextContainer>
						<ResultHeading>Words Per Minute</ResultHeading>
						<ResultText>{correct}</ResultText>
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
