import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';
import data from './data';

const {
	tags,
	posts
} = data;

const TagType = new GraphQLObjectType({
	name: 'Tag',
	fields: () => ({
		name: {
			type: GraphQLString
		},
		posts: {
			type: new GraphQLList(PostType)
		}
	})
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		subtitle: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		image: {
			type: GraphQLString
		},
		tags: {
			type: new GraphQLList(TagType)
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields: {
		tag: {
			type: TagType,
			args: {
				name: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				for (let k in args) {
					for (let i = 0; i < tags.length; i++) {
						if (tags[i][k].toLowerCase() === args[k].toLowerCase()) {
							// add posts
							const tag = tags[i]
							return tags[i];
						}
					}
				}
			}
		},
		tags: {
			type: new GraphQLList(TagType),
			resolve(parentValue, args) {
				return tags;
			}
		},
		post: {
			type: PostType,
			args: {
				title: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				for (let k in args) {
					for (let i = 0; i < posts.length; i++) {
						if (posts[i][k].toLowerCase() === args[k].toLowerCase()) {
							return posts[i];
						}
					}
				}
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parentValue, args) {
				return posts;
			}
		}
	},
});

export default new GraphQLSchema({
	query: RootQuery
});