import { Box, Spinner } from "@/components/atoms";
import { GuestLayout } from "@/components/layouts";
import { GuestCardWrapper } from "@/components/organisms";
import { useUserEmailVerifyHandler } from "@/hooks";
import { FRONTEND_PATH } from "@/libs/routes";
import { NextPage } from "next";

const UserEmailVerificationPage: NextPage = () => {
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
				<GuestCardWrapper
					title="本人確認が完了しました"
					descriptions={["下記リンクからログインしてください。"]}
					footerLinks={[
						{ href: FRONTEND_PATH.USER.LOGIN, text: "ログインはこちら" },
					]}
				/>
			)}
			{verifyState === "verify-failed" && (
				<GuestCardWrapper
					title="本人確認に失敗しました。"
					descriptions={[
						"本人確認が完了しているか、URLが誤っている可能性があります。",
						"URLをご確認の上、再度お試しください。",
					]}
					footerLinks={[
						{
							href: FRONTEND_PATH.USER.EMAIL_VERIFICATION.RESEND,
							text: "本人確認メールを再送する",
						},
						{ href: FRONTEND_PATH.USER.LOGIN, text: "ログイン画面へ行く" },
					]}
					divibarText="または"
				/>
			)}
		</GuestLayout>
	);
};

export default UserEmailVerificationPage;
