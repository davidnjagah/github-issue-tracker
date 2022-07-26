import gql from "graphql-tag";

export const REPOSITORY_LOGIN = gql`
  query ($username: String!, $repository: String!) {
    repository(owner: $username, name: $repository) {
      name
      id
      owner {
        login
      }
    }
  }
`;

export const REPOSITORY_ISSUES = gql`
  query (
    $username: String!
    $repository: String!
    $first: Int!
    $after: String
  ) {
    repository(owner: $username, name: $repository) {
      name
      id
      owner {
        login
      }
      issues(
        first: $first
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          ... on IssueEdge {
            node {
              author {
                login
              }
              repository {
                name
              }
              createdAt
              id
              state
              title
              number
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


export const REPOSITORY_FILTERED_ISSUES = gql`
  query (
    $username: String!
    $repository: String!
    $first: Int!
    $after: String
    $field: IssueOrderField!
    $labels: [String!]
  ) {
    repository(owner: $username, name: $repository) {
      name
      id
      owner {
        login
      }
      issues(
        first: $first
        after: $after
        orderBy: { field: $field, direction: DESC }
        labels: $labels
      ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          ... on IssueEdge {
            node {
              author {
                login
              }
              repository {
                name
              }
              createdAt
              id
              state
              title
              number
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


export const REPOSITORY_ISSUES_LABELS = gql`
  query (
    $username: String!
    $repository: String!
    $first: Int!
    $after: String
    $field: IssueOrderField!
  ) {
    repository(owner: $username, name: $repository) {
      name
      id
      owner {
        login
      }
      issues(
        first: $first
        after: $after
        orderBy: { field: $field, direction: DESC }
      ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          ... on IssueEdge {
            node {
              author {
                login
              }
              repository {
                name
              }
              createdAt
              id
              state
              title
              number
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