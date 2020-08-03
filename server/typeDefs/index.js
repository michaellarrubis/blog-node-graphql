import { gql } from "apollo-server-express";

import dateType from "./types/dateType";
import commentType from "./types/commentType";
import postType from "./types/postType";
import userType from "./types/userType";
import query from "./types/query";
import mutation from "./types/mutation";
import responsesType from "./types/responsesType";

const typeDefs = [
  dateType,
  commentType,
  postType,
  userType,
  query,
  mutation,
  responsesType,
];

export { typeDefs as default };
