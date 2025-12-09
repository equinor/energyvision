import { HiOutlineViewColumns } from "react-icons/hi2";
import type { Image, PortableTextBlock, Reference, Rule } from "sanity";
import blocksToText from "../../../helpers/blocksToText";
import { topicPromotionFilter } from "../../../helpers/referenceFilters";
import routes from "../../routes";
import {
	gridColumns,
	layoutDirection,
	layoutGrid,
	theme,
	title,
} from "../commonFields/commonFields";

type PromotedTopicPage = {
	_key: string;
	_type: "topics";
	ingress: PortableTextBlock[];
	reference: Reference;
};

export type promoteTopics = {
	_type: "promoteTopicsV2";
	references: PromotedTopicPage[];
};

export default {
	title: "Promote topics (v2)",
	name: "promoteTopicsV2",
	type: "object",
	fieldsets: [
		{
			name: "design",
			title: "Design options",
		},
	],
	fields: [
		title,
		{
			name: "promoteList",
			type: "array",
			of: [
				{
					type: "object",
					name: "topicItem",
					title: "Topic item",
					fields: [
						{
							title: "Page to be promoted",
							name: "reference",
							description: "Select the page you want to promote",
							type: "reference",
							to: [...routes].filter((e) => e),
							options: {
								filter: topicPromotionFilter,
								disableNew: true,
							},
						},
					],
					preview: {
						select: {
							topicTitle: "reference.content.title",
							topicMedia: "reference.content.heroFigure.image",
						},
						prepare({
							topicTitle,
							topicMedia,
						}: {
							topicTitle: PortableTextBlock[];
							topicMedia: Image;
						}) {
							const plainTitle = topicTitle
								? blocksToText(topicTitle)
								: "Untitled";

							return {
								title: plainTitle,
								media: topicMedia,
							};
						},
					},
				},
			],
			validation: (Rule: Rule) => Rule.unique(),
		},
		theme,
		layoutGrid,
		gridColumns,
		layoutDirection,
	],
	preview: {
		select: {
			title: "title",
			promoteList: "promoteList",
			theme: "theme",
		},
		prepare({
			title,
			promoteList,
			theme,
		}: {
			title?: PortableTextBlock[];
			promoteList: any[];
			theme?: any;
		}) {
			console.log("prepare theme", theme);
			const plainTitle = title ? blocksToText(title) : "Untitled";
			const subTitle = `Promote ${promoteList && promoteList?.length > 0 ? promoteList.length : ""} topics`;
			return {
				title: plainTitle,
				subtitle: subTitle,
				media: HiOutlineViewColumns,
			};
		},
	},
};
