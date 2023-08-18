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

export type Announcement = {
  __typename?: 'Announcement';
  announcementId: Scalars['Float']['output'];
  authority?: Maybe<Authority>;
  authorityId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  details: Scalars['String']['output'];
  messManager?: Maybe<MessManager>;
  messManagerId?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
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
  announcements?: Maybe<Array<Announcement>>;
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

export type Feedback = {
  __typename?: 'Feedback';
  endMealPlan: MealPlan;
  endMealPlanId: Scalars['Float']['output'];
  feedbackId: Scalars['Float']['output'];
  messManager: MessManager;
  messManagerId: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  startMealPlan: MealPlan;
  startMealPlanId: Scalars['Float']['output'];
};

export type FeedbackWithRating = {
  __typename?: 'FeedbackWithRating';
  avg: Scalars['Float']['output'];
  feedback: Feedback;
  type: RatingType;
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
  photo?: Maybe<Photo>;
  photoId?: Maybe<Scalars['Float']['output']>;
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
  optedOut?: Maybe<Student>;
  preferences?: Maybe<Array<Preference>>;
};

export type MealPlanWithCount = {
  __typename?: 'MealPlanWithCount';
  _count: Scalars['Float']['output'];
  mealPlan: MealPlan;
};

export type MealPreferenceStats = {
  __typename?: 'MealPreferenceStats';
  count: Scalars['Float']['output'];
  item: Item;
  order: Scalars['Float']['output'];
};

export enum MealTime {
  Dinner = 'DINNER',
  Lunch = 'LUNCH'
}

export type MessApplicationsWithCount = {
  __typename?: 'MessApplicationsWithCount';
  applications: Array<MessManagerApplication>;
  count: Scalars['Float']['output'];
};

export type MessManager = {
  __typename?: 'MessManager';
  announcements?: Maybe<Array<Announcement>>;
  from: Scalars['DateTime']['output'];
  messManagerId: Scalars['Float']['output'];
  residency: Residency;
  residencyId: Scalars['Float']['output'];
  student: Student;
  studentStudentId: Scalars['Float']['output'];
  to: Scalars['DateTime']['output'];
};

export type MessManagerApplication = {
  __typename?: 'MessManagerApplication';
  applicationId: Scalars['Float']['output'];
  appliedAt: Scalars['DateTime']['output'];
  preferredFrom: Scalars['DateTime']['output'];
  preferredTo: Scalars['DateTime']['output'];
  residency: Residency;
  residencyId: Scalars['Float']['output'];
  status: Scalars['Float']['output'];
  student: Student;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAnnouncement: Announcement;
  addNewMealItem: CupCount;
  addOldMealItem: CupCount;
  addPreferences: Array<Preference>;
  applyMessManager: MessManagerApplication;
  approveMessManagerApplication: MessManager;
  approveNewApplication: Residency;
  approveSeatChangeApplication: Residency;
  approveTempSeatApplication: TempResidency;
  login: UserWithToken;
  newSeatApplication: NewApplication;
  optOut: OptedOut;
  postFeedback: Scalars['String']['output'];
  rejectApplication: SeatApplication;
  rejectMessManagerApplication: MessManagerApplication;
  removeAnnouncement: Announcement;
  reviseApplication: Revision;
  seatChangeApplication: SeatChangeApplication;
  tempSeatApplication: TempApplication;
  vote: Vote;
};


export type MutationAddAnnouncementArgs = {
  details: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddNewMealItemArgs = {
  cupCount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
  fileId: Scalars['Float']['input'];
  mealTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationAddOldMealItemArgs = {
  cupCount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
  itemId: Scalars['Float']['input'];
  mealTime: Scalars['String']['input'];
};


export type MutationAddPreferencesArgs = {
  mealPlanId: Scalars['Float']['input'];
  preferences: PreferenceInput;
};


export type MutationApplyMessManagerArgs = {
  preferredFrom: Scalars['String']['input'];
  preferredTo: Scalars['String']['input'];
};


export type MutationApproveMessManagerApplicationArgs = {
  from: Scalars['String']['input'];
  messManagerApplicationId: Scalars['Float']['input'];
  to: Scalars['String']['input'];
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


export type MutationOptOutArgs = {
  mealPlanId: Scalars['Float']['input'];
};


export type MutationPostFeedbackArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  feedbackId: Scalars['Float']['input'];
  ratings: IntArray;
};


export type MutationRejectApplicationArgs = {
  applicationId: Scalars['Float']['input'];
};


export type MutationRejectMessManagerApplicationArgs = {
  messManagerApplicationId: Scalars['Float']['input'];
};


export type MutationRemoveAnnouncementArgs = {
  announcementId: Scalars['Float']['input'];
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

export type Notification = {
  __typename?: 'Notification';
  application?: Maybe<SeatApplication>;
  applicationId?: Maybe<Scalars['Float']['output']>;
  notificationId: Scalars['Float']['output'];
  seen: Scalars['Boolean']['output'];
  student: Student;
  studentId: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
  vote?: Maybe<Vote>;
  voteId?: Maybe<Scalars['Float']['output']>;
};

export type NotificationWithCount = {
  __typename?: 'NotificationWithCount';
  notifications: Array<Notification>;
  unseenCount: Scalars['Float']['output'];
};

export type OptedOut = {
  __typename?: 'OptedOut';
  mealPlan: MealPlan;
  mealPlanId: Scalars['Float']['output'];
  residency: Residency;
  residencyId: Scalars['Float']['output'];
  time: Scalars['DateTime']['output'];
};

export type OptedOutCount = {
  __typename?: 'OptedOutCount';
  optedOut: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Photo = {
  __typename?: 'Photo';
  file: UploadedFile;
  photoId: Scalars['Float']['output'];
  uploadedFileId: Scalars['Float']['output'];
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

export type PreferenceInput = {
  preferences: Array<SinglePreferenceInput>;
};

export type Query = {
  __typename?: 'Query';
  absentees: Array<ResidencyWithParticipationCount>;
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
  getAnnouncement: Announcement;
  getAnnouncements: Array<Announcement>;
  getMealPlan: MealPlan;
  getMealPlans: Array<MealPlan>;
  getOldItems: Array<Item>;
  levelTerms: Array<LevelTerm>;
  mealPreferenceStats: Array<MealPreferenceStats>;
  messManagerApplicationDetails: MessManagerApplication;
  messManagerApplications: MessApplicationsWithCount;
  messManagingExperiences: Array<MessManager>;
  myapplications: Array<SeatApplication>;
  notifications: NotificationWithCount;
  optedOutStats: OptedOutCount;
  participants: Array<MealPlanWithCount>;
  pendingFeedbacks: Array<Feedback>;
  pendingVotes: Array<Vote>;
  ratings: Array<FeedbackWithRating>;
  selfInfo: UserWithToken;
  test: Scalars['String']['output'];
};


export type QueryAbsenteesArgs = {
  from: Scalars['String']['input'];
  take: Scalars['Float']['input'];
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


export type QueryGetAnnouncementArgs = {
  announcementId: Scalars['Float']['input'];
};


export type QueryGetMealPlanArgs = {
  date: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
};


export type QueryGetMealPlansArgs = {
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type QueryMealPreferenceStatsArgs = {
  date: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
};


export type QueryMessManagerApplicationDetailsArgs = {
  applicationId: Scalars['Float']['input'];
};


export type QueryMessManagerApplicationsArgs = {
  page: Scalars['Float']['input'];
  search?: InputMaybe<SearchInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryMessManagingExperiencesArgs = {
  studentId: Scalars['Float']['input'];
};


export type QueryOptedOutStatsArgs = {
  date: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
};


export type QueryParticipantsArgs = {
  from: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
};


export type QueryRatingsArgs = {
  date: Scalars['String']['input'];
};

export enum RatingType {
  Management = 'MANAGEMENT',
  Quality = 'QUALITY',
  Quantity = 'QUANTITY'
}

export type Residency = {
  __typename?: 'Residency';
  from: Scalars['DateTime']['output'];
  isCurrentMessManager: Scalars['Boolean']['output'];
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

export type ResidencyWithParticipationCount = {
  __typename?: 'ResidencyWithParticipationCount';
  _count: Scalars['Float']['output'];
  residency: Residency;
};

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

export type SinglePreferenceInput = {
  itemId: Scalars['Float']['input'];
  order: Scalars['Float']['input'];
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
  from: Scalars['DateTime']['output'];
  prefSeat: Seat;
  prefSeatId: Scalars['Float']['output'];
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
  student: Student;
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
  messManager?: Maybe<MessManager>;
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', studentId: number, residencyStatus: ResidencyStatus, residency?: { __typename?: 'Residency', isCurrentMessManager: boolean, seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };

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


export type ApplicationDetailsQuery = { __typename?: 'Query', applicationDetails: { __typename?: 'SeatApplication', applicationId: number, createdAt: any, lastUpdate: any, status: ApplicationStatus, attachedFiles?: Array<{ __typename?: 'AttachedFile', uploadedFile: { __typename?: 'UploadedFile', fileName: string, uploadedFileId: number } }> | null, student: { __typename?: 'Student', student9DigitId: string, name: string, residencyStatus: ResidencyStatus, studentId: number, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string }, residency?: { __typename?: 'Residency', seat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null, tempResidencyHistory: Array<{ __typename?: 'TempResidencyHistory', from: any, to: any, seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } }> }, newApplication?: { __typename?: 'NewApplication', newApplicationId: number, questionnaire: { __typename?: 'NewSeatQuestionnaire', q1: boolean, q2: boolean, questionnaireId: number } } | null, tempApplication?: { __typename?: 'TempApplication', from: any, days: number, prefSeat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null, seatChangeApplication?: { __typename?: 'SeatChangeApplication', reason: string, seatChangeApplicationId: number, toSeatId: number, applicationId: number, toSeat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } }, votes: Array<{ __typename?: 'Vote', status: VoteStatus, reason: string, student: { __typename?: 'Student', name: string, department: { __typename?: 'Department', shortName: string }, batch: { __typename?: 'Batch', year: string }, levelTerm: { __typename?: 'LevelTerm', label: string } } }> } | null } };

export type SelfInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfInfoQuery = { __typename?: 'Query', selfInfo: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', studentId: number, residencyStatus: ResidencyStatus, residency?: { __typename?: 'Residency', isCurrentMessManager: boolean, seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };

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

export type ApproveTempSeatApplicationMutationVariables = Exact<{
  from: Scalars['String']['input'];
  days: Scalars['Float']['input'];
  seatId: Scalars['Float']['input'];
  applicationId: Scalars['Float']['input'];
}>;


export type ApproveTempSeatApplicationMutation = { __typename?: 'Mutation', approveTempSeatApplication: { __typename?: 'TempResidency', days: number, from: any, seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } };

export type ApproveSeatChangeApplicationMutationVariables = Exact<{
  seatId: Scalars['Float']['input'];
  seatChangeApplicationId: Scalars['Float']['input'];
}>;


export type ApproveSeatChangeApplicationMutation = { __typename?: 'Mutation', approveSeatChangeApplication: { __typename?: 'Residency', seatId: number, student: { __typename?: 'Student', name: string } } };

export type RejectApplicationMutationVariables = Exact<{
  applicationId: Scalars['Float']['input'];
}>;


export type RejectApplicationMutation = { __typename?: 'Mutation', rejectApplication: { __typename?: 'SeatApplication', applicationId: number } };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationWithCount', unseenCount: number, notifications: Array<{ __typename?: 'Notification', time: any, text: string, seen: boolean, notificationId: number, applicationId?: number | null, voteId?: number | null }> } };

export type GetMealPlansQueryVariables = Exact<{
  to: Scalars['String']['input'];
  from: Scalars['String']['input'];
}>;


export type GetMealPlansQuery = { __typename?: 'Query', getMealPlans: Array<{ __typename?: 'MealPlan', mealPlanId: number, mealTime: MealTime, day: any, meal: { __typename?: 'Meal', mealId: number, items: Array<{ __typename?: 'Item', itemId: number, name: string, photoId?: number | null, type: ItemType, photo?: { __typename?: 'Photo', file: { __typename?: 'UploadedFile', fileName: string } } | null }> }, preferences?: Array<{ __typename?: 'Preference', itemId: number, order: number }> | null, optedOut?: { __typename?: 'Student', studentId: number } | null, cupCount: Array<{ __typename?: 'CupCount', cupcount: number, itemId: number }> }> };

export type OptOutMutationVariables = Exact<{
  mealPlanId: Scalars['Float']['input'];
}>;


export type OptOutMutation = { __typename?: 'Mutation', optOut: { __typename?: 'OptedOut', mealPlanId: number, time: any, residencyId: number, mealPlan: { __typename?: 'MealPlan', day: any, mealTime: MealTime }, residency: { __typename?: 'Residency', studentId: number } } };

export type AddPreferencesMutationVariables = Exact<{
  preferences: PreferenceInput;
  mealPlanId: Scalars['Float']['input'];
}>;


export type AddPreferencesMutation = { __typename?: 'Mutation', addPreferences: Array<{ __typename?: 'Preference', mealPlanId: number, order: number, itemId: number, student: { __typename?: 'Student', student9DigitId: string }, item: { __typename?: 'Item', name: string, type: ItemType }, mealPlan: { __typename?: 'MealPlan', day: any, mealId: number, mealTime: MealTime } }> };

export type ParticipantsQueryVariables = Exact<{
  mealTime: Scalars['String']['input'];
  from: Scalars['String']['input'];
}>;


export type ParticipantsQuery = { __typename?: 'Query', participants: Array<{ __typename?: 'MealPlanWithCount', _count: number, mealPlan: { __typename?: 'MealPlan', mealPlanId: number, day: any } }> };

export type AbsenteesQueryVariables = Exact<{
  take: Scalars['Float']['input'];
  from: Scalars['String']['input'];
}>;


export type AbsenteesQuery = { __typename?: 'Query', absentees: Array<{ __typename?: 'ResidencyWithParticipationCount', _count: number, residency: { __typename?: 'Residency', student: { __typename?: 'Student', student9DigitId: string } } }> };

export type ExampleQueryQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type ExampleQueryQuery = { __typename?: 'Query', ratings: Array<{ __typename?: 'FeedbackWithRating', avg: number, type: RatingType, feedback: { __typename?: 'Feedback', feedbackId: number, startMealPlan: { __typename?: 'MealPlan', day: any }, endMealPlan: { __typename?: 'MealPlan', day: any } } }> };

export type OptOutQueryQueryVariables = Exact<{
  mealTime: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type OptOutQueryQuery = { __typename?: 'Query', optedOutStats: { __typename?: 'OptedOutCount', optedOut: number, total: number } };

export type MealPreferenceStatsQueryVariables = Exact<{
  mealTime: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type MealPreferenceStatsQuery = { __typename?: 'Query', mealPreferenceStats: Array<{ __typename?: 'MealPreferenceStats', count: number, order: number, item: { __typename?: 'Item', itemId: number, name: string, type: ItemType } }> };

export type PendingFeedbacksQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingFeedbacksQuery = { __typename?: 'Query', pendingFeedbacks: Array<{ __typename?: 'Feedback', startDate: any, feedbackId: number, startMealPlan: { __typename?: 'MealPlan', day: any }, endMealPlan: { __typename?: 'MealPlan', day: any }, messManager: { __typename?: 'MessManager', student: { __typename?: 'Student', name: string, levelTerm: { __typename?: 'LevelTerm', label: string }, batch: { __typename?: 'Batch', year: string } } } }> };

export type PostFeedbackMutationVariables = Exact<{
  feedbackId: Scalars['Float']['input'];
  ratings: IntArray;
}>;


export type PostFeedbackMutation = { __typename?: 'Mutation', postFeedback: string };


export const DepartmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deptCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<DepartmentsQuery, DepartmentsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCurrentMessManager"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Applications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ApplicationsQuery, ApplicationsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"select"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const BatchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<BatchesQuery, BatchesQueryVariables>;
export const ApplicationDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ApplicationDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attachedFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadedFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempResidencyHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"q1"}},{"kind":"Field","name":{"kind":"Name","value":"q2"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaireId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"prefSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"days"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"toSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"toSeatId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ApplicationDetailsQuery, ApplicationDetailsQueryVariables>;
export const SelfInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelfInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selfInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCurrentMessManager"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SelfInfoQuery, SelfInfoQueryVariables>;
export const MyapplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Myapplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myapplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]}}]} as unknown as DocumentNode<MyapplicationsQuery, MyapplicationsQueryVariables>;
export const NewSeatApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewSeatApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attachedFileIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntArray"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newSeatApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attachedFileIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attachedFileIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"q2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q2"}}},{"kind":"Argument","name":{"kind":"Name","value":"q1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q1"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]} as unknown as DocumentNode<NewSeatApplicationMutation, NewSeatApplicationMutationVariables>;
export const TempSeatApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TempSeatApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"days"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefSeatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tempSeatApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"days"},"value":{"kind":"Variable","name":{"kind":"Name","value":"days"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefSeatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefSeatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"q2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q2"}}},{"kind":"Argument","name":{"kind":"Name","value":"q1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q1"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TempSeatApplicationMutation, TempSeatApplicationMutationVariables>;
export const SeatChangeApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeatChangeApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}},{"kind":"Argument","name":{"kind":"Name","value":"seatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeatChangeApplicationMutation, SeatChangeApplicationMutationVariables>;
export const FreeFloorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeFloors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeFloors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorId"}},{"kind":"Field","name":{"kind":"Name","value":"floorNo"}}]}}]}}]} as unknown as DocumentNode<FreeFloorsQuery, FreeFloorsQueryVariables>;
export const FreeRoomInFloorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeRoomInFloor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeRoomInFloor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"floorNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]} as unknown as DocumentNode<FreeRoomInFloorQuery, FreeRoomInFloorQueryVariables>;
export const FreeSeatInRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeSeatInRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeSeatInRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"floorNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}}},{"kind":"Argument","name":{"kind":"Name","value":"roomNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatId"}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}}]} as unknown as DocumentNode<FreeSeatInRoomQuery, FreeSeatInRoomQueryVariables>;
export const FreeSeatQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FreeSeatQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}}]} as unknown as DocumentNode<FreeSeatQueryQuery, FreeSeatQueryQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newApplicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveNewApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newApplicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newApplicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"residencyId"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const ApproveTempSeatApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveTempSeatApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"days"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveTempSeatApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"days"},"value":{"kind":"Variable","name":{"kind":"Name","value":"days"}}},{"kind":"Argument","name":{"kind":"Name","value":"seatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ApproveTempSeatApplicationMutation, ApproveTempSeatApplicationMutationVariables>;
export const ApproveSeatChangeApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveSeatChangeApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seatChangeApplicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveSeatChangeApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"seatChangeApplicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seatChangeApplicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatId"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ApproveSeatChangeApplicationMutation, ApproveSeatChangeApplicationMutationVariables>;
export const RejectApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]} as unknown as DocumentNode<RejectApplicationMutation, RejectApplicationMutationVariables>;
export const NotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"seen"}},{"kind":"Field","name":{"kind":"Name","value":"notificationId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"voteId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unseenCount"}}]}}]}}]} as unknown as DocumentNode<NotificationsQuery, NotificationsQueryVariables>;
export const GetMealPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMealPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}},{"kind":"Field","name":{"kind":"Name","value":"meal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealId"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}},{"kind":"Field","name":{"kind":"Name","value":"optedOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cupCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cupcount"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMealPlansQuery, GetMealPlansQueryVariables>;
export const OptOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OptOut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optOut"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealPlanId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"mealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"residencyId"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}}]}}]}}]} as unknown as DocumentNode<OptOutMutation, OptOutMutationVariables>;
export const AddPreferencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPreferences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferences"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferenceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPreferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"preferences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferences"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealPlanId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealId"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}}]}}]}}]}}]} as unknown as DocumentNode<AddPreferencesMutation, AddPreferencesMutationVariables>;
export const ParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Participants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"}},{"kind":"Field","name":{"kind":"Name","value":"mealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"day"}}]}}]}}]}}]} as unknown as DocumentNode<ParticipantsQuery, ParticipantsQueryVariables>;
export const AbsenteesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Absentees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"absentees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AbsenteesQuery, AbsenteesQueryVariables>;
export const ExampleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExampleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ratings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"feedback"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedbackId"}},{"kind":"Field","name":{"kind":"Name","value":"startMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExampleQueryQuery, ExampleQueryQueryVariables>;
export const OptOutQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OptOutQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optedOutStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optedOut"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<OptOutQueryQuery, OptOutQueryQueryVariables>;
export const MealPreferenceStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MealPreferenceStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPreferenceStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<MealPreferenceStatsQuery, MealPreferenceStatsQueryVariables>;
export const PendingFeedbacksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PendingFeedbacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingFeedbacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feedbackId"}},{"kind":"Field","name":{"kind":"Name","value":"messManager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PendingFeedbacksQuery, PendingFeedbacksQueryVariables>;
export const PostFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedbackId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntArray"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedbackId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedbackId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratings"}}}]}]}}]} as unknown as DocumentNode<PostFeedbackMutation, PostFeedbackMutationVariables>;