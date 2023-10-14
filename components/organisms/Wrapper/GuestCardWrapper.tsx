import { Box, H3, LinkRouter, SParagraph } from "@/components/atoms";
import { Divibar } from "@/components/molecules";
import { FC } from "react";
import { shadows } from "@/styles";

interface LinkProps {
	href: string;
	text: string;
}

interface Props {
	title: string;
	descriptions: string[];
	footerLinks?: LinkProps[];
	divibarText?: string;
}

export const GuestCardWrapper: FC<Props> = (props) => {
	const { title, descriptions, footerLinks, divibarText } = props;

	return (
		<Box
			backgroundColor="gray.white"
			borderRadius="5px"
			py="50px"
			px="72px"
			width="100%"
			mx="auto"
			maxWidth="550px"
			style={{ boxShadow: shadows[20] }}
		>
			<Box mx="auto" textAlign="center">
				<Box mb="24px">
					<H3 textAlign="center" mb="20px" fontWeight={600}>
						{title}
					</H3>
					<Box textAlign="left" color="gray.500">
						{descriptions.map((item, index) => {
							return (
								<SParagraph color="gray.500" mb="4px" key={index}>
									{item}
								</SParagraph>
							);
						})}
					</Box>
				</Box>
				{footerLinks && (
					<>{divibarText ? <Divibar>{divibarText}</Divibar> : <Divibar />}</>
				)}
				{footerLinks?.map((item, index) => {
					return (
						<Box key={index} mb={1}>
							<LinkRouter href={item.href} fontSize="14px">
								{item.text}
							</LinkRouter>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};
