import { colors } from "@/styles";
import { Icon } from "@iconify/react";
import { Box, LinkRouter, Typography } from "components/atoms";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import styled from "styled-components";

export const Sidebar = () => {
	const { pathname } = useRouter();

	return (
		<Box px="0px" pb="1.5rem" color="secondary.dark">
			<Fragment>
				{linkList.map((item: any) => (
					<Fragment key={item.title}>
						<Fragment>
							<Typography
								mt="1rem"
								py="0.5rem"
								color="gray.600"
								fontSize="12px"
							>
								{item.title}
							</Typography>
							{item?.list?.map((item: any) => (
								<Fragment key={item.title}>
									<ToggleItem
										item={item}
										pathName={pathname}
										hasChildList={item.hasChildList}
										isToggled={item.isToggled}
									/>
								</Fragment>
							))}
						</Fragment>
					</Fragment>
				))}
			</Fragment>
		</Box>
	);
};

interface ToggleItemProps {
	item: any;
	pathName: any;
	hasChildList?: boolean;
	isToggled?: boolean;
}

const ToggleItem = ({
	item,
	pathName,
	hasChildList,
	isToggled,
}: ToggleItemProps) => {
	const [toggle, setToggle] = useState(isToggled || false);

	return (
		<Fragment>
			<DashBoardNavLink
				item={item}
				pathName={pathName}
				hasChildList={hasChildList}
				onClick={() => setToggle((prev) => !prev)}
				toggle={toggle}
			/>
			{toggle && (
				<Fragment>
					{item?.childList?.map((subItem: any) => (
						<Fragment key={subItem.title}>
							<DashBoardNavLink item={subItem} pathName={pathName} />
						</Fragment>
					))}
				</Fragment>
			)}
		</Fragment>
	);
};

interface DashBoardNavLinkProps {
	item: any;
	pathName: any;
	hasChildList?: boolean;
	onClick?: () => void;
	toggle?: boolean;
}

const DashBoardNavLink = (props: DashBoardNavLinkProps) => {
	const { item, pathName, hasChildList, onClick, toggle } = props;

	return (
		<Fragment>
			{hasChildList ? (
				<StyledDashboardBox onClick={onClick}>
					<Box display="flex" alignItems="center">
						<Box
							display="flex"
							mr="10px"
							alignItems="center"
							justifyContent="center"
						>
							<Icon icon={item.iconName} width={20} />
						</Box>
						<Typography fontSize="16px" className="sidebar-text-link">
							{item.title}
						</Typography>

						<Box
							display="flex"
							ml="auto"
							alignItems="center"
							justifyContent="center"
						>
							{toggle ? (
								<Icon
									icon={"material-symbols:keyboard-arrow-up-rounded"}
									width={18}
								/>
							) : (
								<Icon
									icon={"material-symbols:keyboard-arrow-down-rounded"}
									width={18}
								/>
							)}
						</Box>
					</Box>
				</StyledDashboardBox>
			) : (
				<LinkRouter
					href={item.href}
					//isCurrentPath={pathName === item.href ? true : false}
				>
					<Box display="flex" alignItems="center" my={1}>
						<Box
							display="flex"
							mr="10px"
							alignItems="center"
							justifyContent="center"
						>
							<Icon icon={item.iconName} width={20} />
						</Box>
						<Typography fontSize="16px" className="sidebar-text-link">
							{item.title}
						</Typography>
					</Box>
				</LinkRouter>
			)}
		</Fragment>
	);
};

export const StyledDashboardBox = styled(Box)<{ isCurrentPath?: boolean }>`
	padding: 10px 15px;
	border-radius: 5px;
	align-items: center;
	cursor: pointer;
	.sidebar-text-link {
		color: ${({ isCurrentPath }) =>
			isCurrentPath ? colors.gray[100] : colors.gray[100]};
	}
`;

// export const StyledDashboardNav = styled(NavLink)<{ isCurrentPath?: boolean }>`
//   display: block;
//   padding: 10px 15px;
//   border-radius: 5px;
//   align-items: center;
//   color: ${({ isCurrentPath }) =>
//     isCurrentPath
//       ? getTheme("colors.primary.text")
//       : getTheme("colors.secondary.main")};
//   background-color: ${({ isCurrentPath }) =>
//     isCurrentPath ? getTheme("colors.primary.main") : "transparent"};

//   .sidebar-text-link {
//     color: ${({ isCurrentPath }) =>
//       isCurrentPath
//         ? getTheme("colors.primary.text")
//         : getTheme("colors.secondary.main")};
//   }
// `;

export const StyledDashboardPageTitle = styled(Box)``;

const linkList: any[] = [
	{
		title: "",
		list: [
			{
				href: "/",
				title: "ホーム",
				iconName: "majesticons:home-line",
			},
		],
	},
	{
		title: "メインメニュー",

		list: [
			{
				href: "#",
				title: "ユーザー",
				iconName: "ph:user-bold",
				hasChildList: true,
				isToggled: true,
				childList: [
					{
						href: "/",
						title: "カテゴリ設定",
						iconName: "ci:dot-01-xs",
					},
				],
			},
		],
	},
];
