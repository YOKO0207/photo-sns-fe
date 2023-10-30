import { AppLayout } from "@/components/layouts";
import { NextPage } from "next";
import { useUserContext } from "@/states/contexts";
import { useMe, usePostIndexSWR } from "@/hooks";
import { Image, Box } from "@/components/atoms";
import { Posts } from "@/types";
import { PostIndexCard } from "@/components/organisms";
import styled from "styled-components";
import { deviceSize } from "@/styles";

const IndexPage: NextPage = () => {
	const { data: posts, isLoading } = usePostIndexSWR();
	return (
		<AppLayout size="lg">
			<StyledBox>
				{posts?.data?.data?.map((item: Posts, index: number) => (
					<Box key={item.id} style={{ breakInside: "avoid" }}>
						<PostIndexCard {...item} key={item.id} />
					</Box>
				))}
			</StyledBox>
		</AppLayout>
	);
};

export default IndexPage;

const StyledBox = styled(Box)`
	column-count: 2;
	@media only screen and (min-width: ${deviceSize.sm}px) {
		column-count: 3;
	}
	@media only screen and (min-width: ${deviceSize.md}px) {
		column-count: 4;
	}
	@media only screen and (min-width: ${deviceSize.lg}px) {
		column-count: 5;
	}
`;
