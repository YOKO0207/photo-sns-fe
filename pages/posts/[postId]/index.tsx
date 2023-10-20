import { Box, H1, MParagraph } from "@/components/atoms";
import { AppLayout } from "@/components/layouts";
import { PostCard, UserName } from "@/components/organisms";
import { usePostDetailSWR } from "@/hooks";
import { NextPage } from "next";

const PostDetailPage: NextPage = () => {
	const { data, isLoading } = usePostDetailSWR();
	const post = data?.data?.data;
	return (
		<AppLayout>
			{post && (
				<Box
					width="80%"
					m="0 auto"
					display="flex"
					gap="24px"
					shadow="40"
					borderRadius="8px"
					p="16px"
				>
						<Box>
							<PostCard {...post} />
						</Box>
					<Box py="24px" px="16px" width="100%">
						{post.post_name && (
							<H1 color="gray.900" fontWeight={600} mb="24px">
								{post.post_name}
							</H1>
						)}
						{post.post_content && (
							<MParagraph mb="24px">
								{post.post_content}
							</MParagraph>
						)}
						<Box width="100%" textAlign="right" ><UserName id={post.id} name={post.user?.name} size="md" /></Box>
						
					</Box>
				</Box>
			)}
		</AppLayout>
	);
}

export default PostDetailPage;