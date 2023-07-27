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

export type AttachedFiles = {
  __typename?: 'AttachedFiles';
  application: NewApplication;
  fileId: Scalars['Float']['output'];
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  newApplicationId: Scalars['Float']['output'];
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

export type Floor = {
  __typename?: 'Floor';
  floorId: Scalars['Float']['output'];
  floorNo: Scalars['Float']['output'];
  roomLabelLen: Scalars['Float']['output'];
  rooms: Array<Room>;
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
  login: UserWithToken;
  newSeatApplication: NewApplication;
  roomChangeApplication: RoomChangeApplication;
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


export type MutationLoginArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNewSeatApplicationArgs = {
  attachedFileIds: Scalars['String']['input'];
  q1: Scalars['Boolean']['input'];
  q2: Scalars['Boolean']['input'];
};


export type MutationRoomChangeApplicationArgs = {
  reason: Scalars['String']['input'];
  roomId: Scalars['Float']['input'];
};


export type MutationTempSeatApplicationArgs = {
  days: Scalars['Float']['input'];
  from: Scalars['String']['input'];
  q1: Scalars['Boolean']['input'];
  q2: Scalars['Boolean']['input'];
  roomPref: Scalars['Float']['input'];
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
  attachedFiles: Array<AttachedFiles>;
  newApplicationId: Scalars['Float']['output'];
  questionnaire: NewSeatQuestionnaire;
  questionnaireId: Scalars['Float']['output'];
};

export type NewSeatQuestionnaire = {
  __typename?: 'NewSeatQuestionnaire';
  application: NewApplication;
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
  applications: Array<SeatApplication>;
  departments: Array<Department>;
  myapplications: Array<SeatApplication>;
  pendingVotes: Array<Vote>;
  test: Scalars['String']['output'];
};

export type Residency = {
  __typename?: 'Residency';
  from: Scalars['DateTime']['output'];
  residencyId: Scalars['Float']['output'];
  room: Room;
  roomId: Scalars['Float']['output'];
  student: Student;
  studentId: Scalars['Float']['output'];
};

export enum ResidencyStatus {
  Attached = 'ATTACHED',
  Resident = 'RESIDENT',
  TempResident = 'TEMP_RESIDENT'
}

export type Room = {
  __typename?: 'Room';
  floor: Floor;
  floorId: Scalars['Float']['output'];
  roomCapacity: Scalars['Float']['output'];
  roomId: Scalars['Float']['output'];
  roomNo: Scalars['Float']['output'];
};

export type RoomChangeApplication = {
  __typename?: 'RoomChangeApplication';
  application: SeatApplication;
  applicationId: Scalars['Float']['output'];
  reason: Scalars['String']['output'];
  roomChangeApplicationId: Scalars['Float']['output'];
  toRoom: Room;
  toRoomId: Scalars['Float']['output'];
  votes: Array<Vote>;
};

export type SeatApplication = {
  __typename?: 'SeatApplication';
  applicationId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  newApplication?: Maybe<NewApplication>;
  roomChangeApplication?: Maybe<RoomChangeApplication>;
  status: ApplicationStatus;
  student: Student;
  studentId: Scalars['Float']['output'];
  tempApplication?: Maybe<TempApplication>;
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
  roomChangeApplication: RoomChangeApplication;
  roomChangeApplicationId: Scalars['Float']['output'];
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', studentId: number, residencyStatus: ResidencyStatus } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };


export const DepartmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deptCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<DepartmentsQuery, DepartmentsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;