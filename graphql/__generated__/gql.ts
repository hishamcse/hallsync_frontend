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
    "\n  query Departments {\n    departments {\n      deptCode\n      name\n      shortName\n    }\n  }\n": types.DepartmentsDocument,
    "\n  mutation Login($password: String!, $loginId: String!) {\n    login(password: $password, id: $loginId) {\n      student {\n        studentId\n        residencyStatus\n      }\n      token\n      authority {\n        authorityId\n        role\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query Applications($page : Float!, $filters: FilterInput, $sort : SortInput, $search : SearchInput) {\n    applications(page : $page, filters: $filters, sort : $sort, search : $search) {\n      applications {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n        }\n        seatChangeApplication {\n          seatChangeApplicationId\n        }\n        tempApplication {\n          applicationId\n        }\n      }\n      count\n    }\n  }\n": types.ApplicationsDocument,
    "\n  query Query {\n    applicationStatus{\n      status\n      select\n    }\n    applicationTypes\n    batches {\n      year\n    }\n    departments {\n      shortName\n    }\n    levelTerms {\n        label\n    }\n  }\n": types.QueryDocument,
    "\n  query Batches {\n    batches {\n      year\n    }\n  }\n": types.BatchesDocument,
    "\n  query ApplicationDetails($applicationId: Float!) {\n    applicationDetails(applicationId: $applicationId) {\n      applicationId\n      createdAt\n      lastUpdate\n      newApplication {\n        newApplicationId\n      }\n      student {\n        name\n        email\n        student9DigitId\n        department {\n          name\n          shortName\n        }\n        batch {\n          year\n        }\n        phone\n        levelTerm{\n          label\n        }\n      }\n    }\n  }\n": types.ApplicationDetailsDocument,
    "\n  query SelfInfo {\n    selfInfo {\n      student {\n        studentId\n        residencyStatus\n      }\n      authority {\n        authorityId\n        role\n      }\n      token\n    }\n  }\n": types.SelfInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Departments {\n    departments {\n      deptCode\n      name\n      shortName\n    }\n  }\n"): (typeof documents)["\n  query Departments {\n    departments {\n      deptCode\n      name\n      shortName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($password: String!, $loginId: String!) {\n    login(password: $password, id: $loginId) {\n      student {\n        studentId\n        residencyStatus\n      }\n      token\n      authority {\n        authorityId\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($password: String!, $loginId: String!) {\n    login(password: $password, id: $loginId) {\n      student {\n        studentId\n        residencyStatus\n      }\n      token\n      authority {\n        authorityId\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Applications($page : Float!, $filters: FilterInput, $sort : SortInput, $search : SearchInput) {\n    applications(page : $page, filters: $filters, sort : $sort, search : $search) {\n      applications {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n        }\n        seatChangeApplication {\n          seatChangeApplicationId\n        }\n        tempApplication {\n          applicationId\n        }\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query Applications($page : Float!, $filters: FilterInput, $sort : SortInput, $search : SearchInput) {\n    applications(page : $page, filters: $filters, sort : $sort, search : $search) {\n      applications {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n        }\n        seatChangeApplication {\n          seatChangeApplicationId\n        }\n        tempApplication {\n          applicationId\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    applicationStatus{\n      status\n      select\n    }\n    applicationTypes\n    batches {\n      year\n    }\n    departments {\n      shortName\n    }\n    levelTerms {\n        label\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    applicationStatus{\n      status\n      select\n    }\n    applicationTypes\n    batches {\n      year\n    }\n    departments {\n      shortName\n    }\n    levelTerms {\n        label\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Batches {\n    batches {\n      year\n    }\n  }\n"): (typeof documents)["\n  query Batches {\n    batches {\n      year\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ApplicationDetails($applicationId: Float!) {\n    applicationDetails(applicationId: $applicationId) {\n      applicationId\n      createdAt\n      lastUpdate\n      newApplication {\n        newApplicationId\n      }\n      student {\n        name\n        email\n        student9DigitId\n        department {\n          name\n          shortName\n        }\n        batch {\n          year\n        }\n        phone\n        levelTerm{\n          label\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ApplicationDetails($applicationId: Float!) {\n    applicationDetails(applicationId: $applicationId) {\n      applicationId\n      createdAt\n      lastUpdate\n      newApplication {\n        newApplicationId\n      }\n      student {\n        name\n        email\n        student9DigitId\n        department {\n          name\n          shortName\n        }\n        batch {\n          year\n        }\n        phone\n        levelTerm{\n          label\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SelfInfo {\n    selfInfo {\n      student {\n        studentId\n        residencyStatus\n      }\n      authority {\n        authorityId\n        role\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  query SelfInfo {\n    selfInfo {\n      student {\n        studentId\n        residencyStatus\n      }\n      authority {\n        authorityId\n        role\n      }\n      token\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;