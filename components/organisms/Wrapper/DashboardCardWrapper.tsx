import { Box, H3, SParagraph } from "@/components/atoms";
import { shadows } from "@/styles";
import { FC } from "react";

interface Props {
	title: string;
	descriptions: string[];
	maxWidth?: string | number;
}

export const DashboardCardWrapper: FC<Props> = (props) => {
	const { title, descriptions, maxWidth } = props;

	return (
		<Box
			backgroundColor="gray.white"
			borderRadius="5px"
			py="50px"
			px="40px"
			style={{ boxShadow: shadows[20] }}
			maxWidth={maxWidth}
		>
			<H3 mb="20px" fontWeight={600}>
				{title}
			</H3>
			<Box textAlign="left" color="gray.500">
				<Box>
					{descriptions.map((item, index) => {
						return (
							<SParagraph
								color="gray.500"
								mb={index === descriptions.length - 1 ? "0px" : "4px"}
								key={index}
							>
								{item}
							</SParagraph>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};
