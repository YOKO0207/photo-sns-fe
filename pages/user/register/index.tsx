import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { GuestLayout } from "@/components/layouts";
import { GuestFormWrapper } from "@/components/organisms";
import { useUserRegisterHandler } from "@/hooks";
import { checkAuthMiddleware } from "@/libs/middleware";
import { FRONTEND_PATH } from "@/libs/routes";
import { userRegisterInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { colors } from "@/styles";
import { UserRegisterInput } from "@/types";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const UserRegisterPage: NextPage = () => {
	const { handleUserRegister, isFormLoading } = useUserRegisterHandler();

	const handleFormSubmit = async (input: UserRegisterInput) => {
		const validationErrors = await handleUserRegister({ ...input });
		return validationErrors;
	};

	const initialValues = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	return (
		<GuestLayout>
			<GuestFormWrapper
				title="会員登録ページ"
				descriptions={["の方はこちらから会員登録してください。"]}
				divibarText="または"
				footerLinks={[
					{
						href: FRONTEND_PATH.USER.LOGIN,
						text: "会員登録がお済みの方はこちら",
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
					validationSchema={userRegisterInputSchema}
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
											placeholder="名前"
											type="text"
											name="name"
											fullwidth
											mb="16px"
											startAdornment={
												<Icon
													icon="ph:user-bold"
													width={20}
													height={20}
													color={colors.gray[300]}
												/>
											}
											onBlur={handleBlur}
											onChange={handleChange}
											errorText={
												touched["name"] && errors["name"] ? errors["name"] : ""
											}
										/>
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
											!isValid ||
											isEmptyObject(R.pickBy(Boolean, values)) ||
											isFormLoading
										}
									>
										{isFormLoading ? (
											<Spinner color="white" size={20} />
										) : (
											<LSpan fontWeight={400}>会員登録する</LSpan>
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

export default UserRegisterPage;

export async function getServerSideProps(context: any) {
	return await checkAuthMiddleware(context, "guest");
}
