import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { GuestLayout } from "@/components/layouts";
import { GuestFormWrapper } from "@/components/organisms";
import { useUserLoginHandler, useCheckAuth } from "@/hooks";
import { checkAuthMiddleware } from "@/libs/middleware";
import { FRONTEND_PATH } from "@/libs/routes";
import { userLoginInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { colors } from "@/styles";
import { UserLoginInput } from "@/types";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const UserLoginPage: NextPage = () => {
	const { isLoading } = useCheckAuth("guest");

	const { handleUserLogin, isFormLoading } = useUserLoginHandler();

	const handleFormSubmit = async (input: UserLoginInput) => {
		const validationErrors = await handleUserLogin({ input });
		return validationErrors;
	};

	const initialValues = {
		email: "",
		password: "",
	};

	return isLoading ? (
		<p>loading...</p>
	) : (
		<GuestLayout>
			<GuestFormWrapper
				title="ログインページ"
				descriptions={["こちらからログインしてください。"]}
				divibarText="または"
				footerLinks={[
					{
						href: FRONTEND_PATH.USER.REGISTER,
						text: "会員登録がお済みではない方はこちら",
					},
					{
						href: FRONTEND_PATH.USER.PASSWORD_FORGET.INDEX,
						text: "パスワードをお忘れの方はこちら",
					},
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
					validationSchema={userLoginInputSchema}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
						isValid,
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								<Box mx="auto" mt="20px">
									<Box mb="24px">
										<TextField
											placeholder="メールアドレス"
											type="email"
											name="email"
											fullwidth
											mb="16px"
											startAdornment={
												<Icon
													icon="ic:outline-email"
													width={20}
													height={20}
													color={colors.gray[300]}
												/>
											}
											onBlur={handleBlur}
											onChange={handleChange}
											errorText={
												touched["email"] && errors["email"]
													? errors["email"]
													: ""
											}
										/>
										<TextField
											placeholder="パスワード"
											type="password"
											name="password"
											fullwidth
											mb="16px"
											startAdornment={
												<Icon
													icon="material-symbols:lock-outline"
													width={20}
													height={20}
													color={colors.gray[300]}
												/>
											}
											onBlur={handleBlur}
											onChange={handleChange}
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
										fullwidth
										size="md"
										disabled={
											!isValid ||
											isEmptyObject(R.pickBy(Boolean, values)) ||
											isFormLoading
										}
									>
										{isFormLoading ? (
											<Spinner color="white" size={20} />
										) : (
											<LSpan fontWeight={400}>ログインする</LSpan>
										)}
									</Button>
								</Box>
							</form>
						);
					}}
				</Formik>
			</GuestFormWrapper>
		</GuestLayout>
	);
};

export default UserLoginPage;

export async function getServerSideProps(context: any) {
	return await checkAuthMiddleware(context, "guest");
}
