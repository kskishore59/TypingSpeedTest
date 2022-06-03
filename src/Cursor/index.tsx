import React, { FC } from "react";
import { CursorDiv, CursorLine } from "../New/styles";

type Props = {
	index: number;
	char: string;
	currCharIndex: number;
};

const Cursor: FC<Props> = ({ index, char, currCharIndex }) => {
	return (
		<CursorDiv>
			<CursorLine />
		</CursorDiv>
	);
};

export default Cursor;
