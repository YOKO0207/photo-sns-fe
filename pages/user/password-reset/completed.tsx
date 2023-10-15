import { GuestLayout } from "@/components/layouts";
import { GuestCardWrapper } from "@/components/organisms";
import { FRONTEND_PATH } from "@/libs/routes";
import { NextPage } from "next";

const UserPasswordResetCompletedPage: NextPage = () => {
	return (
		<GuestLayout>
			<GuestCardWrapper
				title="パスワードの再設定が完了しました。"
				descriptions={["下記のリンクからログインしてください。"]}
				footerLinks={[{ href: FRONTEND_PATH.USER.LOGIN, text: "ログイン" }]}
			/>
		</GuestLayout>
	);
};

export default UserPasswordResetCompletedPage;
