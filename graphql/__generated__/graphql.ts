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

export type Complaint = {
  __typename?: 'Complaint';
  complaintId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  details: Scalars['String']['output'];
  student: Student;
  studentId: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  type: ComplaintType;
};

export enum ComplaintType {
  Resource = 'RESOURCE',
  Student = 'STUDENT',
  Stuff = 'STUFF'
}

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

export type DeptWiseResident = {
  __typename?: 'DeptWiseResident';
  deptName: Scalars['String']['output'];
  totalResidents: Scalars['Float']['output'];
};

export type Feedback = {
  __typename?: 'Feedback';
  endMealPlan: MealPlan;
  endMealPlanId: Scalars['Float']['output'];
  feedbackId: Scalars['Float']['output'];
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

export type FullSeatStat = {
  __typename?: 'FullSeatStat';
  freeRooms: Scalars['Float']['output'];
  freeSeats: Scalars['Float']['output'];
  totalRooms: Scalars['Float']['output'];
  totalSeats: Scalars['Float']['output'];
};

export type FullStudentStat = {
  __typename?: 'FullStudentStat';
  totalAttached: Scalars['Float']['output'];
  totalResidents: Scalars['Float']['output'];
  totalStudents: Scalars['Float']['output'];
  totalTempResidents: Scalars['Float']['output'];
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

export type MealPlanInput = {
  items: Array<SingleCupCountInput>;
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
  call: MessManagerApplicationCall;
  callId: Scalars['Float']['output'];
  messManagerId: Scalars['Float']['output'];
  residency: Residency;
  residencyId: Scalars['Float']['output'];
};

export type MessManagerApplication = {
  __typename?: 'MessManagerApplication';
  applicationId: Scalars['Float']['output'];
  appliedAt: Scalars['DateTime']['output'];
  call: MessManagerApplicationCall;
  callId: Scalars['Float']['output'];
  residency: Residency;
  residencyId: Scalars['Float']['output'];
  status: ApplicationStatus;
};

export type MessManagerApplicationCall = {
  __typename?: 'MessManagerApplicationCall';
  accepted: Scalars['Float']['output'];
  applications: Array<MessManagerApplication>;
  applicationsCount: Scalars['Float']['output'];
  authority: Authority;
  callId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Authority;
  createdById: Scalars['Float']['output'];
  from: Scalars['DateTime']['output'];
  to: Scalars['DateTime']['output'];
};

export type MessManagerCallWithAppsOfResident = {
  __typename?: 'MessManagerCallWithAppsOfResident';
  application?: Maybe<MessManagerApplication>;
  call: MessManagerApplicationCall;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAnnouncement: Announcement;
  addComplaint: Complaint;
  addNewItem: Item;
  addNewMealPlan: MealPlan;
  addOldMealPlan: MealPlan;
  addPreferences: Array<Preference>;
  applyMessManager: MessManagerApplication;
  approveMessManagerApplication: MessManager;
  approveNewApplication: Residency;
  approveSeatChangeApplication: Residency;
  approveTempSeatApplication: TempResidency;
  createCall: MessManagerApplicationCall;
  deleteNotification: Scalars['Float']['output'];
  login: UserWithToken;
  mark: Notification;
  newSeatApplication: NewApplication;
  optOut: OptedOut;
  postFeedback: Scalars['String']['output'];
  reSubmitApplication: SeatApplication;
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


export type MutationAddComplaintArgs = {
  details: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationAddNewItemArgs = {
  fileId: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationAddNewMealPlanArgs = {
  date: Scalars['String']['input'];
  items: MealPlanInput;
  mealId?: InputMaybe<Scalars['Float']['input']>;
  mealTime: Scalars['String']['input'];
};


export type MutationAddOldMealPlanArgs = {
  date: Scalars['String']['input'];
  mealTime: Scalars['String']['input'];
  oldMealPlanId: Scalars['Float']['input'];
};


export type MutationAddPreferencesArgs = {
  mealPlanId: Scalars['Float']['input'];
  preferences: PreferenceInput;
};


export type MutationApplyMessManagerArgs = {
  callId: Scalars['Float']['input'];
};


export type MutationApproveMessManagerApplicationArgs = {
  messManagerApplicationId: Scalars['Float']['input'];
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


export type MutationCreateCallArgs = {
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkArgs = {
  notificationId: Scalars['Float']['input'];
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


export type MutationReSubmitApplicationArgs = {
  addedFileIds: IntArray;
  applicationId: Scalars['Float']['input'];
  removedFilesIds: IntArray;
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
  allFloors: Array<Scalars['Float']['output']>;
  applicationDetails: SeatApplication;
  applicationStatus: Array<StatusWithDefaultSelect>;
  applicationTypes: Array<Scalars['String']['output']>;
  applications: SeatApplicationsWithCount;
  assingedMessManagers: Array<MessManager>;
  batches: Array<Batch>;
  callUntil: Scalars['String']['output'];
  departmentWiseResidentStats: Array<DeptWiseResident>;
  departments: Array<Department>;
  freeFloors: Array<Floor>;
  freeRoomInFloor: Array<Room>;
  freeSeat: Seat;
  freeSeatInRoom: Array<Seat>;
  fullSeatStats: FullSeatStat;
  fullStudentStats: FullStudentStat;
  getAddedMealPlansByDateTime: Array<MealPlan>;
  getAnnouncement: Announcement;
  getAnnouncements: Array<Announcement>;
  getComplaint: Complaint;
  getComplaints: Array<Complaint>;
  getComplaints2: Array<Complaint>;
  getComplaintsByStudent: Array<Complaint>;
  getComplaintsByType: Array<Complaint>;
  getComplaintsByTypeAndStudent: Array<Complaint>;
  getComplaintsFromDate: Array<Complaint>;
  getMealPlan: MealPlan;
  getMealPlans: Array<MealPlan>;
  getOldItems: Array<Item>;
  levelTerms: Array<LevelTerm>;
  mealPreferenceStats: Array<MealPreferenceStats>;
  messManagerApplicationDetails: MessManagerApplication;
  messManagerApplications: MessApplicationsWithCount;
  messManagerAssignedTill: Scalars['String']['output'];
  messManagingExperiences: Array<MessManager>;
  myapplications: Array<SeatApplication>;
  notifications: NotificationWithCount;
  optedOutStats: OptedOutCount;
  participants: Array<MealPlanWithCount>;
  pendingFeedbacks: Array<Feedback>;
  pendingVotes: Array<Vote>;
  prevCalls: Array<MessManagerApplicationCall>;
  prevCallsWithAppOfResident: Array<MessManagerCallWithAppsOfResident>;
  ratings: Array<FeedbackWithRating>;
  residencyStatus: Array<ResidencyStatusWithDefaultSelect>;
  retrieveStudents: StudentsWithCount;
  selectedFloorRooms: Array<Room>;
  selectedRoomStudents: Array<Student>;
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


export type QueryGetAddedMealPlansByDateTimeArgs = {
  mealTime: Scalars['String']['input'];
};


export type QueryGetAnnouncementArgs = {
  announcementId: Scalars['Float']['input'];
};


export type QueryGetComplaintArgs = {
  complaintId: Scalars['Float']['input'];
};


export type QueryGetComplaints2Args = {
  filters?: InputMaybe<ComplaintTypeFilerInput>;
  page: Scalars['Float']['input'];
  search?: InputMaybe<SearchInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetComplaintsByStudentArgs = {
  studentId: Scalars['Float']['input'];
};


export type QueryGetComplaintsByTypeArgs = {
  type: Scalars['String']['input'];
};


export type QueryGetComplaintsByTypeAndStudentArgs = {
  studentId: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetComplaintsFromDateArgs = {
  date: Scalars['String']['input'];
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


export type QueryRetrieveStudentsArgs = {
  filters?: InputMaybe<StudentFilterInput>;
  page: Scalars['Float']['input'];
  search?: InputMaybe<SearchInput>;
  sort?: InputMaybe<SortInput>;
};


export type QuerySelectedFloorRoomsArgs = {
  floorNo: Scalars['Float']['input'];
  residentType: Scalars['String']['input'];
  roomStatus: Scalars['String']['input'];
};


export type QuerySelectedRoomStudentsArgs = {
  roomId: Scalars['Float']['input'];
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
  messManagerTimes: Scalars['Float']['output'];
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

export type ResidencyStatusWithDefaultSelect = {
  __typename?: 'ResidencyStatusWithDefaultSelect';
  select: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
};

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
  revisions?: Maybe<Array<Revision>>;
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

export type SingleCupCountInput = {
  cupCount: Scalars['Float']['input'];
  itemId: Scalars['Float']['input'];
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
  complaints: Array<Complaint>;
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

export type StudentFilterInput = {
  batch: Array<Scalars['String']['input']>;
  dept: Array<Scalars['String']['input']>;
  levelTerm: Array<Scalars['String']['input']>;
  residencyStatus: Array<Scalars['String']['input']>;
};

export type StudentsWithCount = {
  __typename?: 'StudentsWithCount';
  count: Scalars['Float']['output'];
  students: Array<Student>;
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
  newFileName: Scalars['String']['output'];
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

export type ComplaintTypeFilerInput = {
  type: Array<Scalars['String']['input']>;
};

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', deptCode: string, name: string, shortName: string }> };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  loginId: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', student9DigitId: string, name: string, phone: string, studentId: number, residencyStatus: ResidencyStatus, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string }, residency?: { __typename?: 'Residency', isCurrentMessManager: boolean, seat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomId: number, roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };

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


export type ApplicationDetailsQuery = { __typename?: 'Query', applicationDetails: { __typename?: 'SeatApplication', applicationId: number, createdAt: any, lastUpdate: any, status: ApplicationStatus, revisions?: Array<{ __typename?: 'Revision', reason: string, createdAt: any }> | null, attachedFiles?: Array<{ __typename?: 'AttachedFile', uploadedFile: { __typename?: 'UploadedFile', fileName: string, uploadedFileId: number, newFileName: string } }> | null, student: { __typename?: 'Student', student9DigitId: string, name: string, phone: string, residencyStatus: ResidencyStatus, studentId: number, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string }, residency?: { __typename?: 'Residency', seat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null, tempResidencyHistory: Array<{ __typename?: 'TempResidencyHistory', from: any, to: any, seat: { __typename?: 'Seat', room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } }> }, newApplication?: { __typename?: 'NewApplication', newApplicationId: number, questionnaire: { __typename?: 'NewSeatQuestionnaire', q1: boolean, q2: boolean, questionnaireId: number } } | null, tempApplication?: { __typename?: 'TempApplication', from: any, days: number, prefSeat: { __typename?: 'Seat', seatLabel: string, seatId: number, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null, seatChangeApplication?: { __typename?: 'SeatChangeApplication', reason: string, seatChangeApplicationId: number, toSeatId: number, applicationId: number, toSeat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } }, votes: Array<{ __typename?: 'Vote', status: VoteStatus, reason: string, student: { __typename?: 'Student', student9DigitId: string, name: string, department: { __typename?: 'Department', shortName: string }, batch: { __typename?: 'Batch', year: string }, levelTerm: { __typename?: 'LevelTerm', label: string } } }> } | null } };

export type SelfInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfInfoQuery = { __typename?: 'Query', selfInfo: { __typename?: 'UserWithToken', token: string, student?: { __typename?: 'Student', studentId: number, name: string, student9DigitId: string, phone: string, residencyStatus: ResidencyStatus, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string }, residency?: { __typename?: 'Residency', isCurrentMessManager: boolean, seat: { __typename?: 'Seat', seatLabel: string, room: { __typename?: 'Room', roomId: number, roomNo: number, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } } } } | null } | null, authority?: { __typename?: 'Authority', authorityId: number, role: AuthorityRole } | null } };

export type MyapplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyapplicationsQuery = { __typename?: 'Query', myapplications: Array<{ __typename?: 'SeatApplication', applicationId: number, createdAt: any, lastUpdate: any, status: ApplicationStatus, student: { __typename?: 'Student', student9DigitId: string, name: string, residencyStatus: ResidencyStatus, studentId: number, phone: string, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string } }, newApplication?: { __typename?: 'NewApplication', newApplicationId: number } | null, seatChangeApplication?: { __typename?: 'SeatChangeApplication', seatChangeApplicationId: number } | null, tempApplication?: { __typename?: 'TempApplication', applicationId: number } | null }> };

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


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationWithCount', unseenCount: number, notifications: Array<{ __typename?: 'Notification', time: any, text: string, seen: boolean, notificationId: number, applicationId?: number | null, voteId?: number | null, vote?: { __typename?: 'Vote', voteId: number, seatChangeApplication: { __typename?: 'SeatChangeApplication', application: { __typename?: 'SeatApplication', student: { __typename?: 'Student', name: string, email: string, phone: string, student9DigitId: string, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string } } } } } | null }> } };

export type GetMealPlansQueryVariables = Exact<{
  to: Scalars['String']['input'];
  from: Scalars['String']['input'];
}>;


export type GetMealPlansQuery = { __typename?: 'Query', getMealPlans: Array<{ __typename?: 'MealPlan', mealPlanId: number, mealTime: MealTime, day: any, meal: { __typename?: 'Meal', mealId: number, items: Array<{ __typename?: 'Item', itemId: number, name: string, photoId?: number | null, type: ItemType, photo?: { __typename?: 'Photo', file: { __typename?: 'UploadedFile', fileName: string, newFileName: string } } | null }> }, preferences?: Array<{ __typename?: 'Preference', order: number, item: { __typename?: 'Item', itemId: number, name: string, type: ItemType } }> | null, optedOut?: { __typename?: 'Student', studentId: number } | null, cupCount: Array<{ __typename?: 'CupCount', cupcount: number, itemId: number }> }> };

export type GetOldItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOldItemsQuery = { __typename?: 'Query', getOldItems: Array<{ __typename?: 'Item', itemId: number, name: string, type: ItemType, photoId?: number | null, photo?: { __typename?: 'Photo', file: { __typename?: 'UploadedFile', fileName: string, newFileName: string } } | null }> };

export type AddNewMealPlanMutationVariables = Exact<{
  items: MealPlanInput;
  mealTime: Scalars['String']['input'];
  date: Scalars['String']['input'];
  mealId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type AddNewMealPlanMutation = { __typename?: 'Mutation', addNewMealPlan: { __typename?: 'MealPlan', day: any, mealId: number, mealPlanId: number, mealTime: MealTime, cupCount: Array<{ __typename?: 'CupCount', cupcount: number, item: { __typename?: 'Item', name: string, itemId: number, photoId?: number | null, type: ItemType } }> } };

export type AddNewItemMutationVariables = Exact<{
  type: Scalars['String']['input'];
  name: Scalars['String']['input'];
  fileId: Scalars['Float']['input'];
}>;


export type AddNewItemMutation = { __typename?: 'Mutation', addNewItem: { __typename?: 'Item', itemId: number, name: string, type: ItemType, photo?: { __typename?: 'Photo', photoId: number, uploadedFileId: number } | null } };

export type OptOutMutationVariables = Exact<{
  mealPlanId: Scalars['Float']['input'];
}>;


export type OptOutMutation = { __typename?: 'Mutation', optOut: { __typename?: 'OptedOut', mealPlanId: number, time: any, residencyId: number, mealPlan: { __typename?: 'MealPlan', day: any, mealTime: MealTime }, residency: { __typename?: 'Residency', studentId: number } } };

export type AddPreferencesMutationVariables = Exact<{
  preferences: PreferenceInput;
  mealPlanId: Scalars['Float']['input'];
}>;


export type AddPreferencesMutation = { __typename?: 'Mutation', addPreferences: Array<{ __typename?: 'Preference', mealPlanId: number, order: number, itemId: number, student: { __typename?: 'Student', student9DigitId: string }, item: { __typename?: 'Item', name: string, type: ItemType }, mealPlan: { __typename?: 'MealPlan', day: any, mealId: number, mealTime: MealTime } }> };

export type GetAnnouncementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnnouncementsQuery = { __typename?: 'Query', getAnnouncements: Array<{ __typename?: 'Announcement', announcementId: number, authorityId?: number | null, createdAt: any, title: string, details: string, messManagerId?: number | null, messManager?: { __typename?: 'MessManager', messManagerId: number } | null, authority?: { __typename?: 'Authority', role: AuthorityRole } | null }> };

export type AddAnnouncementMutationVariables = Exact<{
  details: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type AddAnnouncementMutation = { __typename?: 'Mutation', addAnnouncement: { __typename?: 'Announcement', announcementId: number, authorityId?: number | null, createdAt: any, title: string, details: string, messManagerId?: number | null } };

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


export type PendingFeedbacksQuery = { __typename?: 'Query', pendingFeedbacks: Array<{ __typename?: 'Feedback', startDate: any, feedbackId: number, startMealPlan: { __typename?: 'MealPlan', day: any }, endMealPlan: { __typename?: 'MealPlan', day: any } }> };

export type PostFeedbackMutationVariables = Exact<{
  feedbackId: Scalars['Float']['input'];
  ratings: IntArray;
}>;


export type PostFeedbackMutation = { __typename?: 'Mutation', postFeedback: string };

export type AssingedMessManagersQueryVariables = Exact<{ [key: string]: never; }>;


export type AssingedMessManagersQuery = { __typename?: 'Query', assingedMessManagers: Array<{ __typename?: 'MessManager', residencyId: number, call: { __typename?: 'MessManagerApplicationCall', from: any, to: any }, residency: { __typename?: 'Residency', student: { __typename?: 'Student', name: string, phone: string, email: string, student9DigitId: string, levelTerm: { __typename?: 'LevelTerm', label: string }, batch: { __typename?: 'Batch', year: string } } } }> };

export type TillQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TillQueryQuery = { __typename?: 'Query', callUntil: string, messManagerAssignedTill: string };

export type CreateCallMutationMutationVariables = Exact<{
  to: Scalars['String']['input'];
  from: Scalars['String']['input'];
}>;


export type CreateCallMutationMutation = { __typename?: 'Mutation', createCall: { __typename?: 'MessManagerApplicationCall', callId: number, createdAt: any, from: any, to: any } };

export type PrevCallQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PrevCallQueryQuery = { __typename?: 'Query', prevCalls: Array<{ __typename?: 'MessManagerApplicationCall', callId: number, createdAt: any, from: any, to: any, accepted: number, applicationsCount: number, applications: Array<{ __typename?: 'MessManagerApplication', appliedAt: any, applicationId: number, callId: number, residency: { __typename?: 'Residency', messManagerTimes: number, from: any, isCurrentMessManager: boolean, residencyId: number, student: { __typename?: 'Student', name: string, student9DigitId: string, batch: { __typename?: 'Batch', year: string }, levelTerm: { __typename?: 'LevelTerm', label: string }, department: { __typename?: 'Department', shortName: string } } } }> }> };

export type ApproveMessManagerApplicationMutationVariables = Exact<{
  messManagerApplicationId: Scalars['Float']['input'];
}>;


export type ApproveMessManagerApplicationMutation = { __typename?: 'Mutation', approveMessManagerApplication: { __typename?: 'MessManager', residencyId: number } };

export type PrevCallsStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type PrevCallsStudentQuery = { __typename?: 'Query', prevCallsWithAppOfResident: Array<{ __typename?: 'MessManagerCallWithAppsOfResident', application?: { __typename?: 'MessManagerApplication', status: ApplicationStatus } | null, call: { __typename?: 'MessManagerApplicationCall', from: any, to: any, createdAt: any, callId: number } }> };

export type ApplyMessManagerMutationVariables = Exact<{
  callId: Scalars['Float']['input'];
}>;


export type ApplyMessManagerMutation = { __typename?: 'Mutation', applyMessManager: { __typename?: 'MessManagerApplication', applicationId: number } };

export type MessManagingExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessManagingExperiencesQuery = { __typename?: 'Query', messManagingExperiences: Array<{ __typename?: 'MessManager', call: { __typename?: 'MessManagerApplicationCall', from: any, to: any, authority: { __typename?: 'Authority', name: string } } }> };

export type VoteMutationMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  vote: Scalars['String']['input'];
  voteId: Scalars['Float']['input'];
}>;


export type VoteMutationMutation = { __typename?: 'Mutation', vote: { __typename?: 'Vote', voteId: number } };

export type MarkMutationVariables = Exact<{
  notificationId: Scalars['Float']['input'];
}>;


export type MarkMutation = { __typename?: 'Mutation', mark: { __typename?: 'Notification', seen: boolean, notificationId: number, applicationId?: number | null, studentId: number, text: string, time: any, voteId?: number | null } };

export type FullSeatStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FullSeatStatsQuery = { __typename?: 'Query', fullSeatStats: { __typename?: 'FullSeatStat', freeRooms: number, freeSeats: number, totalRooms: number, totalSeats: number } };

export type FullStudentStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FullStudentStatsQuery = { __typename?: 'Query', fullStudentStats: { __typename?: 'FullStudentStat', totalAttached: number, totalResidents: number, totalStudents: number, totalTempResidents: number } };

export type DepartmentWiseResidentStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentWiseResidentStatsQuery = { __typename?: 'Query', departmentWiseResidentStats: Array<{ __typename?: 'DeptWiseResident', deptName: string, totalResidents: number }> };

export type GetAddedMealPlansByDateTimeQueryVariables = Exact<{
  mealTime: Scalars['String']['input'];
}>;


export type GetAddedMealPlansByDateTimeQuery = { __typename?: 'Query', getAddedMealPlansByDateTime: Array<{ __typename?: 'MealPlan', day: any, mealId: number }> };

export type GetMealPlanQueryVariables = Exact<{
  mealTime: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type GetMealPlanQuery = { __typename?: 'Query', getMealPlan: { __typename?: 'MealPlan', meal: { __typename?: 'Meal', mealId: number, items: Array<{ __typename?: 'Item', itemId: number, name: string, type: ItemType, photo?: { __typename?: 'Photo', photoId: number, file: { __typename?: 'UploadedFile', newFileName: string, fileName: string } } | null }> } } };

export type AllFloorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFloorsQuery = { __typename?: 'Query', allFloors: Array<number> };

export type SelectedFloorRoomsQueryVariables = Exact<{
  residentType: Scalars['String']['input'];
  roomStatus: Scalars['String']['input'];
  floorNo: Scalars['Float']['input'];
}>;


export type SelectedFloorRoomsQuery = { __typename?: 'Query', selectedFloorRooms: Array<{ __typename?: 'Room', roomId: number, roomNo: number, seats: Array<{ __typename?: 'Seat', seatId: number, seatLabel: string, residency?: { __typename?: 'Residency', student: { __typename?: 'Student', name: string, student9DigitId: string, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string } } } | null }>, floor: { __typename?: 'Floor', floorNo: number, roomLabelLen: number } }> };

export type DeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['Float']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: number };

export type SelectedRoomStudentsQueryVariables = Exact<{
  roomId: Scalars['Float']['input'];
}>;


export type SelectedRoomStudentsQuery = { __typename?: 'Query', selectedRoomStudents: Array<{ __typename?: 'Student', name: string, student9DigitId: string, residencyStatus: ResidencyStatus, batch: { __typename?: 'Batch', year: string }, department: { __typename?: 'Department', shortName: string }, levelTerm: { __typename?: 'LevelTerm', label: string }, residency?: { __typename?: 'Residency', from: any, isCurrentMessManager: boolean, seat: { __typename?: 'Seat', seatLabel: string } } | null }> };

export type ReviseApplicationMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  applicationId: Scalars['Float']['input'];
}>;


export type ReviseApplicationMutation = { __typename?: 'Mutation', reviseApplication: { __typename?: 'Revision', revisionId: number } };

export type ResubmitMutationMutationVariables = Exact<{
  addedFileIds: IntArray;
  removedFilesIds: IntArray;
  applicationId: Scalars['Float']['input'];
}>;


export type ResubmitMutationMutation = { __typename?: 'Mutation', reSubmitApplication: { __typename?: 'SeatApplication', applicationId: number } };

export type RetrieveStudentsQueryVariables = Exact<{
  page: Scalars['Float']['input'];
  search?: InputMaybe<SearchInput>;
  sort?: InputMaybe<SortInput>;
  filters?: InputMaybe<StudentFilterInput>;
}>;


export type RetrieveStudentsQuery = { __typename?: 'Query', retrieveStudents: { __typename?: 'StudentsWithCount', count: number, students: Array<{ __typename?: 'Student', name: string, student9DigitId: string, residencyStatus: ResidencyStatus, levelTerm: { __typename?: 'LevelTerm', label: string }, department: { __typename?: 'Department', shortName: string }, batch: { __typename?: 'Batch', year: string } }> } };

export type Filter_StudentQueryVariables = Exact<{ [key: string]: never; }>;


export type Filter_StudentQuery = { __typename?: 'Query', residencyStatus: Array<{ __typename?: 'ResidencyStatusWithDefaultSelect', status: string, select: boolean }>, batches: Array<{ __typename?: 'Batch', year: string }>, departments: Array<{ __typename?: 'Department', shortName: string }>, levelTerms: Array<{ __typename?: 'LevelTerm', label: string }> };

export type GetComplaintsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetComplaintsQuery = { __typename?: 'Query', getComplaints: Array<{ __typename?: 'Complaint', complaintId: number, createdAt: any, details: string, title: string, type: ComplaintType, student: { __typename?: 'Student', studentId: number, name: string, student9DigitId: string } }> };

export type GetComplaints2QueryVariables = Exact<{
  page: Scalars['Float']['input'];
  filters?: InputMaybe<ComplaintTypeFilerInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetComplaints2Query = { __typename?: 'Query', getComplaints2: Array<{ __typename?: 'Complaint', complaintId: number, createdAt: any, type: ComplaintType, details: string, title: string, student: { __typename?: 'Student', name: string, studentId: number, student9DigitId: string } }> };

export type GetComplaintsByStudentQueryVariables = Exact<{
  studentId: Scalars['Float']['input'];
}>;


export type GetComplaintsByStudentQuery = { __typename?: 'Query', getComplaintsByStudent: Array<{ __typename?: 'Complaint', complaintId: number, createdAt: any, details: string, title: string, type: ComplaintType, student: { __typename?: 'Student', studentId: number, name: string, student9DigitId: string } }> };

export type GetComplaintsByTypeQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type GetComplaintsByTypeQuery = { __typename?: 'Query', getComplaintsByType: Array<{ __typename?: 'Complaint', complaintId: number, createdAt: any, details: string, title: string, type: ComplaintType, student: { __typename?: 'Student', studentId: number, name: string, student9DigitId: string } }> };

export type GetComplaintsFromDateQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetComplaintsFromDateQuery = { __typename?: 'Query', getComplaintsFromDate: Array<{ __typename?: 'Complaint', complaintId: number, type: ComplaintType, createdAt: any, details: string, title: string, student: { __typename?: 'Student', studentId: number, name: string, student9DigitId: string } }> };

export type ComplaintMutationMutationVariables = Exact<{
  type: Scalars['String']['input'];
  details: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type ComplaintMutationMutation = { __typename?: 'Mutation', addComplaint: { __typename?: 'Complaint', complaintId: number, title: string, details: string, createdAt: any, type: ComplaintType, student: { __typename?: 'Student', studentId: number, name: string, student9DigitId: string } } };


export const DepartmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deptCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<DepartmentsQuery, DepartmentsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCurrentMessManager"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Applications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ApplicationsQuery, ApplicationsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"select"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationTypes"}},{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const BatchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<BatchesQuery, BatchesQueryVariables>;
export const ApplicationDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ApplicationDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"revisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachedFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadedFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}},{"kind":"Field","name":{"kind":"Name","value":"newFileName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempResidencyHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"q1"}},{"kind":"Field","name":{"kind":"Name","value":"q2"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaireId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"prefSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"seatId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"days"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}},{"kind":"Field","name":{"kind":"Name","value":"toSeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"toSeatId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ApplicationDetailsQuery, ApplicationDetailsQueryVariables>;
export const SelfInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelfInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selfInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCurrentMessManager"}},{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SelfInfoQuery, SelfInfoQueryVariables>;
export const MyapplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Myapplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myapplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplicationId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]}}]} as unknown as DocumentNode<MyapplicationsQuery, MyapplicationsQueryVariables>;
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
export const NotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"seen"}},{"kind":"Field","name":{"kind":"Name","value":"notificationId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"voteId"}},{"kind":"Field","name":{"kind":"Name","value":"vote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voteId"}},{"kind":"Field","name":{"kind":"Name","value":"seatChangeApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unseenCount"}}]}}]}}]} as unknown as DocumentNode<NotificationsQuery, NotificationsQueryVariables>;
export const GetMealPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMealPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}},{"kind":"Field","name":{"kind":"Name","value":"meal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealId"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"newFileName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}},{"kind":"Field","name":{"kind":"Name","value":"optedOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cupCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cupcount"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMealPlansQuery, GetMealPlansQueryVariables>;
export const GetOldItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOldItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOldItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photoId"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"newFileName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOldItemsQuery, GetOldItemsQueryVariables>;
export const AddNewMealPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNewMealPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MealPlanInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNewMealPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealId"}},{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}},{"kind":"Field","name":{"kind":"Name","value":"cupCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"photoId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cupcount"}}]}}]}}]}}]} as unknown as DocumentNode<AddNewMealPlanMutation, AddNewMealPlanMutationVariables>;
export const AddNewItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNewItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNewItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photoId"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}}]}}]}}]}}]} as unknown as DocumentNode<AddNewItemMutation, AddNewItemMutationVariables>;
export const OptOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OptOut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optOut"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealPlanId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"mealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"residencyId"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}}]}}]}}]}}]} as unknown as DocumentNode<OptOutMutation, OptOutMutationVariables>;
export const AddPreferencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPreferences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferences"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferenceInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPreferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"preferences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferences"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealPlanId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealPlanId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealId"}},{"kind":"Field","name":{"kind":"Name","value":"mealTime"}}]}}]}}]}}]} as unknown as DocumentNode<AddPreferencesMutation, AddPreferencesMutationVariables>;
export const GetAnnouncementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnnouncements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAnnouncements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"announcementId"}},{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"messManagerId"}},{"kind":"Field","name":{"kind":"Name","value":"messManager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messManagerId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>;
export const AddAnnouncementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAnnouncement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAnnouncement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"announcementId"}},{"kind":"Field","name":{"kind":"Name","value":"authorityId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"messManagerId"}}]}}]}}]} as unknown as DocumentNode<AddAnnouncementMutation, AddAnnouncementMutationVariables>;
export const ParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Participants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"}},{"kind":"Field","name":{"kind":"Name","value":"mealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"day"}}]}}]}}]}}]} as unknown as DocumentNode<ParticipantsQuery, ParticipantsQueryVariables>;
export const AbsenteesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Absentees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"absentees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AbsenteesQuery, AbsenteesQueryVariables>;
export const ExampleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExampleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ratings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"feedback"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedbackId"}},{"kind":"Field","name":{"kind":"Name","value":"startMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExampleQueryQuery, ExampleQueryQueryVariables>;
export const OptOutQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OptOutQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optedOutStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optedOut"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<OptOutQueryQuery, OptOutQueryQueryVariables>;
export const MealPreferenceStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MealPreferenceStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealPreferenceStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<MealPreferenceStatsQuery, MealPreferenceStatsQueryVariables>;
export const PendingFeedbacksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PendingFeedbacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingFeedbacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endMealPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feedbackId"}}]}}]}}]} as unknown as DocumentNode<PendingFeedbacksQuery, PendingFeedbacksQueryVariables>;
export const PostFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedbackId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntArray"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedbackId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedbackId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratings"}}}]}]}}]} as unknown as DocumentNode<PostFeedbackMutation, PostFeedbackMutationVariables>;
export const AssingedMessManagersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssingedMessManagers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assingedMessManagers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"call"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"residencyId"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AssingedMessManagersQuery, AssingedMessManagersQueryVariables>;
export const TillQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TillQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callUntil"}},{"kind":"Field","name":{"kind":"Name","value":"messManagerAssignedTill"}}]}}]} as unknown as DocumentNode<TillQueryQuery, TillQueryQueryVariables>;
export const CreateCallMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCallMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCall"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]} as unknown as DocumentNode<CreateCallMutationMutation, CreateCallMutationMutationVariables>;
export const PrevCallQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PrevCallQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prevCalls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"callId"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messManagerTimes"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"isCurrentMessManager"}},{"kind":"Field","name":{"kind":"Name","value":"residencyId"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PrevCallQueryQuery, PrevCallQueryQueryVariables>;
export const ApproveMessManagerApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveMessManagerApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messManagerApplicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveMessManagerApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messManagerApplicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messManagerApplicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"residencyId"}}]}}]}}]} as unknown as DocumentNode<ApproveMessManagerApplicationMutation, ApproveMessManagerApplicationMutationVariables>;
export const PrevCallsStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PrevCallsStudent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prevCallsWithAppOfResident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"call"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"callId"}}]}}]}}]}}]} as unknown as DocumentNode<PrevCallsStudentQuery, PrevCallsStudentQueryVariables>;
export const ApplyMessManagerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyMessManager"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"callId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyMessManager"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"callId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"callId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]} as unknown as DocumentNode<ApplyMessManagerMutation, ApplyMessManagerMutationVariables>;
export const MessManagingExperiencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessManagingExperiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messManagingExperiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"call"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessManagingExperiencesQuery, MessManagingExperiencesQueryVariables>;
export const VoteMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VoteMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vote"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}},{"kind":"Argument","name":{"kind":"Name","value":"vote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vote"}}},{"kind":"Argument","name":{"kind":"Name","value":"voteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voteId"}}]}}]}}]} as unknown as DocumentNode<VoteMutationMutation, VoteMutationMutationVariables>;
export const MarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seen"}},{"kind":"Field","name":{"kind":"Name","value":"notificationId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"voteId"}}]}}]}}]} as unknown as DocumentNode<MarkMutation, MarkMutationVariables>;
export const FullSeatStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullSeatStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullSeatStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeRooms"}},{"kind":"Field","name":{"kind":"Name","value":"freeSeats"}},{"kind":"Field","name":{"kind":"Name","value":"totalRooms"}},{"kind":"Field","name":{"kind":"Name","value":"totalSeats"}}]}}]}}]} as unknown as DocumentNode<FullSeatStatsQuery, FullSeatStatsQueryVariables>;
export const FullStudentStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullStudentStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullStudentStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalAttached"}},{"kind":"Field","name":{"kind":"Name","value":"totalResidents"}},{"kind":"Field","name":{"kind":"Name","value":"totalStudents"}},{"kind":"Field","name":{"kind":"Name","value":"totalTempResidents"}}]}}]}}]} as unknown as DocumentNode<FullStudentStatsQuery, FullStudentStatsQueryVariables>;
export const DepartmentWiseResidentStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DepartmentWiseResidentStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departmentWiseResidentStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deptName"}},{"kind":"Field","name":{"kind":"Name","value":"totalResidents"}}]}}]}}]} as unknown as DocumentNode<DepartmentWiseResidentStatsQuery, DepartmentWiseResidentStatsQueryVariables>;
export const GetAddedMealPlansByDateTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddedMealPlansByDateTime"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddedMealPlansByDateTime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"mealId"}}]}}]}}]} as unknown as DocumentNode<GetAddedMealPlansByDateTimeQuery, GetAddedMealPlansByDateTimeQueryVariables>;
export const GetMealPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMealPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mealTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mealId"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photoId"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newFileName"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMealPlanQuery, GetMealPlanQueryVariables>;
export const AllFloorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllFloors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allFloors"}}]}}]} as unknown as DocumentNode<AllFloorsQuery, AllFloorsQueryVariables>;
export const SelectedFloorRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelectedFloorRooms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"residentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomStatus"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectedFloorRooms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"residentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"residentType"}}},{"kind":"Argument","name":{"kind":"Name","value":"roomStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"floorNo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"floorNo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"roomNo"}},{"kind":"Field","name":{"kind":"Name","value":"seats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatId"}},{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"floor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floorNo"}},{"kind":"Field","name":{"kind":"Name","value":"roomLabelLen"}}]}}]}}]}}]} as unknown as DocumentNode<SelectedFloorRoomsQuery, SelectedFloorRoomsQueryVariables>;
export const DeleteNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}}}]}]}}]} as unknown as DocumentNode<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const SelectedRoomStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelectedRoomStudents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectedRoomStudents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"residency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seatLabel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"isCurrentMessManager"}}]}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}}]}}]}}]} as unknown as DocumentNode<SelectedRoomStudentsQuery, SelectedRoomStudentsQueryVariables>;
export const ReviseApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReviseApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviseApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}},{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revisionId"}}]}}]}}]} as unknown as DocumentNode<ReviseApplicationMutation, ReviseApplicationMutationVariables>;
export const ResubmitMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResubmitMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addedFileIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntArray"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removedFilesIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntArray"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reSubmitApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addedFileIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addedFileIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"removedFilesIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removedFilesIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}}]}}]}}]} as unknown as DocumentNode<ResubmitMutationMutation, ResubmitMutationMutationVariables>;
export const RetrieveStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RetrieveStudents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retrieveStudents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"levelTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}},{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"}},{"kind":"Field","name":{"kind":"Name","value":"department"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RetrieveStudentsQuery, RetrieveStudentsQueryVariables>;
export const Filter_StudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FILTER_STUDENT"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"residencyStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"select"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"departments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"levelTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<Filter_StudentQuery, Filter_StudentQueryVariables>;
export const GetComplaintsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComplaints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComplaints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complaintId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]} as unknown as DocumentNode<GetComplaintsQuery, GetComplaintsQueryVariables>;
export const GetComplaints2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComplaints2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"complaintTypeFilerInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComplaints2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complaintId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]} as unknown as DocumentNode<GetComplaints2Query, GetComplaints2QueryVariables>;
export const GetComplaintsByStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComplaintsByStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComplaintsByStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complaintId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]} as unknown as DocumentNode<GetComplaintsByStudentQuery, GetComplaintsByStudentQueryVariables>;
export const GetComplaintsByTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComplaintsByType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComplaintsByType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complaintId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]} as unknown as DocumentNode<GetComplaintsByTypeQuery, GetComplaintsByTypeQueryVariables>;
export const GetComplaintsFromDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComplaintsFromDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComplaintsFromDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complaintId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]} as unknown as DocumentNode<GetComplaintsFromDateQuery, GetComplaintsFromDateQueryVariables>;
export const ComplaintMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"complaintMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComplaint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complaintId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"student9DigitId"}}]}}]}}]}}]} as unknown as DocumentNode<ComplaintMutationMutation, ComplaintMutationMutationVariables>;