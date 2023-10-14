import { Box, H1, H3, LinkRouter } from "@/components/atoms";
import { SYSTEM_MESSAGES } from "@/libs/constants";
import { FRONTEND_PATH } from "@/libs/routes";
import { colors } from "@/styles";
import { Icon } from "@iconify/react";
import { FC, ReactNode } from "react";

interface Props {
	errorCode?: number;
	errorMessage?: string;
	children?: ReactNode;
}

export const ErrorCard: FC<Props> = (props) => {
	const { errorCode, errorMessage = SYSTEM_MESSAGES.FAILURE, children } = props;
	return (
		<Box textAlign="center" mt="100px">
			<Icon
				icon="akar-icons:face-sad"
				width={160}
				color={colors.tertiary[500]}
			/>
			{errorCode && (
				<H1 fontSize="64px" color="tertiary.500">
					{errorCode}
				</H1>
			)}
			{errorMessage && <H3 my="24px">{errorMessage}</H3>}
			{children && children}
			<LinkRouter fontSize="16px" href={FRONTEND_PATH.HOME}>
				トップページへ
			</LinkRouter>
		</Box>
	);
};
