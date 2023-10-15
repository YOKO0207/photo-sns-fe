import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { DashboardLayout } from "@/components/layouts";
import { DashboardFormWrapper, ProfileMenuBar } from "@/components/organisms";
import { useUserUpdatePasswordHandler } from "@/hooks";
import { checkAuthMiddleware } from "@/libs/middleware";
import { userPasswordUpdateInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { UserPasswordUpdateInput } from "@/types";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const UserAccountPasswordPage: NextPage = () => {
	const { handleUserUpdatePassword, isFormLoading } =
		useUserUpdatePasswordHandler();

	const handleFormSubmit = async (input: UserPasswordUpdateInput) => {
		const validationErrors = await handleUserUpdatePassword({ ...input });
		return validationErrors;
	};

	const initialValues = {
		current_password: "",
		password: "",
		password_confirmation: "",
	};

	return (
		<DashboardLayout breadcrumbList={breadcrumbList}>
			<ProfileMenuBar />
			<DashboardFormWrapper
				title="パスワード変更ページ"
				isFormLoading={isFormLoading}
				maxWidth="600px"
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
					validationSchema={userPasswordUpdateInputSchema}
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
											label="現在のパスワード"
											type="password"
											name="current_password"
											fullwidth
											mb="16px"
											onBlur={handleBlur}
											onChange={handleChange}
											errorText={
												touched["current_password"] &&
												errors["current_password"]
													? errors["current_password"]
													: ""
											}
										/>
										<TextField
											label="パスワード"
											type="password"
											name="password"
											fullwidth
											mb="16px"
											onBlur={handleBlur}
											onChange={handleChange}
											errorText={
												touched["password"] && errors["password"]
													? errors["password"]
													: ""
											}
										/>
										<TextField
											label="パスワード(確認)"
											type="password"
											name="password_confirmation"
											fullwidth
											mb="16px"
											onBlur={handleBlur}
											onChange={handleChange}
											errorText={
												touched["password_confirmation"] &&
												errors["password_confirmation"]
													? errors["password_confirmation"]
													: ""
											}
										/>
									</Box>
									<Button
										mb="24px"
										variant="contained"
										color="primary"
										type="submit"
										fullwidth
										size="medium"
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
											<LSpan fontWeight={400}>パスワードを更新する</LSpan>
										)}
									</Button>
								</Box>
							</form>
						);
					}}
				</Formik>
			</DashboardFormWrapper>
		</DashboardLayout>
	);
};

export default UserAccountPasswordPage;

/**Breadcumd */
const breadcrumbList = [
	{ url: "/", description: "ホーム" },
	{
		url: "",
		description: `パスワード編集`,
	},
];

export async function getServerSideProps(context: any) {
	return await checkAuthMiddleware(context, "user");
}
