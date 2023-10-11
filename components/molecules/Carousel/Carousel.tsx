import { IconButton } from "@/components/atoms";
import { colors } from "@/styles";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

interface Props {
	children: React.ReactNode;
	prevNextButtonSize?: number;
}

interface ResponsiveObject {
	breakpoint: number;
	settings: "unslick" | ReactSlickProps;
}

interface ReactSlickProps {
	arrows?: boolean;
	adaptiveHeight?: boolean;
	afterChange?: (currentSlide: number) => void;
	autoplay?: boolean;
	autoplaySpeed?: number;
	beforeChange?: (currentSlide: number, nextSlide: number) => void;
	centerMode?: boolean;
	centerPadding?: string;
	className?: string;
	cssEase?: string;
	dots?: boolean;
	dotsClass?: string;
	draggable?: boolean;
	edgeFriction?: number;
	fade?: boolean;
	focusOnSelect?: boolean;
	infinite?: boolean;
	initialSlide?: number;
	lazyLoad?: "ondemand" | "progressive";
	pauseOnHover?: boolean;
	responsive?: ResponsiveObject[];
	rtl?: boolean;
	slide?: string;
	slidesToShow?: number;
	slidesToScroll?: number;
	speed?: number;
	swipe?: boolean;
	swipeToSlide?: boolean;
	touchMove?: boolean;
	touchThreshold?: number;
	useCSS?: boolean;
	useTransform?: boolean;
	variableWidth?: boolean;
	vertical: boolean;
	waitForAnimate?: boolean;
}

interface SliderWrapperProps {
	vertical: boolean;
}

interface ButtonProps {
	onClick: () => void;
	prevNextButtonSize?: number;
}

export const Carousel: React.FC<Props & ReactSlickProps> = (props) => {
	const { children, ...rest } = props;

	const settings = {
		...rest,
	};

	return (
		<SliderWrapper vertical={rest.vertical}>
			<Slider
				prevArrow={
					rest.vertical ? (
						<VerticalPrevArrow
							onClick={() => {}}
							prevNextButtonSize={rest.prevNextButtonSize}
						/>
					) : (
						<HorizontalPrevArrow
							onClick={() => {}}
							prevNextButtonSize={rest.prevNextButtonSize}
						/>
					)
				}
				nextArrow={
					rest.vertical ? (
						<VerticalNextArrow
							onClick={() => {}}
							prevNextButtonSize={rest.prevNextButtonSize}
						/>
					) : (
						<HorizontalNextArrow
							onClick={() => {}}
							prevNextButtonSize={rest.prevNextButtonSize}
						/>
					)
				}
				{...settings}
			>
				{children}
			</Slider>
		</SliderWrapper>
	);
};

const VerticalPrevArrow: React.FC<ButtonProps> = (props) => {
	const { onClick, prevNextButtonSize } = props;
	return (
		<IconButton
			variant="text"
			size="small"
			margin="0 auto"
			p={
				prevNextButtonSize
					? Math.round(prevNextButtonSize / 10) + "px"
					: 6 + "px"
			}
		>
			<Icon
				icon={"mingcute:up-fill"}
				width={prevNextButtonSize ? prevNextButtonSize : 40}
				height={prevNextButtonSize ? prevNextButtonSize : 40}
				color={colors.gray[220]}
				onClick={onClick}
			/>
		</IconButton>
	);
};
const VerticalNextArrow: React.FC<ButtonProps> = (props) => {
	const { onClick, prevNextButtonSize } = props;
	return (
		<IconButton
			variant="text"
			size="small"
			margin="0 auto"
			p={
				prevNextButtonSize
					? Math.round(prevNextButtonSize / 10) + "px"
					: 6 + "px"
			}
		>
			<Icon
				icon={"mingcute:down-fill"}
				width={prevNextButtonSize ? prevNextButtonSize : 40}
				height={prevNextButtonSize ? prevNextButtonSize : 40}
				color={colors.gray[220]}
				onClick={onClick}
			/>
		</IconButton>
	);
};

const HorizontalPrevArrow: React.FC<ButtonProps> = (props) => {
	const { onClick, prevNextButtonSize } = props;
	return (
		<IconButton
			variant="text"
			size="small"
			margin="0 auto"
			p={
				prevNextButtonSize
					? Math.round(prevNextButtonSize / 10) + "px"
					: 6 + "px"
			}
		>
			<Icon
				icon={"mingcute:left-fill"}
				width={prevNextButtonSize ? prevNextButtonSize : 40}
				height={prevNextButtonSize ? prevNextButtonSize : 40}
				color={colors.gray[220]}
				onClick={onClick}
			/>
		</IconButton>
	);
};
const HorizontalNextArrow: React.FC<ButtonProps> = (props) => {
	const { onClick, prevNextButtonSize } = props;
	return (
		<IconButton
			variant="text"
			size="small"
			margin="0 auto"
			p={
				prevNextButtonSize
					? Math.round(prevNextButtonSize / 10) + "px"
					: 6 + "px"
			}
		>
			<Icon
				icon={"mingcute:right-fill"}
				width={prevNextButtonSize ? prevNextButtonSize : 40}
				height={prevNextButtonSize ? prevNextButtonSize : 40}
				color={colors.gray[220]}
				onClick={onClick}
			/>
		</IconButton>
	);
};

const SliderWrapper = styled.div<SliderWrapperProps>`
	.slick-slider {
		display: ${(props) => (props.vertical ? "block" : "flex")};
	}
	.slick-dots {
		bottom: -40px;
	}
	.slick-dots li {
		margin: -1px;
	}
	.slick-dots li button:before {
		content: "";
		background-color: ${colors.gray[500]};
		border-radius: 50%;
		width: 8px;
		height: 8px;
	}
`;
