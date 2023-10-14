import { Box, H3, SParagraph } from "@/components/atoms";
import { ModalLoading } from "@/components/molecules";
import { shadows } from "@/styles";
import { FC, ReactNode } from "react";

interface Props {
	title: string;
	descriptions?: string[];
	children: ReactNode;
	isFormLoading: boolean;
	maxWidth?: string | number;
}

export const DashboardFormWrapper: FC<Props> = (props) => {
	const { title, descriptions, children, maxWidth, isFormLoading } = props;

	return (
		<>
			<Box
				backgroundColor="gray.white"
				borderRadius="5px"
				py="50px"
				px="40px"
				style={{ boxShadow: shadows[20] }}
				maxWidth={maxWidth}
			>
				<Box>
					<Box textAlign="left">
						<H3 mb="20px" fontWeight={600}>
							{title}
						</H3>
						{descriptions?.map((item, index) => {
							return (
								<SParagraph color="gray.500" key={index}>
									{item}
								</SParagraph>
							);
						})}
					</Box>
					{children}
				</Box>
			</Box>
		</>
	);
};
