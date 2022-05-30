import { useEffect, useState, useRef } from "react";
//@ts-ignore
import randomWords from "random-words";
//import * as randomWords from  "random-words";
import {
	CountDown,
	InnerSpan,
	InputField,
	MainContainer,
	MainHeading,
	ResultContainer,
	ResultHeading,
	ResultText,
	ResultTextContainer,
	StartButton,
	WordsContainer,
} from "./styles";

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
		}
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
			setCurrCharIndex(currCharIndex - 1);
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
				return "green";
			} else {
				return "red";
			}
		} else if (
			wordIdx === currWordIndex &&
			currCharIndex >= words[currWordIndex].length
		) {
			return "red";
		} else {
			return;
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
			{status !== "started" && (
				<div>
					<StartButton onClick={start}>Start</StartButton>
				</div>
			)}

			{status === "started" && (
				<WordsContainer>
					<div>
						{words.map((word, i) => (
							<span key={i}>
								<span>
									{word.split("").map((char, idx) => (
										<>
											<InnerSpan color={getCharClass(i, idx, char)}>
												{char}
											</InnerSpan>
										</>
									))}
								</span>
								<span> </span>
							</span>
						))}
					</div>
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
								{Math.round((correct / (correct + incorrect)) * 100)} %{" "}
							</ResultText>
						</div>
					</ResultTextContainer>
				</ResultContainer>
			)}
		</MainContainer>
	);
}

export default TypingSpeed;