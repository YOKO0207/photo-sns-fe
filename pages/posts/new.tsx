import { AppLayout } from "@/components/layouts";
import { NextPage } from "next";
import { Box, Button, H1, TextField, Textarea } from "@/components/atoms";
import { FileUploader } from "@/components/molecules";
import { Formik } from "formik";
import { PostCreateInput } from "@/types";
import { usePostCreateHandler } from "@/hooks";
import { postCreateInputSchema } from "@/libs/schemas/postSchema";
import { isEmptyObject } from "@/libs/utils";
import * as R from "ramda";

const PostNewPage: NextPage = () => {
	// CRUD functions
	const {
		handlePostCreate,
		isFormLoading: isPhotoMaterialCreateFormLoading,
	} = usePostCreateHandler();

	// form submission
	const initialValues = {
		src: null,
		post_name: "",
		post_content: ""
	};
	const handleFormSubmit = (input: PostCreateInput) => {
		const validationErrors = handlePostCreate({ input });
		return validationErrors;
	};
	return (
		<AppLayout>
			<Box border="2px solid" borderColor="gray.150" px="40px" py="40px" borderRadius="4px">
				<H1
					fontSize="18px"
					fontWeight="bold"
					color="gray.600"
					borderBottom="2px solid"
					borderBottomColor="gray.120"
					mb="24px"
					pb="12px"
				>
					投稿を作成する
				</H1>
				<Formik
					initialValues={initialValues}
					enableReinitialize={true}
					onSubmit={async (input, { setErrors }) => {
						const validationErrors = await handleFormSubmit(input);
						if (validationErrors) {
							setErrors(validationErrors);
						}
					}}
					validationSchema={postCreateInputSchema}
				>
					{({
						errors,
						touched,
						handleSubmit,
						setFieldValue,
						values,
						handleBlur,
						handleChange,
						isValid,
						dirty,
					}) => {
						const handleFileChange = (file: File) => {
							setFieldValue("src", file);
						};
						return (
							<Box display="flex" gap="40px">
								<Box width="30%" minWidth="300px" maxWidth="400px">
									<FileUploader
										name="src"
										onChange={handleFileChange}
										errorText={
											touched["src"] && errors["src"] ? errors["src"] : ""
										}
									/>
								</Box>
								<Box width="70%">
									<TextField
										mb="20px"
										onChange={handleChange}
										onBlur={handleBlur}
										name="post_name"
										label="タイトル"
										errorText={
											touched["post_name"] && errors["post_name"]
												? errors["post_name"]
												: ""
										}
									/>
									<Textarea
										mb="20px"
										onChange={handleChange}
										onBlur={handleBlur}
										name="post_content"
										label="投稿内容"
										rows={14}
										errorText={
											touched["post_content"] && errors["post_content"]
												? errors["post_content"]
												: ""
										}
									/>
									<Box width="400px">
										<Button
											mt="32px"
											variant="contained"
											color="primary"
											type="button"
											onClick={() => handleSubmit()}
											fullwidth
											size="md"
											p={0}
											disabled={
												!dirty ||
												!isValid ||
												isEmptyObject(R.pickBy(Boolean, values))
											}
										>
											投稿を作成する
										</Button>
									</Box>
								</Box>
							</Box>
						);
					}}
				</Formik>
			</Box>
		</AppLayout>
	);
}

export default PostNewPage;