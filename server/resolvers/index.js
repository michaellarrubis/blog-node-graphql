import { GraphQLDateTime } from "graphql-iso-date";
import Mutation from "./mutations";
import Query from "./query";

export default {
  Mutation,
  Query,
  Date: GraphQLDateTime,
};
