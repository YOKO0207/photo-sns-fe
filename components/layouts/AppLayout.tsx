import { Box } from "@/components/atoms";
import { Breadcrumb, Header } from "@/components/organisms";
import { Fragment } from "react";

interface Props {
	children: React.ReactNode;
	breadcrumbList?: any;
}

export const AppLayout: React.FC<Props> = (props) => {
	const { children, breadcrumbList } = props;

	return (
		<Fragment>
			<Header />
			<Box my="24px" mx="40px" as="main">
				<Breadcrumb breadcrumbList={breadcrumbList} mb="20px" />
				{children}
			</Box>
		</Fragment>
	);
};
