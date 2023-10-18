import { Box, MSpan, XSParagraph } from "@/components/atoms";
import { Alphabetavatar } from "@/components/molecules";
import { ListUser, sizeOptions } from "@/types"
import { FC } from "react"

interface Props {
	size: Exclude<sizeOptions, "xl">;
	textColor?: string;
}

const textSize = {
	xs: "10px",
	sm: "12px",
	md: "14px",
	lg: "16px",
}

export const UserName: FC<ListUser & Props> = (props) => {
	const { name, size, textColor } = props;
	return (
		<Box display="flex" alignItems="center" gap="4px">
			<Alphabetavatar name={name[0]} size={size} />
			<MSpan fontSize={textSize[size]} color={textColor || "gray.500"}>
				{name}
			</MSpan>
		</Box>
	);
}