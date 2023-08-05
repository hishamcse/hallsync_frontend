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
    "\n  mutation Login($password: String!, $loginId: String!) {\n    login(password: $password, id: $loginId) {\n      student {\n        studentId\n        residencyStatus\n        residency {\n            seat {\n              room {\n                roomNo\n                floor {\n                  floorNo\n                  roomLabelLen\n                }\n              }\n            }\n        }\n      }\n      token\n      authority {\n        authorityId\n        role\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query Applications($page : Float!, $filters: FilterInput, $sort : SortInput, $search : SearchInput) {\n    applications(page : $page, filters: $filters, sort : $sort, search : $search) {\n      applications {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n        }\n        seatChangeApplication {\n          seatChangeApplicationId\n        }\n        tempApplication {\n          applicationId\n        }\n      }\n      count\n    }\n  }\n": types.ApplicationsDocument,
    "\n  query Query {\n    applicationStatus{\n      status\n      select\n    }\n    applicationTypes\n    batches {\n      year\n    }\n    departments {\n      shortName\n    }\n    levelTerms {\n        label\n    }\n  }\n": types.QueryDocument,
    "\n  query Batches {\n    batches {\n      year\n    }\n  }\n": types.BatchesDocument,
    "\n  query ApplicationDetails($applicationId: Float!) {\n      applicationDetails(applicationId: $applicationId) {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        attachedFiles {\n          uploadedFile {\n            fileName\n            uploadedFileId\n          }\n        }\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n          questionnaire {\n            q1\n            q2\n            questionnaireId\n          }\n        }\n        \n        seatChangeApplication {\n          reason\n          seatChangeApplicationId\n          toSeat {\n            seatLabel\n            room {\n              floor {\n                floorNo\n                roomLabelLen\n              }\n              roomNo\n            }\n          }\n        }\n        tempApplication {\n          from\n          days\n          prefSeat {\n            seatLabel\n            room {\n              roomNo\n              floor {\n                floorNo\n              }\n            }\n          }\n        }\n      }\n   }\n": types.ApplicationDetailsDocument,
    "\n  query SelfInfo {\n    selfInfo {\n      student {\n        studentId\n        residencyStatus\n        residency {\n            seat {\n              room {\n                roomNo\n                floor {\n                  floorNo\n                  roomLabelLen\n                }\n              }\n            }\n        }\n      }\n      authority {\n        authorityId\n        role\n      }\n      token\n    }\n  }\n": types.SelfInfoDocument,
    "\n  query Myapplications {\n  myapplications {\n    applicationId\n    createdAt\n    lastUpdate\n    status\n    student {\n      student9DigitId\n      batch {\n        year\n      }\n      department {\n        shortName\n      }\n      levelTerm {\n        label\n      }\n      name\n      residencyStatus\n      studentId\n    }\n    newApplication {\n      newApplicationId\n    }\n    seatChangeApplication {\n      seatChangeApplicationId\n    }\n    tempApplication {\n      applicationId\n    }\n  }\n}\n\n": types.MyapplicationsDocument,
    "\n    mutation NewSeatApplication($attachedFileIds: IntArray!, $q2: Boolean!, $q1: Boolean!) {\n         newSeatApplication(attachedFileIds: $attachedFileIds, q2: $q2, q1: $q1) {\n            application {\n                createdAt\n            }\n            applicationId\n        }\n    }\n": types.NewSeatApplicationDocument,
    "\n    mutation TempSeatApplication($from: String!, $days: Float!, $prefSeatId: Float!, $q2: Boolean!, $q1: Boolean!) {\n      tempSeatApplication(from: $from, days: $days, prefSeatId: $prefSeatId, q2: $q2, q1: $q1) {\n        applicationId\n        application {\n          createdAt\n          tempApplication {\n            days\n            applicationId\n          }\n        }\n      }\n    }\n": types.TempSeatApplicationDocument,
    "\n    mutation SeatChangeApplication($reason: String!, $seatId: Float!) {\n      seatChangeApplication(reason: $reason, seatId: $seatId) {\n        applicationId\n        seatChangeApplicationId\n        application {\n          createdAt\n          seatChangeApplication {\n            reason\n          }\n        }\n      }\n    }\n": types.SeatChangeApplicationDocument,
    "\n  query FreeFloors {\n    freeFloors {\n      floorId\n      floorNo\n    }\n  }\n": types.FreeFloorsDocument,
    "\n  query FreeRoomInFloor($floorNo: Float!) {\n    freeRoomInFloor(floorNo: $floorNo) {\n      roomNo\n      roomId\n    }\n  }\n": types.FreeRoomInFloorDocument,
    "\n  query FreeSeatInRoom($floorNo:Float!, $roomNo: Float!) {\n    freeSeatInRoom(floorNo:$floorNo,roomNo: $roomNo) {\n      seatId\n      seatLabel\n    }\n  }\n": types.FreeSeatInRoomDocument,
    "\n  query FreeSeatQuery {\n    freeSeat {\n      seatId\n      room {\n        roomNo\n        floor {\n          floorNo\n        }\n      }\n      seatLabel\n    }\n  }\n": types.FreeSeatQueryDocument,
    "\n\nmutation Mutation($seatId: Float!, $newApplicationId: Float!) {\n  approveNewApplication(seatId: $seatId, newApplicationId: $newApplicationId) {\n    residencyId\n  }\n}": types.MutationDocument,
    "\n  mutation RejectApplication($applicationId: Float!) {\n    rejectApplication(applicationId: $applicationId) {\n      applicationId\n    }\n  }\n": types.RejectApplicationDocument,
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
export function graphql(source: "\n  mutation Login($password: String!, $loginId: String!) {\n    login(password: $password, id: $loginId) {\n      student {\n        studentId\n        residencyStatus\n        residency {\n            seat {\n              room {\n                roomNo\n                floor {\n                  floorNo\n                  roomLabelLen\n                }\n              }\n            }\n        }\n      }\n      token\n      authority {\n        authorityId\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($password: String!, $loginId: String!) {\n    login(password: $password, id: $loginId) {\n      student {\n        studentId\n        residencyStatus\n        residency {\n            seat {\n              room {\n                roomNo\n                floor {\n                  floorNo\n                  roomLabelLen\n                }\n              }\n            }\n        }\n      }\n      token\n      authority {\n        authorityId\n        role\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query ApplicationDetails($applicationId: Float!) {\n      applicationDetails(applicationId: $applicationId) {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        attachedFiles {\n          uploadedFile {\n            fileName\n            uploadedFileId\n          }\n        }\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n          questionnaire {\n            q1\n            q2\n            questionnaireId\n          }\n        }\n        \n        seatChangeApplication {\n          reason\n          seatChangeApplicationId\n          toSeat {\n            seatLabel\n            room {\n              floor {\n                floorNo\n                roomLabelLen\n              }\n              roomNo\n            }\n          }\n        }\n        tempApplication {\n          from\n          days\n          prefSeat {\n            seatLabel\n            room {\n              roomNo\n              floor {\n                floorNo\n              }\n            }\n          }\n        }\n      }\n   }\n"): (typeof documents)["\n  query ApplicationDetails($applicationId: Float!) {\n      applicationDetails(applicationId: $applicationId) {\n        applicationId\n        createdAt\n        lastUpdate\n        status\n        attachedFiles {\n          uploadedFile {\n            fileName\n            uploadedFileId\n          }\n        }\n        student {\n          student9DigitId\n          batch {\n            year\n          }\n          department {\n            shortName\n          }\n          levelTerm {\n            label\n          }\n          name\n          residencyStatus\n          studentId\n        }\n        newApplication {\n          newApplicationId\n          questionnaire {\n            q1\n            q2\n            questionnaireId\n          }\n        }\n        \n        seatChangeApplication {\n          reason\n          seatChangeApplicationId\n          toSeat {\n            seatLabel\n            room {\n              floor {\n                floorNo\n                roomLabelLen\n              }\n              roomNo\n            }\n          }\n        }\n        tempApplication {\n          from\n          days\n          prefSeat {\n            seatLabel\n            room {\n              roomNo\n              floor {\n                floorNo\n              }\n            }\n          }\n        }\n      }\n   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SelfInfo {\n    selfInfo {\n      student {\n        studentId\n        residencyStatus\n        residency {\n            seat {\n              room {\n                roomNo\n                floor {\n                  floorNo\n                  roomLabelLen\n                }\n              }\n            }\n        }\n      }\n      authority {\n        authorityId\n        role\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  query SelfInfo {\n    selfInfo {\n      student {\n        studentId\n        residencyStatus\n        residency {\n            seat {\n              room {\n                roomNo\n                floor {\n                  floorNo\n                  roomLabelLen\n                }\n              }\n            }\n        }\n      }\n      authority {\n        authorityId\n        role\n      }\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Myapplications {\n  myapplications {\n    applicationId\n    createdAt\n    lastUpdate\n    status\n    student {\n      student9DigitId\n      batch {\n        year\n      }\n      department {\n        shortName\n      }\n      levelTerm {\n        label\n      }\n      name\n      residencyStatus\n      studentId\n    }\n    newApplication {\n      newApplicationId\n    }\n    seatChangeApplication {\n      seatChangeApplicationId\n    }\n    tempApplication {\n      applicationId\n    }\n  }\n}\n\n"): (typeof documents)["\n  query Myapplications {\n  myapplications {\n    applicationId\n    createdAt\n    lastUpdate\n    status\n    student {\n      student9DigitId\n      batch {\n        year\n      }\n      department {\n        shortName\n      }\n      levelTerm {\n        label\n      }\n      name\n      residencyStatus\n      studentId\n    }\n    newApplication {\n      newApplicationId\n    }\n    seatChangeApplication {\n      seatChangeApplicationId\n    }\n    tempApplication {\n      applicationId\n    }\n  }\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation NewSeatApplication($attachedFileIds: IntArray!, $q2: Boolean!, $q1: Boolean!) {\n         newSeatApplication(attachedFileIds: $attachedFileIds, q2: $q2, q1: $q1) {\n            application {\n                createdAt\n            }\n            applicationId\n        }\n    }\n"): (typeof documents)["\n    mutation NewSeatApplication($attachedFileIds: IntArray!, $q2: Boolean!, $q1: Boolean!) {\n         newSeatApplication(attachedFileIds: $attachedFileIds, q2: $q2, q1: $q1) {\n            application {\n                createdAt\n            }\n            applicationId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation TempSeatApplication($from: String!, $days: Float!, $prefSeatId: Float!, $q2: Boolean!, $q1: Boolean!) {\n      tempSeatApplication(from: $from, days: $days, prefSeatId: $prefSeatId, q2: $q2, q1: $q1) {\n        applicationId\n        application {\n          createdAt\n          tempApplication {\n            days\n            applicationId\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation TempSeatApplication($from: String!, $days: Float!, $prefSeatId: Float!, $q2: Boolean!, $q1: Boolean!) {\n      tempSeatApplication(from: $from, days: $days, prefSeatId: $prefSeatId, q2: $q2, q1: $q1) {\n        applicationId\n        application {\n          createdAt\n          tempApplication {\n            days\n            applicationId\n          }\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SeatChangeApplication($reason: String!, $seatId: Float!) {\n      seatChangeApplication(reason: $reason, seatId: $seatId) {\n        applicationId\n        seatChangeApplicationId\n        application {\n          createdAt\n          seatChangeApplication {\n            reason\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation SeatChangeApplication($reason: String!, $seatId: Float!) {\n      seatChangeApplication(reason: $reason, seatId: $seatId) {\n        applicationId\n        seatChangeApplicationId\n        application {\n          createdAt\n          seatChangeApplication {\n            reason\n          }\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FreeFloors {\n    freeFloors {\n      floorId\n      floorNo\n    }\n  }\n"): (typeof documents)["\n  query FreeFloors {\n    freeFloors {\n      floorId\n      floorNo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FreeRoomInFloor($floorNo: Float!) {\n    freeRoomInFloor(floorNo: $floorNo) {\n      roomNo\n      roomId\n    }\n  }\n"): (typeof documents)["\n  query FreeRoomInFloor($floorNo: Float!) {\n    freeRoomInFloor(floorNo: $floorNo) {\n      roomNo\n      roomId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FreeSeatInRoom($floorNo:Float!, $roomNo: Float!) {\n    freeSeatInRoom(floorNo:$floorNo,roomNo: $roomNo) {\n      seatId\n      seatLabel\n    }\n  }\n"): (typeof documents)["\n  query FreeSeatInRoom($floorNo:Float!, $roomNo: Float!) {\n    freeSeatInRoom(floorNo:$floorNo,roomNo: $roomNo) {\n      seatId\n      seatLabel\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FreeSeatQuery {\n    freeSeat {\n      seatId\n      room {\n        roomNo\n        floor {\n          floorNo\n        }\n      }\n      seatLabel\n    }\n  }\n"): (typeof documents)["\n  query FreeSeatQuery {\n    freeSeat {\n      seatId\n      room {\n        roomNo\n        floor {\n          floorNo\n        }\n      }\n      seatLabel\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\nmutation Mutation($seatId: Float!, $newApplicationId: Float!) {\n  approveNewApplication(seatId: $seatId, newApplicationId: $newApplicationId) {\n    residencyId\n  }\n}"): (typeof documents)["\n\nmutation Mutation($seatId: Float!, $newApplicationId: Float!) {\n  approveNewApplication(seatId: $seatId, newApplicationId: $newApplicationId) {\n    residencyId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RejectApplication($applicationId: Float!) {\n    rejectApplication(applicationId: $applicationId) {\n      applicationId\n    }\n  }\n"): (typeof documents)["\n  mutation RejectApplication($applicationId: Float!) {\n    rejectApplication(applicationId: $applicationId) {\n      applicationId\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;