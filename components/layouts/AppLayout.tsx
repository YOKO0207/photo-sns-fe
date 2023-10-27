import { Box } from "@/components/atoms";
import { Breadcrumb, Header } from "@/components/organisms";
import { sizeOptions } from "@/types";
import { Fragment } from "react";

interface Props {
	children: React.ReactNode;
	size?: Exclude<sizeOptions, "xs" | "sm" | "xl">;
}

const widthSize = {
	"md": "68%",
	"lg": "88%"
}

export const AppLayout: React.FC<Props> = (props) => {
	const { children, size = "md" } = props;

	return (
		<Fragment>
			<Header />
			<Box
				width={{ _: "95%", md: widthSize[size]}}
				margin="32px auto"
				as="main"
				minHeight="80vh"
			>
				{children}
			</Box>
		</Fragment>
	);
};
