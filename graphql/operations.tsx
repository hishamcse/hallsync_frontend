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
        roomChangeApplication {
          roomChangeApplicationId
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
