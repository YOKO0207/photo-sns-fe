import { Box, LinkRouter, Typography } from "components/atoms";
import { FC, Fragment } from "react";
import { Icon } from "@iconify/react";
import { colors } from "@/styles";
import { FRONTEND_PATH } from "@/libs/routes";

interface ProfileMenuLinkProps {
	href: string;
	title: string;
	iconName: string;
}

interface Props {
	px?: string;
	py?: string;
}

export const ProfileMenuBar: FC<Props> = (props) => {
	const { px, py } = props;

	const profileMenuLink: ProfileMenuLinkProps[] = [
		{
			href: FRONTEND_PATH.USER.ACCOUNT.NAME,
			title: "プロフィール",
			iconName: "ph:user-bold",
		},
		{
			href: FRONTEND_PATH.USER.ACCOUNT.EMAIL.INDEX,
			title: "メールアドレス",
			iconName: "material-symbols:mail-outline-rounded",
		},
		{
			href: FRONTEND_PATH.USER.ACCOUNT.PASSWORD,
			title: "パスワード",
			iconName: "material-symbols:lock-outline",
		},
	];

	return (
		<Box
			// display="flex"
			// alignItems="center"
			// px={px}
			// py={py}
			// {...props}
			//flexDirection="row"
			//mb="8px"
			width="100%"
		>
			<Fragment>
				{profileMenuLink.map((item: ProfileMenuLinkProps) => (
					<Fragment key={item.title}>
						<LinkRouter
							//mr="20px"
							mb="16px"
							href={item.href}
							color="gray.900"
							display="block"
							px="12px"
							currentPathStyle={{
							color: "white",
							backgroundColor: colors.primary[500],
							//borderBottom: `3px solid ${colors.gray[900]}`,
							borderRadius: "4px",
							padding: "8px 12px",
							}}
						>
							<Box display="flex" alignItems="center" >
								{/* <Box display="flex" mr="10px" alignItems="center">
									<Icon
										icon={item.iconName}
										width={20}
										color="secondary.dark"
									/>
								</Box> */}
								<Typography className="sidebar-text-link">
									{item.title}
								</Typography>
							</Box>
						</LinkRouter>
					</Fragment>
				))}
			</Fragment>
		</Box>
	);
};

ProfileMenuBar.defaultProps = {
	px: "20px",
	py: "10px",
};
