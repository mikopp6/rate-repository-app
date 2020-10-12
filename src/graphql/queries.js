import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query ($id: ID!) {
    repository (id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query GET_AUTHORIZED_USER {
    authorizedUser {
      id
      username
    }
  }
`;

// other queries...