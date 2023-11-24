/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query CompletedMatch($match_key: String!) {\n    match(key: $match_key) {\n      key\n      status\n      teams {\n        a {\n          code\n          name\n        }\n        b {\n          code\n          name\n        }\n      }\n      winner {\n        name\n        code\n      }\n      play {\n        result {\n          msg\n        }\n        innings {\n          score {\n            runs\n          }\n          wickets\n          overs\n        }\n      }\n    }\n  }\n": types.CompletedMatchDocument,
    "\n  query MatchCompltedData($match_key: String!) {\n    match(key: $match_key) {\n      key\n      startAt\n      status\n      teams {\n        a {\n          code\n          name\n        }\n        b {\n          code\n          name\n        }\n      }\n      tournament {\n        name\n      }\n      winner {\n        name\n        code\n      }\n    }\n  }\n": types.MatchCompltedDataDocument,
    "\n  query CreditQuery($match_key: String!) {\n    fantasy_match_credits(key: $match_key) {\n      teams {\n        key\n        code\n        name\n      }\n      players {\n        key\n        name\n        team {\n          code\n          key\n          name\n        }\n        seasonalRole\n      }\n      credits {\n        player {\n          key\n        }\n        tournamentPoints\n        value\n      }\n    }\n  }\n": types.CreditQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CompletedMatch($match_key: String!) {\n    match(key: $match_key) {\n      key\n      status\n      teams {\n        a {\n          code\n          name\n        }\n        b {\n          code\n          name\n        }\n      }\n      winner {\n        name\n        code\n      }\n      play {\n        result {\n          msg\n        }\n        innings {\n          score {\n            runs\n          }\n          wickets\n          overs\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompletedMatch($match_key: String!) {\n    match(key: $match_key) {\n      key\n      status\n      teams {\n        a {\n          code\n          name\n        }\n        b {\n          code\n          name\n        }\n      }\n      winner {\n        name\n        code\n      }\n      play {\n        result {\n          msg\n        }\n        innings {\n          score {\n            runs\n          }\n          wickets\n          overs\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MatchCompltedData($match_key: String!) {\n    match(key: $match_key) {\n      key\n      startAt\n      status\n      teams {\n        a {\n          code\n          name\n        }\n        b {\n          code\n          name\n        }\n      }\n      tournament {\n        name\n      }\n      winner {\n        name\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  query MatchCompltedData($match_key: String!) {\n    match(key: $match_key) {\n      key\n      startAt\n      status\n      teams {\n        a {\n          code\n          name\n        }\n        b {\n          code\n          name\n        }\n      }\n      tournament {\n        name\n      }\n      winner {\n        name\n        code\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreditQuery($match_key: String!) {\n    fantasy_match_credits(key: $match_key) {\n      teams {\n        key\n        code\n        name\n      }\n      players {\n        key\n        name\n        team {\n          code\n          key\n          name\n        }\n        seasonalRole\n      }\n      credits {\n        player {\n          key\n        }\n        tournamentPoints\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query CreditQuery($match_key: String!) {\n    fantasy_match_credits(key: $match_key) {\n      teams {\n        key\n        code\n        name\n      }\n      players {\n        key\n        name\n        team {\n          code\n          key\n          name\n        }\n        seasonalRole\n      }\n      credits {\n        player {\n          key\n        }\n        tournamentPoints\n        value\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;