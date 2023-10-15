import { Box, Spinner } from "@/components/atoms";
import { GuestLayout } from "@/components/layouts";
import { DashboardCardWrapper } from "@/components/organisms";
import { useUserEmailVerifyHandler } from "@/hooks";
import { NextPage } from "next";

const UserEmailUpdateEmailVerificationCompletedPage: NextPage = () => {
	const { verifyState } = useUserEmailVerifyHandler();

	return (
		<GuestLayout>
			{verifyState === "verifying" && (
				<Box textAlign="center">
					<p>本人確認中</p>
					<Box color="primary.500">
						<Spinner size={40} />
					</Box>
				</Box>
			)}
			{verifyState === "verify-success" && (
				<DashboardCardWrapper
					title="変更したメールアドレスの本人確認が完了しました。"
					descriptions={["引き続きシステムをご利用ください。"]}
					maxWidth="600px"
				/>
			)}
			{verifyState === "verify-failed" && (
				<DashboardCardWrapper
					title="本人確認に失敗しました。"
					descriptions={[
						"本人確認が完了しているか、URLが誤っている可能性があります。",
						"URLをご確認の上、再度お試しください。",
					]}
					maxWidth="600px"
				/>
			)}
		</GuestLayout>
	);
};

export default UserEmailUpdateEmailVerificationCompletedPage;
