import {
	projectCommentFormWidth,
	threadFormFooterHeight,
	threadFormHeaderHeight,
	threadFormPaddingY,
} from "@/styles";
import { PostThreadComments } from "@/types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

type Props = {
	iconRef: React.RefObject<HTMLDivElement>;
	formRef: React.RefObject<HTMLDivElement>;
	comments: PostThreadComments[] | undefined;
};

export const usePositionForm = (props: Props): any => {
	const { iconRef, formRef, comments } = props;

	const [formDeltaPositionX, setFormDeltaPositionX] = useState<number>(0);
	const [formDeltaPositionY, setFormDeltaPositionY] = useState<number>(0);
	const [commentFormHeight, setCommentFormHeight] = useState<number | null>(
		null
	);
	const formDeltaPosition = {
		x: formDeltaPositionX,
		y: formDeltaPositionY,
	};

	const isElementAtRightEdge = useCallback((edge: number) => {
		const viewportWidth = document.documentElement.clientWidth;
		return edge >= viewportWidth;
	},[]);

	const isElementAtBottomEdge = useCallback((edge: number) => {
		const viewportHeight = document.documentElement.clientHeight;
		return edge >= viewportHeight;
	},[]);

	const isElementMaximunHeight = useCallback((height: number) => {
		const viewportHeight = document.documentElement.clientHeight;
		return height >= viewportHeight;
	},[]);

	const repositionFormHandler = useCallback(() => {
		const formExtraHeight = threadFormHeaderHeight + threadFormFooterHeight;

		if (iconRef.current && formRef.current) {
			const iconBoundingRect = iconRef.current.getBoundingClientRect();
			const formBoundingRect = formRef.current.getBoundingClientRect();

			const formHeight = formRef.current.clientHeight;
			const viewPortHeight = document.documentElement.clientHeight;
			const overflowHeight = formBoundingRect.bottom - viewPortHeight;

			const isRightEdge = isElementAtRightEdge(
				iconBoundingRect.right + projectCommentFormWidth
			);
			const isBottomEdge = isElementAtBottomEdge(formBoundingRect.bottom);
			const isMaxHeight = isElementMaximunHeight(formHeight);

			if (isBottomEdge && !isMaxHeight) {
				setFormDeltaPositionY(formDeltaPosition.y - overflowHeight);
				setCommentFormHeight(null);
			} else if (isBottomEdge && isMaxHeight) {
				setFormDeltaPositionY(0);
				setCommentFormHeight(
					Math.round(
						formHeight -
							formExtraHeight -
							(formHeight - viewPortHeight) -
							threadFormPaddingY * 2
					)
				);
			} else {
				setFormDeltaPositionY(iconBoundingRect.top - threadFormPaddingY);
				setCommentFormHeight(null);
			}

			if (isRightEdge) {
				setFormDeltaPositionX(iconBoundingRect.left - projectCommentFormWidth);
			} else {
				setFormDeltaPositionX(iconBoundingRect.left + 44);
			}
		}
	}, [
		iconRef,
		formRef,
		isElementAtBottomEdge,
		isElementAtRightEdge,
		isElementMaximunHeight,
		formDeltaPosition.y,
	]);

	useEffect(() => {
		window.addEventListener("resize", repositionFormHandler);
		return () => {
			window.removeEventListener("resize", repositionFormHandler);
		};
	}, [repositionFormHandler]);

	useLayoutEffect(() => {
		repositionFormHandler();
	}, [comments, repositionFormHandler]);

	return { formDeltaPosition, commentFormHeight };
};

// TODO fix when deleting comments from max height
