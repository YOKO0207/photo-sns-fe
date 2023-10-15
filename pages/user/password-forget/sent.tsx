import { GuestLayout } from "@/components/layouts";
import { GuestCardWrapper } from "@/components/organisms";
import { FRONTEND_PATH } from "@/libs/routes";
import { NextPage } from "next";

const UserPasswordForgetSentPage: NextPage = () => {
	return (
		<GuestLayout>
			<GuestCardWrapper
				title="パスワード再設定メールを送信しました。"
				descriptions={[
					"登録したメールアドレスにパスワード再設定用のメールを送信しました。",
					"そちらのメールに記載されているURLをクリックして、パスワード再設定を完了してください。",
				]}
				divibarText="または"
				footerLinks={[
					{
						href: FRONTEND_PATH.USER.LOGIN,
						text: "ログインはこちら",
					},
				]}
			/>
		</GuestLayout>
	);
};

export default UserPasswordForgetSentPage;
