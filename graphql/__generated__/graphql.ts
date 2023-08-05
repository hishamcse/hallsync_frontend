/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
};

export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Revise = 'REVISE'
}

export type AttachedFile = {
  __typename?: 'AttachedFile';
  application: SeatApplication;
  applicationId: Scalars['Float']['output'];
  uploadedFile: UploadedFile;
  uploadedFileId: Scalars['Float']['output'];
};

export type Authority = {
  __typename?: 'Authority';
  authorityId: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: AuthorityRole;
};

export enum AuthorityRole {
  AssistantProvost = 'ASSISTANT_PROVOST',
  DiningStuff = 'DINING_STUFF',
  Provost = 'PROVOST'
}

export type Batch = {
  __typename?: 'Batch';
  batchId: Scalars['Float']['output'];
  students: Array<Student>;
  year: Scalars['String']['output'];
};

export type CupCount = {
  __typename?: 'CupCount';
  cupcount: Scalars['Float']['output'];
  item: Item;
  itemId: Scalars['Float']['output'];
  mealPlan: MealPlan;
  mealPlanId: Scalars['Float']['output'];
};

export type Department = {
  __typename?: 'Department';
  departmentId: Scalars['Float']['output'];
  deptCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  students: Array<Student>;
};

export type FilterInput = {
  batch: Array<Scalars['String']['input']>;
  dept: Array<Scalars['String']['input']>;
  lt: Array<Scalars['String']['input']>;
  status: Array<Scalars['String']['input']>;
  type: Array<Scalars['String']['input']>;
};

export type Floor = {
  __typename?: 'Floor';
  floorId: Scalars['Float']['output'];
  floorNo: Scalars['Float']['output'];
  roomLabelLen: Scalars['Float']['output'];
  rooms: Array<Room>;
};

export type IntArray = {
  array: Array<Scalars['Float']['input']>;
};

export type Item = {
  __typename?: 'Item';
  cupCounts: Array<CupCount>;
  itemId: Scalars['Float']['output'];
  meals: Array<Meal>;
  name: Scalars['String']['output'];
  photo: Photo;
  photoId: Scalars['Float']['output'];
  type: ItemType;
};

export enum ItemType {
  NonVeg = 'NON_VEG',
  Rice = 'RICE',
  Veg = 'VEG'
}

export type LevelTerm = {
  __typename?: 'LevelTerm';
  label: Scalars['String']['output'];
  levelTermId: Scalars['Float']['output'];
  students: Array<Student>;
};

export type Meal = {
  __typename?: 'Meal';
  createdAt: Scalars['DateTime']['output'];
  items: Array<Item>;
  mealId: Scalars['Float']['output'];
  mealPlans: Array<MealPlan>;
};

export type MealPlan = {
  __typename?: 'MealPlan';
  cupCount: Array<CupCount>;
  day: Scalars['DateTime']['output'];
  meal: Meal;
  mealId: Scalars['Float']['output'];
  mealPlanId: Scalars['Float']['output'];
  mealTime: MealTime;
  optedOut: Array<Student>;
  preferences: Array<Preference>;
};

export enum MealTime {
  Dinner = 'DINNER',
  Lunch = 'LUNCH'
}

export type Mutation = {
  __typename?: 'Mutation';
  addNewMealItem: CupCount;
  addOldMealItem: CupCount;
  approveNewApplication: Residency;
  approveSeatChangeApplication: Residency;
  approveTempSeatApplication: TempResidency;
  login: UserWithToken;
  newSeatApplication: NewApplication;
  rejectApplication: SeatApplication;
  reviseApplication: Revision;
  seatChangeApplication: SeatChangeApplication;
  tempSeatApplication: TempApplication;
  vote: Vote;
};


export type MutationAddNewMealItemArgs = {
  cupCount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  photoLocation: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationAddOldMealItemArgs = {
  cupCount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationApproveNewApplicationArgs = {
  newApplicationId: Scalars['Float']['input'];
  seatId: Scalars['Float']['input'];
};


export type MutationApproveSeatChangeApplicationArgs = {
  seatChangeApplicationId: Scalars['Float']['input'];
  seatId: Scalars['Float']['input'];
};


export type MutationApproveTempSeatApplicationArgs = {
  applicationId: Scalars['Float']['input'];
  days: Scalars['Float']['input'];
  from: Scalars['String']['input'];
  seatId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNewSeatApplicationArgs = {
  attachedFileIds: IntArray;
  q1: Scalars['Boolean']['input'];
  q2: Scalars['Boolean']['input'];
};


export type MutationRejectApplicationArgs = {
  applicationId: Scalars['Float']['input'];
};


export type MutationReviseApplicationArgs = {
  applicationId: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
};


export type MutationSeatChangeApplicationArgs = {
  reason: Scalars['String']['input'];
  seatId: Scalars['Float']['input'];
};


export type MutationTempSeatApplicationArgs = {
  days: Scalars['Float']['input'];
  from: Scalars['String']['input'];
  prefSeatId: Scalars['Float']['input'];
  q1: Scalars['Boolean']['input'];
  q2: Scalars['Boolean']['input'];
};


export type MutationVoteArgs = {
  reason: Scalars['String']['input'];
  vote: Scalars['String']['input'];
  voteId: Scalars['Float']['input'];
};

export type NewApplication = {
  __typename?: 'NewApplication';
  application: SeatApplication;
  applicationId: Scalars['Float']['output'];
  newApplicationId: Scalars['Float']['output'];
  questionnaire: NewSeatQuestionnaire;
  questionnaireId: Scalars['Float']['output'];
};

export type NewSeatQuestionnaire = {
  __typename?: 'NewSeatQuestionnaire';
  application: NewApplication;
  q1: Scalars['Boolean']['output'];
  q2: Scalars['Boolean']['output'];
  questionnaireId: Scalars['Float']['output'];
};

export type Photo = {
  __typename?: 'Photo';
  filePath: Scalars['String']['output'];
  photoId: Scalars['Float']['output'];
};

export type Preference = {
  __typename?: 'Preference';
  item: Item;
  itemId: Scalars['Float']['output'];
  mealPlan: MealPlan;
  mealPlanId: Scalars['Float']['output'];
  order: Scalars['Float']['output'];
  student: Student;
  studentId: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  applicationDetails: SeatApplication;
  applicationStatus: Array<StatusWithDefaultSelect>;
  applicationTypes: Array<Scalars['String']['output']>;
  applications: SeatApplicationsWithCount;
  batches: Array<Batch>;
  departments: Array<Department>;
  freeFloors: Array<Floor>;
  freeRoomInFloor: Array<Room>;
  freeSeat: Seat;
  freeSeatInRoom: Array<Seat>;
  levelTerms: Array<LevelTerm>;
  myapplications: Array<SeatApplication>;
  pendingVotes: Array<Vote>;
  selfInfo: UserWithToken;
  test: Scalars['String']['output'];
};


export type QueryApplicationDetailsArgs = {
  applicationId: Scalars['Float']['input'];
};


export type QueryApplicationsArgs = {
  filters?: InputMaybe<FilterInput>;
  page: Scalars['Float']['input'];
  search?: InputMaybe<SearchInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryFreeRoomInFloorArgs = {
  floorNo: Scalars['Float']['input'];
};


export type QueryFreeSeatInRoomArgs = {
  floorNo: Scalars['Float']['input'];
  roomNo: Scalars['Float']['input'];
};

export type Residency = {
  __typename?: 'Residency';
  from: Scalars['DateTime']['output'];
  residencyId: Scalars['Float']['output'];
  seat: Seat;
  seatId: Scalars['Float']['output'];
  student: Student;
  studentId: Scalars['Float']['output'];
};

export enum ResidencyStatus {
  Attached = 'ATTACHED',
  Resident = 'RESIDENT',
  TempResident = 'TEMP_RESIDENT'
}

export type Revision = {
  __typename?: 'Revision';
  application: SeatApplication;
  applicationId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
  revisionId: Scalars['Float']['output'];
};

export type Room = {
  __typename?: 'Room';
  floor: Floor;
  floorId: Scalars['Float']['output'];
  roomId: Scalars['Float']['output'];
  roomNo: Scalars['Float']['output'];
  seats: Array<Seat>;
};

export type SearchInput = {
  searchBy?: InputMaybe<Scalars['String']['input']>;
};

export type Seat = {
  __typename?: 'Seat';
  residency?: Maybe<Residency>;
  room: Room;
  roomId: Scalars['Float']['output'];
  seatId: Scalars['Float']['output'];
  seatLabel: Scalars['String']['output'];
};

export type SeatApplication = {
  __typename?: 'SeatApplication';
  applicationId: Scalars['Float']['output'];
  attachedFiles?: Maybe<Array<AttachedFile>>;
  createdAt: Scalars['DateTime']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  newApplication?: Maybe<NewApplication>;
  seatChangeApplication?: Maybe<SeatChangeApplication>;
  status: ApplicationStatus;
  student: Student;
  studentId: Scalars['Float']['output'];
  tempApplication?: Maybe<TempApplication>;
};

export type SeatApplicationsWithCount = {
  __typename?: 'SeatApplicationsWithCount';
  applications: Array<SeatApplication>;
  count: Scalars['Float']['output'];
};

export type SeatChangeApplication = {
  __typename?: 'SeatChangeApplication';
  application: SeatApplication;
  applicationId: Scalars['Float']['output'];
  reason: Scalars['String']['output'];
  seatChangeApplicationId: Scalars['Float']['output'];
  toSeat: Seat;
  toSeatId: Scalars['Float']['output'];
  votes: Array<Vote>;
};

export type SortInput = {
  order?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};

export type StatusWithDefaultSelect = {
  __typename?: 'StatusWithDefaultSelect';
  select: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
};

export type Student = {
  __typename?: 'Student';
  applications: Array<SeatApplication>;
  batch: Batch;
  batchId: Scalars['Float']['output'];
  department: Department;
  departmentId: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  levelTerm: LevelTerm;
  levelTermId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  residency?: Maybe<Residency>;
  residencyStatus: ResidencyStatus;
  student9DigitId: Scalars['String']['output'];
  studentId: Scalars['Float']['output'];
  tempResidencyHistory: Array<TempResidencyHistory>;
};

export type TempApplication = {
  __typename?: 'TempApplication';
  application: SeatApplication;
  applicationId: Scalars['Float']['output'];
  days: Scalars['Float']['output'];
  fromTime: Scalars['DateTime']['output'];
  prefRoom: Room;
  prefRoomId: Scalars['Float']['output'];
  questionnaire: TempQuestionnaire;
  questionnaireId: Scalars['Float']['output'];
};

export type TempQuestionnaire = {
  __typename?: 'TempQuestionnaire';
  application: TempApplication;
  questionnaireId: Scalars['Float']['output'];
};

export type TempResidency = {
  __typename?: 'TempResidency';
  days: Scalars['Float']['output'];
  from: Scalars['DateTime']['output'];
  residencyId: Scalars['Float']['output'];
  seat: Seat;
  seatId: Scalars['Float']['output'];
  studentId: Scalars['Float']['output'];
};

export type TempResidencyHistory = {
  __typename?: 'TempResidencyHistory';
  from: Scalars['DateTime']['output'];
  seat: Seat;
  seatId: Scalars['Float']['output'];
  studentId: Scalars['Float']['output'];
  tempResidencyHistoryId: Scalars['Float']['output'];
  to: Scalars['DateTime']['output'];
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  student: Student;
  studentId: Scalars['Float']['output'];
  uploadedFileId: Scalars['Float']['output'];
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  authority?: Maybe<Authority>;
  student?: Maybe<Student>;
  token: Scalars['String']['output'];
};

export type Vote = {
  __typename?: 'Vote';
  lastUpdated: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
  roomChangeApplication: SeatChangeApplication;
  seatChangeApplication: SeatChangeApplication;
  seatChangeApplicationId: Scalars['Float']['output'];
  status: VoteStatus;
  student: Student;
  studentId: Scalars['Float']['output'];
  voteId: Scalars['Float']['output'];
};

export enum VoteStatus {
  No = 'NO',
  NotVoted = 'NOT_VOTED',
  Yes = 'YES'
}

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', deptCode: string, name: string, shortName: string }> };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  loginId: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', studentId: number, residencyStatus: ResidencyStatus, residency?: { __typename?: 'Residency', seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };

export type ApplicationsQueryVariables = Exact<{
  page: Scalars['Float']['input'];
  filters?: InputMaybe<FilterInput>;
  sort?: InputMaybe<SortInput>;
  search?: InputMaybe<SearchInput>;
}>;


export type ApplicationsQuery = { __typename?: 'Query', applications: { __typename?: 'SeatApplicationsWithCount', count: number, applications: Array<{ __typename?: 'SeatApplication', applicationId: number, createdAt: any, lastUpdate: any, status: ApplicationStatus, student: { __typename?: 'Student', student9DigitId: string, name: string, residencyStatus: ResidencyStatus, studentId: number, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string } }, newApplication?: { __typename?: 'NewApplication', newApplicationId: number } | null, seatChangeApplication?: { __typename?: 'SeatChangeApplication', seatChangeApplicationId: number } | null, tempApplication?: { __typename?: 'TempApplication', applicationId: number } | null }> } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', applicationTypes: Array<string>, applicationStatus: Array<{ __typename?: 'StatusWithDefaultSelect', status: string, select: boolean }>, batches: Array<{ __typename?: 'Batch', year: string }>, departments: Array<{ __typename?: 'Department', shortName: string }>, levelTerms: Array<{ __typename?: 'LevelTerm', label: string }> };

export type BatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type BatchesQuery = { __typename?: 'Query', batches: Array<{ __typename?: 'Batch', year: string }> };

export type ApplicationDetailsQueryVariables = Exact<{
  applicationId: Scalars['Float']['input'];
}>;


export type ApplicationDetailsQuery = { __typename?: 'Query', applicationDetails: { __typename?: 'SeatApplication', applicationId: number, createdAt: any, lastUpdate: any, status: ApplicationStatus, attachedFiles?: Array<{ __typename?: 'AttachedFile', uploadedFile: { __typename?: 'UploadedFile', fileName: string, uploadedFileId: number } }> | null, student: { __typename?: 'Student', student9DigitId: string, name: string, residencyStatus: ResidencyStatus, studentId: number, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string } }, newApplication?: { __typename?: 'NewApplication', newApplicationId: number, questionnaire: { __typename?: 'NewSeatQuestionnaire', q1: boolean, q2: boolean, questionnaireId: number } } | null, tempApplication?: { __typename?: 'TempApplication', days: number, fromTime: any, prefRoomId: number, applicationId: number, questionnaire: { __typename?: 'TempQuestionnaire', questionnaireId: number }, prefRoom: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } | null, seatChangeApplication?: { __typename?: 'SeatChangeApplication', reason: string, seatChangeApplicationId: number, toSeat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } };

export type SelfInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfInfoQuery = { __typename?: 'Query', selfInfo: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', studentId: number, residencyStatus: ResidencyStatus, residency?: { __typename?: 'Residency', seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };

export type MyapplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyapplicationsQuery = { __typename?: 'Query', myapplications: Array<{ __typename?: 'SeatApplication', applicationId: number, createdAt: any, lastUpdate: any, status: ApplicationStatus, student: { __typename?: 'Student', student9DigitId: string, name: string, residencyStatus: ResidencyStatus, studentId: number, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string } }, newApplication?: { __typename?: 'NewApplication', newApplicationId: number } | null, seatChangeApplication?: { __typename?: 'SeatChangeApplication', seatChangeApplicationId: number } | null, tempApplication?: { __typename?: 'TempApplication', applicationId: number } | null }> };

export type NewSeatApplicationMutationVariables = Exact<{
  attachedFileIds: IntArray;
  q2: Scalars['Boolean']['input'];
  q1: Scalars['Boolean']['input'];
}>;


export type NewSeatApplicationMutation = { __typename?: 'Mutation', newSeatApplication: { __typename?: 'NewApplication', applicationId: number, application: { __typename?: 'SeatApplication', createdAt: any } } };

export type TempSeatApplicationMutationVariables = Exact<{
  from: Scalars['String']['input'];
  days: Scalars['Float']['input'];
  prefSeatId: Scalars['Float']['input'];
  q2: Scalars['Boolean']['input'];
  q1: Scalars['Boolean']['input'];
}>;


export type TempSeatApplicationMutation = { __typename?: 'Mutation', tempSeatApplication: { __typename?: 'TempApplication', applicationId: number, application: { __typename?: 'SeatApplication', createdAt: any, tempApplication?: { __typename?: 'TempApplication', days: number, applicationId: number } | null } } };

export type SeatChangeApplicationMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  seatId: Scalars['Float']['input'];
}>;


export type SeatChangeApplicationMutation = { __typename?: 'Mutation', seatChangeApplication: { __typename?: 'SeatChangeApplication', applicationId: number, seatChangeApplicationId: number, application: { __typename?: 'SeatApplication', createdAt: any, seatChangeApplication?: { __typename?: 'SeatChangeApplication', reason: string } | null } } };

export type FreeFloorsQueryVariables = Exact<{ [key: string]: never; }>;


export type FreeFloorsQuery = { __typename?: 'Query', freeFloors: Array<{ __typename?: 'Floor', floorId: number, floorNo: number }> };

export type FreeRoomInFloorQueryVariables = Exact<{
  floorNo: Scalars['Float']['input'];
}>;


export type FreeRoomInFloorQuery = { __typename?: 'Query', freeRoomInFloor: Array<{ __typename?: 'Room', roomNo: number, roomId: number }> };

export type FreeSeatInRoomQueryVariables = Exact<{
  floorNo: Scalars['Float']['input'];
  roomNo: Scalars['Float']['input'];
}>;


export type FreeSeatInRoomQuery = { __typename?: 'Query', freeSeatInRoom: Array<{ __typename?: 'Seat', seatId: number, seatLabel: string }> };

export type FreeSeatQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type FreeSeatQueryQuery = { __typename?: 'Query', freeSeat: { __typename?: 'Seat', seatId: number, seatLabel: string, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number } } } };

export type MutationMutationVariables = Exact<{
  seatId: Scalars['Float']['input'];
  newApplicationId: Scalars['Float']['input'];
}>;


export type MutationMutation = { __typename?: 'Mutation', approveNewApplication: { __typename?: 'Residency', residencyId: number } };


export const DepartmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deptCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<DepartmentsQuery, DepartmentsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Applications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ApplicationsQuery, ApplicationsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"select"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const BatchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<BatchesQuery, BatchesQueryVariables>;
export const ApplicationDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ApplicationDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attachedFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadedFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"q1"}},{"kind":"Field","name":{"kind":"Name","value":"q2"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaireId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionnaireId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prefRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"fromTime"}},{"kind":"Field","name":{"kind":"Name","value":"prefRoomId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"toSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ApplicationDetailsQuery, ApplicationDetailsQueryVariables>;
export const SelfInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelfInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selfInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SelfInfoQuery, SelfInfoQueryVariables>;
export const MyapplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Myapplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myapplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]}}]} as unknown as DocumentNode<MyapplicationsQuery, MyapplicationsQueryVariables>;
export const NewSeatApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewSeatApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attachedFileIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntArray"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newSeatApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attachedFileIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attachedFileIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"q2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q2"}}},{"kind":"Argument","name":{"kind":"Name","value":"q1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q1"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]} as unknown as DocumentNode<NewSeatApplicationMutation, NewSeatApplicationMutationVariables>;
export const TempSeatApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TempSeatApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"days"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefSeatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tempSeatApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"days"},"value":{"kind":"Variable","name":{"kind":"Name","value":"days"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefSeatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefSeatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"q2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q2"}}},{"kind":"Argument","name":{"kind":"Name","value":"q1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q1"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TempSeatApplicationMutation, TempSeatApplicationMutationVariables>;
export const SeatChangeApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeatChangeApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}},{"kind":"Argument","name":{"kind":"Name","value":"seatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeatChangeApplicationMutation, SeatChangeApplicationMutationVariables>;
export const FreeFloorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeFloors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeFloors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorId"}},{"kind":"Field","name":{"kind":"Name","value":"floorNo"}}]}}]}}]} as unknown as DocumentNode<FreeFloorsQuery, FreeFloorsQueryVariables>;
export const FreeRoomInFloorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeRoomInFloor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeRoomInFloor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"floorNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]} as unknown as DocumentNode<FreeRoomInFloorQuery, FreeRoomInFloorQueryVariables>;
export const FreeSeatInRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeSeatInRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeSeatInRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"floorNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"roomNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatId"}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}}]} as unknown as DocumentNode<FreeSeatInRoomQuery, FreeSeatInRoomQueryVariables>;
export const FreeSeatQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeSeatQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}}]} as unknown as DocumentNode<FreeSeatQueryQuery, FreeSeatQueryQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newApplicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveNewApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newApplicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newApplicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"residencyId"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;