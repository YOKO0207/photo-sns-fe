import { Box, Button, LSpan, Spinner, TextField } from "@/components/atoms";
import { AppLayout } from "@/components/layouts";
import { DashboardFormWrapper, ProfileMenuBar } from "@/components/organisms";
import { useUserUpdateProfileHandler, useCheckAuth } from "@/hooks";
import { checkAuthMiddleware } from "@/libs/middleware";
import { userNameUpdateInputSchema } from "@/libs/schemas";
import { isEmptyObject } from "@/libs/utils";
import { useUserContext } from "@/states/contexts";
import { UserNameUpdateInput } from "@/types";
import { Formik } from "formik";
import { NextPage } from "next";
import * as R from "ramda";

const UserAccountNamePage: NextPage = () => {
	const { isLoading } = useCheckAuth("user");

	const { handleUserUpdateProfile, isFormLoading } =
		useUserUpdateProfileHandler();

	const handleFormSubmit = async (input: UserNameUpdateInput) => {
		const validationErrors = await handleUserUpdateProfile({ input });
		return validationErrors;
	};

	const { state: user } = useUserContext();

	const initialValues = {
		name: user?.name || "",
	};

	return isLoading ? (
		<p>loading...</p>
	) : (
		<AppLayout>
			<Box display="flex" gap="40px" my="54px">
				<Box width="23%">
					<ProfileMenuBar />
				</Box>
				<Box width="77%">
					<DashboardFormWrapper
						title="プロフィール編集ページ"
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
							validationSchema={userNameUpdateInputSchema}
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
													label="名前"
													type="text"
													name="name"
													fullwidth
													mb="16px"
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
													errorText={
														touched["name"] && errors["name"]
															? errors["name"]
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
													<LSpan fontWeight={400}>名前を更新する</LSpan>
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

export default UserAccountNamePage;

/**Breadcumd */
const breadcrumbList = [
	{ url: "/", description: "ホーム" },
	{
		url: "",
		description: `プロフィール編集`,
	},
];
