import React, { useRef, useState } from "react";
import { paragraphs } from "../Paragraphs";
import {
	CountDown,
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

export const TypingTest = () => {
	const countDown = 60;
	const [status, setStatus] = useState<String>("waiting");
	const textInput = useRef<HTMLInputElement>(null);
	const para = useRef();
	let ranIndex = Math.floor(Math.random() * paragraphs.length);
	const [timer, setTimer] = useState<number>(countDown);
	const words = paragraphs[ranIndex].split("");

	let charIndex = 0;
	let typingText = document.querySelector(".typing-text");

	console.log(words);

	window.onkeydown = (ev: KeyboardEvent): any => {
		//do something
		if (status === "started") {
			textInput.current?.focus();
		}
	};

	const start = () => {
		setStatus("started");
		textInput.current?.focus();
		// let interval = setInterval(() => {
		// 	setTimer((prev): number => {
		// 		if (prev === 0) {
		// 			clearInterval(interval);
		// 			setStatus("finished");
		// 			return countDown;
		// 		} else {
		// 			return prev - 1;
		// 		}
		// 	});
		// }, 1000);
	};

	const handleOnChange = (event: any) => {
		let characters = typingText?.querySelectorAll("span");
		let typedChar = event.target.value.split("")[charIndex];
		console.log(typedChar);
		if (characters !== undefined) {
			if (characters[charIndex] === typedChar) {
				console.log("correct");
			} else {
				console.log("incorrect");
			}
		}

		charIndex++;
	};
	return (
		<MainContainer>
			<MainHeading>Typing Speed Test</MainHeading>
			<div>
				<CountDown>{timer}</CountDown>
			</div>
			<div>
				<InputField
					disabled={status !== "started"}
					ref={textInput}
					onChange={handleOnChange}
				></InputField>
			</div>
			{status !== "started" && (
				<div>
					<StartButton onClick={start}>Start</StartButton>
				</div>
			)}

			{status === "started" && (
				<WordsContainer className="typing-text">
					{words.map((each, i) => (
						<span key={i}>{each}</span>
					))}
				</WordsContainer>
			)}
			{/* {status === "finished" && (
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
			)} */}
		</MainContainer>
	);
};
