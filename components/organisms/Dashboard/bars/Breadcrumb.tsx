import { LinkRouter, Typography } from "@/components/atoms";
import React from "react";
import { SpaceProps, space } from "styled-system";
import styled from "styled-components";
import { colors } from "@/styles";

interface BreadcrumbListProps {
	description: string;
	url: string;
}

interface Props extends SpaceProps {
	breadcrumbList: BreadcrumbListProps[];
}

export const Breadcrumb: React.FC<Props> = ({ breadcrumbList, ...props }) => {
	return (
		<BreadcrumbStyle
			{...props}
			itemScope={true}
			itemType="http://schema.org/BreadcrumbList"
		>
			{breadcrumbList?.map(function (item: BreadcrumbListProps, index: number) {
				if (item.url != "") {
					return (
						<li
							key={index}
							itemProp="itemListElement"
							itemScope={true}
							itemType="http://schema.org/ListItem"
						>
							<LinkRouter href={item.url} color="primary.main">
								<span itemProp="name">{item.description}</span>
							</LinkRouter>
							<meta itemProp="position" content={index.toString()} />
						</li>
					);
				} else {
					return (
						<li
							key={index}
							itemProp="itemListElement"
							itemScope={true}
							itemType="http://schema.org/ListItem"
						>
							<Typography color="secondary.main">
								<span itemProp="name">{item.description}</span>
							</Typography>
							<meta itemProp="position" content={index.toString()} />
						</li>
					);
				}
			})}
		</BreadcrumbStyle>
	);
};

const BreadcrumbStyle = styled.ol`
	margin: 0px;
	list-style-type: none;
	padding: 0px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-end;

	li {
		cursor: pointer;
		display: inline-flex;
		margin-right: 5px;

		&:last-child {
			a {
				&:after {
					content: none;
				}
			}
		}

		a {
			display: flex;
			align-items: center;
			&:after {
				content: "/";
				display: inline-block;
				margin-left: 5px;
				color: ${colors.secondary[500]};
			}
			&:hover {
				color: ${colors.primary[500]};
			}
		}
	}
	${space}
`;
