import { FC } from "react";
import { Box, MSpan, Error, IconButton } from "@/components/atoms";
import { Formik } from "formik";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { isEmptyObject } from "@/libs/utils";
import * as R from "ramda";
import { postThreadCommentSchema } from "@/libs/schemas";
import { PostThreadCommentCreateInput } from "@/types";
import { colors } from "@/styles";
import { useUserContext } from "@/states/contexts/UserContext";

interface Props {
	onFormSubmit: (input: PostThreadCommentCreateInput) => void;
	height: number;
}

export const ThreadForm: FC<Props> = (props) => {
	const { onFormSubmit, height } = props;
	const { state: loggedInUser } = useUserContext();

	const initialValues = {
		content: "",
	};

	const handleFormSubmit = async (
		input: PostThreadCommentCreateInput,
		{ resetForm }: { resetForm: () => void }
	) => {
		await onFormSubmit({ ...input });
		resetForm();
	};

	return (
		<>
			<Box
				display="flex"
				alignItems="flex-start"
				justifyContent="space-between"
				height={height}
				pt={3}
			>
				<Box
					bg="primary.500"
					borderRadius="50%"
					minWidth="26px"
					height="26px"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<MSpan color="gray.white">{loggedInUser.name[0]}</MSpan>
				</Box>
				<Box mx="12px" width="100%">
					<Formik
						initialValues={initialValues}
						enableReinitialize={true}
						onSubmit={(values, { resetForm }) => {
							handleFormSubmit(values, { resetForm });
						}}
						validationSchema={postThreadCommentSchema}
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
									<StyledTextarea
										name="content"
										value={values.content}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Box
										width="100%"
										bg="gray.950"
										borderTop="1px solid"
										borderTopColor="gray.500"
										borderBottomLeftRadius="4px"
										borderBottomRightRadius="4px"
										p="8px"
										mt="-6px"
										display="flex"
										justifyContent="flex-end"
										alignItems="center"
									>
										{touched["content"] && errors["content"] && (
											<Error p={0} m={0} mr={3} color="gray.300">
												* {errors["content"]}
											</Error>
										)}
										<IconButton
											variant="contained"
											size="small"
											color="primary"
											type="submit"
											disabled={
												!dirty ||
												!isValid ||
												isEmptyObject(R.pickBy(Boolean, values))
											}
										>
											<Icon
												icon={"ion:arrow-up-outline"}
												width={16}
												height={16}
												color={colors.gray.white}
											/>
										</IconButton>
									</Box>
								</form>
							);
						}}
					</Formik>
				</Box>
			</Box>
		</>
	);
};

const StyledTextarea = styled.textarea`
	background-color: ${colors.gray[950]};
	color: ${colors.gray.white};
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border: none;
	resize: none;
	width: 100%;
	height: 100px;
	padding: 8px;
	line-height: 1.4;
	&:focus {
		outline: none;
	}
`;
