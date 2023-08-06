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
      }
      unseenCount
    }
  }
`)