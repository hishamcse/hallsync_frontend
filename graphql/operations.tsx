import { graphql } from "./__generated__";

export const GET_DEPTS = graphql(`
  query Departments {
    departments {
      deptCode
      name
      shortName
    }
  }
`);

export const LOGIN = graphql(`
  mutation Login($password: String!, $loginId: String!) {
    login(password: $password, id: $loginId) {
      student {
        studentId
        residencyStatus
        residency {
          isCurrentMessManager
            seat {
              room {
                roomNo
                floor {
                  floorNo
                  roomLabelLen
                }
              }
            }
        }
      }
      token
      authority {
        authorityId
        role
      }
    }
  }
`);

export const APPLICATIONS = graphql(`
  query Applications($page : Float!, $filters: FilterInput, $sort : SortInput, $search : SearchInput) {
    applications(page : $page, filters: $filters, sort : $sort, search : $search) {
      applications {
        applicationId
        createdAt
        lastUpdate
        status
        student {
          student9DigitId
          batch {
            year
          }
          department {
            shortName
          }
          levelTerm {
            label
          }
          name
          residencyStatus
          studentId
        }
        newApplication {
          newApplicationId
        }
        seatChangeApplication {
          seatChangeApplicationId
        }
        tempApplication {
          applicationId
        }
      }
      count
    }
  }
`);

export const FILTERS_DATA = graphql(`
  query Query {
    applicationStatus{
      status
      select
    }
    applicationTypes
    batches {
      year
    }
    departments {
      shortName
    }
    levelTerms {
        label
    }
  }
`);

export const SORT_DATA = graphql(`
  query Batches {
    batches {
      year
    }
  }
`);

export const GET_APPLICATION = graphql(`
  query ApplicationDetails($applicationId: Float!) {
      applicationDetails(applicationId: $applicationId) {
        applicationId
        createdAt
        lastUpdate
        status
        attachedFiles {
          uploadedFile {
            fileName
            uploadedFileId
            newFileName
          }
        }
        student {
          student9DigitId
          batch {
            year
          }
          department {
            shortName
          }
          levelTerm {
            label
          }
          name
          residencyStatus
          studentId
          residency {
            seat {
              room {
                roomNo
                floor {
                  floorNo
                  roomLabelLen
                }
              }
              seatLabel
            }
          }
          tempResidencyHistory {
            from
            to
            seat {
              room {
                roomNo
                floor {
                  floorNo
                  roomLabelLen
                }
              }
            }
          }
        }
        newApplication {
          newApplicationId
          questionnaire {
            q1
            q2
            questionnaireId
          }
        }
        tempApplication {
          from
          prefSeat {
            room {
              roomNo
              floor {
                floorNo
                roomLabelLen
              }
            }
            seatLabel
            seatId
          }
          days
        }
        seatChangeApplication {
          reason
          seatChangeApplicationId
          toSeat {
            seatLabel
            room {
              floor {
                floorNo
                roomLabelLen
              }
              roomNo
            }
          }
          toSeatId
          applicationId
          votes {
            status
            reason
            student {
              student9DigitId
              name
              department {
                shortName
              }
              batch {
                year
              }
              levelTerm {
                label
              }
            }
          }
        }
      }
   }
   
`)

export const GET_INFO = graphql(`
  query SelfInfo {
    selfInfo {
      student {
        studentId
        residencyStatus
        residency {
          isCurrentMessManager
            seat {
              room {
                roomNo
                floor {
                  floorNo
                  roomLabelLen
                }
              }
            }
        }
      }
      authority {
        authorityId
        role
      }
      token
    }
  }
`)

export const MY_APPLICATIONS = graphql(`
  query Myapplications {
  myapplications {
    applicationId
    createdAt
    lastUpdate
    status
    student {
      student9DigitId
      batch {
        year
      }
      department {
        shortName
      }
      levelTerm {
        label
      }
      name
      residencyStatus
      studentId
    }
    newApplication {
      newApplicationId
    }
    seatChangeApplication {
      seatChangeApplicationId
    }
    tempApplication {
      applicationId
    }
  }
}

`)

export const POST_NEW_APPLICATION = graphql(`
    mutation NewSeatApplication($attachedFileIds: IntArray!, $q2: Boolean!, $q1: Boolean!) {
         newSeatApplication(attachedFileIds: $attachedFileIds, q2: $q2, q1: $q1) {
            application {
                createdAt
            }
            applicationId
        }
    }
`)

export const POST_TEMP_APPLICATION = graphql(`
    mutation TempSeatApplication($from: String!, $days: Float!, $prefSeatId: Float!, $q2: Boolean!, $q1: Boolean!) {
      tempSeatApplication(from: $from, days: $days, prefSeatId: $prefSeatId, q2: $q2, q1: $q1) {
        applicationId
        application {
          createdAt
          tempApplication {
            days
            applicationId
          }
        }
      }
    }
`)

export const POST_SEAT_CHANGE_APPLICATION = graphql(`
    mutation SeatChangeApplication($reason: String!, $seatId: Float!) {
      seatChangeApplication(reason: $reason, seatId: $seatId) {
        applicationId
        seatChangeApplicationId
        application {
          createdAt
          seatChangeApplication {
            reason
          }
        }
      }
    }
`)


export const GET_FREE_FLOORS = graphql(`
  query FreeFloors {
    freeFloors {
      floorId
      floorNo
    }
  }
`)

export const GET_FREE_ROOMS_IN_FLOOR = graphql(`
  query FreeRoomInFloor($floorNo: Float!) {
    freeRoomInFloor(floorNo: $floorNo) {
      roomNo
      roomId
    }
  }
`)

export const GET_FREE_SEATS_IN_ROOM = graphql(`
  query FreeSeatInRoom($floorNo:Float!, $roomNo: Float!) {
    freeSeatInRoom(floorNo:$floorNo,roomNo: $roomNo) {
      seatId
      seatLabel
    }
  }
`)

export const GET_FREE_SEAT = graphql(`
  query FreeSeatQuery {
    freeSeat {
      seatId
      room {
        roomNo
        floor {
          floorNo
        }
      }
      seatLabel
    }
  }
`)

export const APPROVE_NEW_SEAT_APPLICATION = graphql(`

mutation Mutation($seatId: Float!, $newApplicationId: Float!) {
  approveNewApplication(seatId: $seatId, newApplicationId: $newApplicationId) {
    residencyId
  }
}`)

export const APPROVE_TEMP_SEAT_APPLICATION = graphql(`
    mutation ApproveTempSeatApplication($from: String!, $days: Float!, $seatId: Float!, $applicationId: Float!) {
      approveTempSeatApplication(from: $from, days: $days, seatId: $seatId, applicationId: $applicationId) {
        days
        from
        seat {
          room {
            roomNo
            floor {
              floorNo
              roomLabelLen
            }
          }
        }
      }
    }

`)

export const APPROVE_SEAT_CHANGE_APPLICATION = graphql(`
    mutation ApproveSeatChangeApplication($seatId: Float!, $seatChangeApplicationId: Float!) {
      approveSeatChangeApplication(seatId: $seatId, seatChangeApplicationId: $seatChangeApplicationId) {
        seatId
        student {
          name
        }
      }
    }

`)

export const REJECT_APPLICATION = graphql(`
  mutation RejectApplication($applicationId: Float!) {
    rejectApplication(applicationId: $applicationId) {
      applicationId
    }
  }
`)


export const GET_NOTIFICATIONS = graphql(`
  query Notifications {
    notifications {
      notifications {
        time
        text
        seen
        notificationId
        applicationId
        voteId
        vote {
          voteId
          seatChangeApplication {
            application {
              student {
                batch {
                  year
                }
                department {
                  shortName
                }
                name
                levelTerm {
                  label
                }
                email
                phone
                student9DigitId
              }
            }
          }
        }
      }
      unseenCount
    }
  }
`)


export const GET_MULTIPLE_MEALPLANS = graphql(`
   query GetMealPlans($to: String!, $from: String!) {
  getMealPlans(to: $to, from: $from) {
    mealPlanId
    mealTime
    day
    mealTime
    meal {
      mealId
      items {
        itemId
        name
        photoId
        type
        photo {
          file {
            fileName
            newFileName
          }
        }
      }
    }
    preferences {
      item {
        itemId
        name
        type
      }
      order
    }
    optedOut {
      studentId
    }
    cupCount {
      cupcount
      itemId
    }
  }
}

`)

export const GET_OLD_MEAL_ITEMS = graphql(`
query GetOldItems {
  getOldItems {
    itemId
    name
    type
    photoId
    photo {
      file {
        fileName
        newFileName
      }
    }
  }
}
`)

export const ADD_MEAL_PLAN = graphql(`
   mutation AddNewMealPlan($items: MealPlanInput!, $mealTime: String!, $date: String!) {
      addNewMealPlan(items: $items, mealTime: $mealTime, date: $date) {
        day
        mealId
        mealPlanId
        mealTime
        cupCount {
          item {
            name
            itemId
            photoId
            type
          }
          cupcount
        }
      }
    }

`)

export const ADD_NEW_ITEM = graphql(`
    mutation AddNewItem($type: String!, $name: String!, $fileId: Float!) {
      addNewItem(type: $type, name: $name, fileId: $fileId) {
        itemId
        name
        type
        photo {
          photoId
          uploadedFileId
        }
      }
    }
`)

export const OPT_OUT_MEAL = graphql(`
    mutation OptOut($mealPlanId: Float!) {
      optOut(mealPlanId: $mealPlanId) {
        mealPlanId
        time
        mealPlan {
          day
          mealTime
        }
        residencyId
        residency {
          studentId
        }
      }
    }

`)

export const ADD_PREFERENCES = graphql(`
     mutation AddPreferences($preferences: PreferenceInput!, $mealPlanId: Float!) {
      addPreferences(preferences: $preferences, mealPlanId: $mealPlanId) {
        mealPlanId
        order
        student {
          student9DigitId
        }
        itemId
        item {
          name
          type
        }
        mealPlan {
          day
          mealId
          mealTime
        }
      }
    }

`)

export const GET_ANNOUNCEMENTS = graphql(`
    query GetAnnouncements {
      getAnnouncements {
        announcementId
        authorityId
        createdAt
        title
        details
        messManagerId
        messManager {
          messManagerId
        }
        authority {
          role
        }
      }
    }

`)

export const ADD_ANNOUNCEMENT = graphql(`
    mutation AddAnnouncement($details: String!, $title: String!) {
      addAnnouncement(details: $details, title: $title) {
        announcementId
        authorityId
        createdAt
        title
        details
        messManagerId
      }
    }

`)

export const GET_PARTICIPATIONS = graphql(`
  query Participants($mealTime: String!, $from: String!) {
    participants(mealTime: $mealTime, from: $from) {
      _count
      mealPlan {
        mealPlanId
        day
      }
    }
  }
`)


export const GET_ABSENTEES = graphql(`
query Absentees($take: Float!, $from: String!) {
  absentees(take: $take, from: $from) {
    _count
    residency {
      student {
        student9DigitId
      }
    }
  }
}
`)

export const GET_RATINGS = graphql(`
query ExampleQuery($date: String!) {
  ratings(date: $date) {
    avg
    type
    feedback {
      feedbackId
      startMealPlan {
        day
      }
      endMealPlan {
        day
      }
    }
  }
}
`)


export const GET_OPT_OUTS = graphql(`
  query OptOutQuery($mealTime: String!, $date: String!) {
    optedOutStats(mealTime: $mealTime, date: $date) {
      optedOut
      total
    }
  }
`)

export const GET_MEAL_PREF_STATS = graphql(`
  query MealPreferenceStats($mealTime: String!, $date: String!) {
    mealPreferenceStats(mealTime: $mealTime, date: $date) {
      count
      order
      item {
        itemId
        name
        type
      }
    }
  }
`)


export const GET_PENDING_FEEDBACKS = graphql(`
query PendingFeedbacks {
  pendingFeedbacks {
    startDate
    startMealPlan {
      day
    }
    endMealPlan {
      day
    }
    feedbackId
  }
}
`)

export const POST_FEEDBACK = graphql(`
  mutation PostFeedback($feedbackId: Float!, $ratings: IntArray!) {
    postFeedback(feedbackId: $feedbackId, ratings: $ratings)
  }
`)



export const GET_ASSINGED_MESS_MANAGERS = graphql(`
query AssingedMessManagers {
  assingedMessManagers {
    call {
      from 
      to
    }
    residencyId
    residency  {
      student {
      name
      phone
      email
      levelTerm {
        label
      }
      batch {
        year
      }
      student9DigitId
      }
    }
  }
}
`)


export const GET_ASSIGNED_TILL = graphql(`
  query TillQuery {
    callUntil
    messManagerAssignedTill
  }
`)

export const CREATE_CALL = graphql(`
  mutation CreateCallMutation($to: String!, $from: String!) {
    createCall(to: $to, from: $from) {
      callId
      createdAt
      from
      to
    }
  }
`)

export const PREV_CALLS = graphql(`
query PrevCallQuery {
  prevCalls {
    callId
    createdAt
    from
    to
    accepted
    applicationsCount
    applications {
      appliedAt
      applicationId
      callId
      residency {
        messManagerTimes
        from
        isCurrentMessManager
        residencyId
        student {
          batch {
            year
          }
          name
          levelTerm {
            label
          }
          student9DigitId
          department {
            shortName
          }
        }
      }
    }
  }
}
`)


export const APPROVE_MESS_MANAGER_APP = graphql(`
mutation ApproveMessManagerApplication($messManagerApplicationId: Float!) {
  approveMessManagerApplication(messManagerApplicationId: $messManagerApplicationId) {
    residencyId
  }
}
`)


export const GET_PREV_CALLS_STUDENT = graphql(`
  query PrevCallsStudent {
  prevCallsWithAppOfResident {
    application {
      status
    }
    call {
      from
      to
      createdAt
      callId
    }
  }
}
`)

export const APPLY_FOR_MESS_MANAGER = graphql(`
mutation ApplyMessManager($callId: Float!) {
  applyMessManager(callId: $callId) {
    applicationId
  }
}
`)

export const GET_MESS_MANAGER_EXPERIENCE = graphql(`
  query MessManagingExperiences {
    messManagingExperiences {
      call {
        from
        to
        authority {
          name
        }
      }
    }
  }
`)

export const POST_VOTE = graphql(`
  mutation VoteMutation($reason: String!, $vote: String!, $voteId: Float!) {
    vote(reason: $reason, vote: $vote, voteId: $voteId) {
      voteId
    }
  }`
)

export const MARK_NOTIFICATION_SEEN = graphql(`
mutation Mark($notificationId: Float!) {
  mark(notificationId: $notificationId)
}
`)

export const GET_SEAT_INFO_STATS = graphql(`
    query FullSeatStats {
      fullSeatStats {
        freeRooms
        freeSeats
        totalRooms
        totalSeats
      }
    }
`)

export const GET_STUDENT_INFO_STATS = graphql(`
    query FullStudentStats {
      fullStudentStats {
        totalAttached
        totalResidents
        totalStudents
        totalTempResidents
      }
    }
`)

export const GET_DEPT_WISE_RESIDENT_STATS = graphql(`
    query DepartmentWiseResidentStats {
      departmentWiseResidentStats {
        deptName
        totalResidents
      }
    }
`)

export const DELETE_NOTIFICATION = graphql(`
mutation DeleteNotification($notificationId: Float!) {
  deleteNotification(notificationId: $notificationId)
}
`)


export const GET_MEALPLANS_CALENDER = graphql(`
query GetAddedMealPlansByDateTime($mealTime: String!) {
  getAddedMealPlansByDateTime(mealTime: $mealTime) {
    day
    mealId
  }
}
`)


export const GET_MEAL_PLAN = graphql(`
query GetMealPlan($mealTime: String!, $date: String!) {
  getMealPlan(mealTime: $mealTime, date: $date) {
    meal {
      items {
        itemId
        name
        type
        photo {
          photoId
          file {
            newFileName
            fileName
          }
        }
      }
    }
  }
}
`)