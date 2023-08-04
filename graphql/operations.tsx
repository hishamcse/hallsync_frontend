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
      newApplication {
        newApplicationId
      }
      student {
        name
        email
        student9DigitId
        department {
          name
          shortName
        }
        batch {
          year
        }
        phone
        levelTerm{
          label
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
    mutation TempSeatApplication($from: String!, $days: Float!, $roomPref: Float!, $q2: Boolean!, $q1: Boolean!) {
      tempSeatApplication(from: $from, days: $days, roomPref: $roomPref, q2: $q2, q1: $q1) {
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