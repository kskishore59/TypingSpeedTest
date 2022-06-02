import React, { FC } from "react";
import { InnerSpan } from "../New/styles";

type Props = {
	color: string;
	char: string;
};

const Letters: FC<Props> = ({ color, char }) => {
	return <InnerSpan color={color}>{char}</InnerSpan>;
};

export default Letters;
