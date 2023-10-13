import { Box, H3, LinkRouter } from "@/components/atoms";
import { FRONTEND_PATH } from "@/libs/routes";
import { shadows } from "@/styles";

const Error401Page = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			minHeight="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				backgroundColor="gray.white"
				borderRadius="5px"
				py="50px"
				width="100%"
				mx="auto"
				maxWidth="550px"
				style={{ boxShadow: shadows[20] }}
			>
				<Box mx="auto" maxWidth="375px" textAlign="center">
					<Box mb="24px">
						<H3 textAlign="center" mb="20px" fontWeight={600}>
							ログインが必要です。
						</H3>
						<Box textAlign="center" color="gray.500">
							<Box mb="16px">
								<Box mb="24px">
									<LinkRouter href={FRONTEND_PATH.USER.LOGIN} fontSize="14px">
										こちらからログインしてください。
									</LinkRouter>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Error401Page;
