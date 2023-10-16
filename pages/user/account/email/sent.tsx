import { AppLayout } from "@/components/layouts";
import { ProfileMenuBar, DashboardCardWrapper } from "@/components/organisms";
import { checkAuthMiddleware } from "@/libs/middleware";
import { FRONTEND_PATH } from "@/libs/routes";
import { NextPage } from "next";

const UserEmailUpdateSentPage: NextPage = () => {
	return (
		<AppLayout breadcrumbList={breadcrumbList}>
			<ProfileMenuBar />
			<DashboardCardWrapper
				title="本人確認メールを送信しました。"
				descriptions={[
					"変更したメールアドレスに本人確認用のメールを送信しました。",
					"そちらのメールに記載されているURLをクリックして、本人確認を完了させてください。",
					"尚、本人確認が完了するまでは、変更したメールアドレスは利用できません。",
					"※本人確認メールが届いていない場合は、もう一度メールアドレス変更ページから変更を行ってください。",
				]}
				maxWidth="600px"
			/>
		</AppLayout>
	);
};

export default UserEmailUpdateSentPage;

export async function getServerSideProps(context: any) {
	return await checkAuthMiddleware(context, "user");
}

/**Breadcumd */
const breadcrumbList = [
	{ url: "/", description: "ホーム" },
	{
		url: FRONTEND_PATH.USER.ACCOUNT.EMAIL.INDEX,
		description: `メールアドレス編集`,
	},
	{
		url: "",
		description: `本人確認送信完了`,
	},
];
