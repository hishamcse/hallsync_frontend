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
      }
      authority {
        authorityId
        role
      }
      token
    }
  }
`)