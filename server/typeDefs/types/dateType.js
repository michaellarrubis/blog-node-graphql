import { gql } from "apollo-server-express";

const dateType = gql`
  scalar Date
`;

export { dateType as default };
