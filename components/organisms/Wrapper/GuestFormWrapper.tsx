import { Box, H3, LinkRouter, SParagraph } from "@/components/atoms";
import { Divibar, ModalLoading } from "@/components/molecules";
import { FC, ReactNode } from "react";
import { shadows } from "@/styles";

interface LinkProps {
	href: string;
	text: string;
}
interface Props {
	title: string;
	descriptions?: string[];
	children: ReactNode;
	footerLinks?: LinkProps[];
	divibarText?: string;
	isFormLoading: boolean;
}

export const GuestFormWrapper: FC<Props> = (props) => {
	const {
		title,
		descriptions,
		children,
		footerLinks,
		divibarText,
		isFormLoading,
	} = props;

	return (
		<>
			<Box
				backgroundColor="gray.white"
				borderRadius="5px"
				py="50px"
				px="72px"
				width="100%"
				mx="auto"
				maxWidth="550px"
				//style={{ boxShadow: shadows[20] }}
				border="2px solid"
				borderColor="gray.150"
			>
				<Box mx="auto" textAlign="center">
					<Box mb="20px">
						<H3 textAlign="center" mb="20px" fontWeight={600} >
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
					{footerLinks && (
						<>{divibarText ? <Divibar>{divibarText}</Divibar> : <Divibar />}</>
					)}
					{footerLinks?.map((item, index) => {
						return (
							<Box mb={1} key={index}>
								<LinkRouter href={item.href} fontSize="14px">
									{item.text}
								</LinkRouter>
							</Box>
						);
					})}
				</Box>
			</Box>
		</>
	);
};
