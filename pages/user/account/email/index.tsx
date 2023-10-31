import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { AppLayout } from "@/components/layouts";
import { DashboardFormWrapper, ProfileMenuBar } from "@/components/organisms";
import { useMe, useUserUpdateEmailHandler } from "@/hooks";
import { checkAuthMiddleware } from "@/libs/middleware";
import { userEmailUpdateInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { UserEmailUpdateInput } from "@/types";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const UserAccountEmailPage: NextPage = () => {
	const { handleUserUpdateEmail, isFormLoading } = useUserUpdateEmailHandler();

	const handleFormSubmit = async (input: UserEmailUpdateInput) => {
		const validationErrors = await handleUserUpdateEmail({ input });
		return validationErrors;
	};

	const { user } = useMe();

	const initialValues = {
		email: user?.data?.data?.email || "",
		password: "",
	};

	return (
		<AppLayout>
			<Box display="flex" gap="40px" my="54px">
				<Box width="23%"><ProfileMenuBar /></Box>
				<Box width="77%">
					<DashboardFormWrapper
						title="メールアドレス変更ページ"
						descriptions={[
							"フォーム送信後、本人確認メールを送信します。",
							"そちらのメールに記載されているURLをクリックして、メールアドレス変更の手続きを完了してください。",
						]}
						isFormLoading={isFormLoading}
					>
						<Formik
							initialValues={initialValues}
							enableReinitialize={true}
							onSubmit={async (input, { setErrors }) => {
								const validationErrors = await handleFormSubmit(input);
								if (validationErrors) {
									setErrors(validationErrors);
								}
							}}
							validationSchema={userEmailUpdateInputSchema}
						>
							{({
								values,
								errors,
								touched,
								handleBlur,
								handleChange,
								handleSubmit,
								isValid,
								dirty,
							}) => {
								return (
									<form onSubmit={handleSubmit}>
										<Box mt="20px">
											<Box mb="24px">
												<TextField
													label="メールアドレス"
													type="email"
													name="email"
													fullwidth
													mb="16px"
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.email}
													errorText={
														touched["email"] && errors["email"]
															? errors["email"]
															: ""
													}
												/>
												<TextField
													label="現在のパスワード"
													type="password"
													name="password"
													fullwidth
													mb="16px"
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.password}
													errorText={
														touched["password"] && errors["password"]
															? errors["password"]
															: ""
													}
												/>
											</Box>
											<Button
												mb="24px"
												variant="contained"
												color="primary"
												type="submit"
												
												size="md"
												width="300px"
												disabled={
													!isValid ||
													isEmptyObject(R.pickBy(Boolean, values)) ||
													!dirty ||
													isFormLoading
												}
											>
												{isFormLoading ? (
													<Spinner color="white" size={20} />
												) : (
													<LSpan fontWeight={400}>
														本人確認メールを送信する
													</LSpan>
												)}
											</Button>
										</Box>
									</form>
								);
							}}
						</Formik>
					</DashboardFormWrapper>
				</Box>
			</Box>
		</AppLayout>
	);
};

export default UserAccountEmailPage;

/**Breadcumd */
const breadcrumbList = [
	{ url: "/", description: "ホーム" },
	{
		url: "",
		description: `メールアドレス編集`,
	},
];

export async function getServerSideProps(context: any) {
	return await checkAuthMiddleware(context, "user");
}
