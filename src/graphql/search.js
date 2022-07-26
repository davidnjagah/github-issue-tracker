import gql from "graphql-tag";

export const SEARCH = gql`
query ( $first: Int!, $after: String, $labels: String!, $type: SearchType!) {
    search(first: $first
			after: $after
           query: $labels
			type: $type) 
			{pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
			}
          edges{
            ... on SearchResultItemEdge {
            node{
              ... on Issue{
                author {
                login
              }
              repository {
                name
              }
              createdAt
			  id
			  number
			  state
			  title
			  body
			  labels(first: 20) {
				nodes {
				  name
				  id
				}
			  }
			  comments(
				first: 50
				orderBy: { field: UPDATED_AT, direction: DESC }
			  ) {
				pageInfo {
				  startCursor
				  endCursor
				  hasNextPage
				  hasPreviousPage
				}
				edges {
				  ... on IssueCommentEdge {
					node {
					  author {
						login
					  }
					  id
					  body
					}
				   }
				 }
			    }
              }
            }
          }
        }
      }
    }
`;