import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { GuestLayout } from "@/components/layouts";
import { GuestFormWrapper } from "@/components/organisms";
import { useUserPasswordForgetHandler } from "@/hooks";
import { FRONTEND_PATH } from "@/libs/routes";
import { passwordForgetInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { colors } from "@/styles";
import { PasswordForgetInput } from "@/types";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const ClientPasswordForgetPage: NextPage = () => {
	const { handleUserPasswordForget, isFormLoading } =
		useUserPasswordForgetHandler();

	const handleFormSubmit = async (input: PasswordForgetInput) => {
		const validationErrors = await handleUserPasswordForget({ ...input });
		return validationErrors;
	};

	const initialValues = {
		email: "",
	};

	return (
		<GuestLayout>
			<GuestFormWrapper
				title="パスワード再設定メール送信"
				descriptions={[
					"パスワードをお忘れの方はこちらからパスワード再設定メールを送信してください。",
				]}
				divibarText="または"
				footerLinks={[
					{
						href: FRONTEND_PATH.USER.LOGIN,
						text: "ログインはこちら",
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
					validationSchema={passwordForgetInputSchema}
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
									</Box>
									<Button
										mb="24px"
										variant="contained"
										color="primary"
										type="submit"
										fullwidth
										size="medium"
										disabled={
											!isValid || isEmptyObject(R.pickBy(Boolean, values))
										}
									>
										{isFormLoading ? (
											<Spinner color="white" size={20} />
										) : (
											<LSpan fontWeight={400}>
												パスワード再設定メールを送信する
											</LSpan>
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

export default ClientPasswordForgetPage;
