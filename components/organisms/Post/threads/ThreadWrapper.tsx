import { Box } from "@/components/atoms";
import { ThreadIcon } from "@/components/organisms";
import { useThreadContext, useUserContext } from "@/states/contexts";
import { DeltaPosition, ListUser } from "@/types";
import { ReactNode, forwardRef, useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Portal } from "react-portal";

interface Props {
	children: ReactNode;
	onHandleStop?: (input: DeltaPosition) => void;
	user: ListUser;
	x: number;
	y: number;
	formOpen: boolean;
	setFormOpen: (formOpen: boolean) => void;
}

export const ThreadWrapper = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {
		children,
		x,
		y,
		user,
		onHandleStop,
		formOpen,
		setFormOpen,
	} = props;

	const { state: loggedInUser } = useUserContext();
	const [shouldRender, setShouldRender] = useState<boolean>(false);
	const [dragging, setDragging] = useState<boolean>(false);
	const [iconDeltaPosition, setIconDeltaPosition] = useState<DeltaPosition>({
		x,
		y,
	});
	const [prevIconDeltaPosition, setPrevIconDeltaPosition] =
		useState<DeltaPosition>({ x, y });

	const { dispatch } = useThreadContext();

	const handleStop = (e: DraggableEvent, ui: DraggableData) => {
		setPrevIconDeltaPosition({
			x: iconDeltaPosition.x,
			y: iconDeltaPosition.y,
		});
		setIconDeltaPosition({
			x: ui.x,
			y: ui.y,
		});

		if (
			onHandleStop &&
			ui.x !== iconDeltaPosition.x &&
			ui.y !== iconDeltaPosition.y
		) {
			onHandleStop({
				x: ui.x,
				y: ui.y,
			});
		}
		setDragging(false);
	};

	const handleStart = (e: DraggableEvent, ui: DraggableData) => {
		setDragging(true);
	};

	const handleClick = () => {
		if (
			iconDeltaPosition.x === prevIconDeltaPosition.x &&
			iconDeltaPosition.y === prevIconDeltaPosition.y
		) {
			setFormOpen(!formOpen);
			if (formOpen) {
				dispatch({ type: "SET_THREAD_CLOSED" });
			} else {
				dispatch({ type: "SET_THREAD_OPEN" });
			}
		}
	};

	useEffect(() => {
		setShouldRender(true);
	}, []);

	return (
		shouldRender && (
			<>
				{!dragging && formOpen && <Portal>{children}</Portal>}
				<Draggable
					defaultClassName="thread"
					bounds="parent"
					onStop={handleStop}
					onStart={loggedInUser?.id === user.id ? handleStart : () => false}
					defaultPosition={iconDeltaPosition}
				>
					<Box
						ref={ref}
						style={{ cursor: loggedInUser?.id === user.id ? "grab" : "auto" }}
						width="40px"
						height="40px"
						display="flex"
						justifyContent="center"
						alignItems="center"
						position="absolute"
						onClick={handleClick}
					>
						<ThreadIcon user={user} formOpen={formOpen} />
					</Box>
				</Draggable>
			</>
		)
	);
});

ThreadWrapper.displayName = "ThreadWrapper";
