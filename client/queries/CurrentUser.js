import gql from "graphql-tag";
// Import this query into the header component and instantly run the query whenever the header is rendered onto the screen
export default gql`
  {
    user {
      id
      email
    }
  }
`;
