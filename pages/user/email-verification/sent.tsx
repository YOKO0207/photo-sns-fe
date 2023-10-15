import { GuestLayout } from "@/components/layouts";
import { GuestCardWrapper } from "@/components/organisms";
import { FRONTEND_PATH } from "@/libs/routes";
import { NextPage } from "next";

const UserRegisterSentPage: NextPage = () => {
	return (
		<GuestLayout>
			<GuestCardWrapper
				title="本人確認メールを送信しました。"
				descriptions={[
					"登録したメールアドレスに本人確認用のメールを送信しました。",
					"そちらのメールに記載されているURLをクリックして、本人確認を完了させてください。",
					"※本人確認メールが届いていない場合は、下記のリンクから再送することができます。",
				]}
				footerLinks={[
					{
						href: FRONTEND_PATH.USER.EMAIL_VERIFICATION.RESEND,
						text: "本人確認メールを再送する",
					},
				]}
			/>
		</GuestLayout>
	);
};

export default UserRegisterSentPage;
