import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { GuestLayout } from "@/components/layouts";
import { GuestFormWrapper } from "@/components/organisms";
import { useUserPasswordResetHandler } from "@/hooks";
import { FRONTEND_PATH } from "@/libs/routes";
import { passwordResetInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { colors } from "@/styles";
import { PasswordResetInput } from "@/types";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const UserPasswordResetPage: NextPage = () => {
	const { handleUserPasswordReset, isFormLoading } =
		useUserPasswordResetHandler();

	const handleFormSubmit = async (input: PasswordResetInput) => {
		const validationErrors = await handleUserPasswordReset({ ...input });
		return validationErrors;
	};

	const initialValues = {
		password: "",
		password_confirmation: "",
	};

	return (
		<GuestLayout>
			<GuestFormWrapper
				title="パスワード再設定"
				descriptions={["お好みのパスワードを設定してください。"]}
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
					validationSchema={passwordResetInputSchema}
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
										<TextField
											placeholder="パスワード(確認)"
											type="password"
											name="password_confirmation"
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
										size="md"
										disabled={
											!isValid || isEmptyObject(R.pickBy(Boolean, values))
										}
									>
										{isFormLoading ? (
											<Spinner color="white" size={20} />
										) : (
											<LSpan fontWeight={400}>パスワードを再設定する</LSpan>
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

export default UserPasswordResetPage;
