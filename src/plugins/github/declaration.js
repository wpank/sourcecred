// @flow

import type {PluginDeclaration} from "../../analysis/pluginDeclaration";
import * as N from "./nodes";
import * as E from "./edges";
import dedent from "../../util/dedent";

const repoNodeType = Object.freeze({
  name: "Repository",
  pluralName: "Repositories",
  prefix: N.Prefix.repo,
  defaultWeight: 4,
  description: "NodeType for a GitHub repository",
});

const issueNodeType = Object.freeze({
  name: "Issue",
  pluralName: "Issues",
  prefix: N.Prefix.issue,
  defaultWeight: 2,
  description: "NodeType for a GitHub issue",
});

const pullNodeType = Object.freeze({
  name: "Pull request",
  pluralName: "Pull requests",
  prefix: N.Prefix.pull,
  defaultWeight: 4,
  description: "NodeType for a GitHub pull request",
});

const reviewNodeType = Object.freeze({
  name: "Pull request review",
  pluralName: "Pull request reviews",
  prefix: N.Prefix.review,
  defaultWeight: 1,
  description: "NodeType for a GitHub code review",
});

const commentNodeType = Object.freeze({
  name: "Comment",
  pluralName: "Comments",
  prefix: N.Prefix.comment,
  defaultWeight: 1,
  description: "NodeType for a GitHub comment",
});

const userNodeType = Object.freeze({
  name: "User",
  pluralName: "Users",
  prefix: N.Prefix.user,
  defaultWeight: 1,
  description: "NodeType for a GitHub user",
});

const botNodeType = Object.freeze({
  name: "Bot",
  pluralName: "Bots",
  prefix: N.Prefix.bot,
  defaultWeight: 0.25,
  description: "NodeType for a GitHub bot account",
});

const nodeTypes = Object.freeze([
  repoNodeType,
  issueNodeType,
  pullNodeType,
  reviewNodeType,
  commentNodeType,
  userNodeType,
  botNodeType,
]);

const authorsEdgeType = Object.freeze({
  forwardName: "authors",
  backwardName: "is authored by",
  defaultForwardWeight: 1 / 2,
  defaultBackwardWeight: 1,
  prefix: E.Prefix.authors,
  description: dedent`\
    An authors edge connects a GitHub userlike account to a post\
    that they authored. Examples of posts include issues, pull requests, and comments.
  `,
});

const hasParentEdgeType = Object.freeze({
  forwardName: "has parent",
  backwardName: "has child",
  defaultForwardWeight: 1,
  defaultBackwardWeight: 1 / 4,
  prefix: E.Prefix.hasParent,
  description: dedent`\
    A hasParent edge connects a GitHub entity to its child entities.
    For example, a Repository has Issues and Pull Requests as children, and a
    Pull Request has comments and reviews as children.
  `,
});

const mergedAsEdgeType = Object.freeze({
  forwardName: "merges",
  backwardName: "is merged by",
  defaultForwardWeight: 1 / 2,
  defaultBackwardWeight: 1,
  prefix: E.Prefix.mergedAs,
  description: dedent`\
    A mergedAs edge connects a GitHub pull request to the commit that it merges,
    assuming that the pull request has merged.
  `,
});

const referencesEdgeType = Object.freeze({
  forwardName: "references",
  backwardName: "is referenced by",
  defaultForwardWeight: 1,
  defaultBackwardWeight: 1 / 16,
  prefix: E.Prefix.references,
  description: dedent`\
    A references edge connects a GitHub post to a GitHub entity that it
    references. For example, if you write a GitHub issue comment that says
    "thanks @username for pull #1337", it will create references edges to both
    the user @username, and to pull #1337 in the same repository.
  `,
});

const mentionsAuthorEdgeType = Object.freeze({
  forwardName: "mentions author of",
  backwardName: "has author mentioned by",
  defaultForwardWeight: 1,
  // TODO(#811): Probably change this to 0
  defaultBackwardWeight: 1 / 32,
  prefix: E.Prefix.mentionsAuthor,
  description: dedent`\
    When a post in a particular thread mentions a particular user, that post
    will have a \`MentionsAuthorEdge\` connecting it to any posts written by the
    mentioned user. The intuition is that if a post is mentioning an author by name,
    their contributions in that thread are probably particularly valuable.

    This is an experimental feature and may be removed in a future version of SourceCred.
  `,
});

const reactsHeartEdgeType = Object.freeze({
  forwardName: "reacted ❤️ to",
  backwardName: "got ❤️ from",
  defaultForwardWeight: 2,
  // TODO(#811): Probably change this to 0
  defaultBackwardWeight: 1 / 32,
  prefix: E.Prefix.reactsHeart,
  description: dedent`\
    A reactsHeart edge connects users to posts that they gave a ❤️ reaction to.
  `,
});

const reactsThumbsUpEdgeType = Object.freeze({
  forwardName: "reacted 👍 to",
  backwardName: "got 👍 from",
  defaultForwardWeight: 1,
  // TODO(#811): Probably change this to 0
  defaultBackwardWeight: 1 / 32,
  prefix: E.Prefix.reactsThumbsUp,
  description: dedent`\
    A reactsThumbsUp edge connects users to posts that they gave a 👍 reaction to.
  `,
});

const reactsHoorayEdgeType = Object.freeze({
  forwardName: "reacted 🎉 to",
  backwardName: "got 🎉 from",
  defaultForwardWeight: 4,
  // TODO(#811): Probably change this to 0
  defaultBackwardWeight: 1 / 32,
  prefix: E.Prefix.reactsHooray,
  description: dedent`\
    A reactsHooray edge connects users to posts that they gave a 🎉 reaction to.
  `,
});

const reactsRocketEdgeType = Object.freeze({
  forwardName: "reacted 🚀 to",
  backwardName: "got 🚀 from",
  defaultForwardWeight: 1,
  // TODO(#811): Probably change this to 0
  defaultBackwardWeight: 1 / 32,
  prefix: E.Prefix.reactsRocket,
  description: dedent`\
    A reactsRocket edge connects users to posts that they gave a 🚀 reaction to.
  `,
});

const edgeTypes = Object.freeze([
  authorsEdgeType,
  hasParentEdgeType,
  mergedAsEdgeType,
  referencesEdgeType,
  mentionsAuthorEdgeType,
  reactsThumbsUpEdgeType,
  reactsHeartEdgeType,
  reactsHoorayEdgeType,
  reactsRocketEdgeType,
]);

export const declaration: PluginDeclaration = Object.freeze({
  name: "GitHub",
  nodePrefix: N.Prefix.base,
  edgePrefix: E.Prefix.base,
  nodeTypes: nodeTypes,
  edgeTypes: edgeTypes,
});
