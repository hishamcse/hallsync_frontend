import { graphql } from './__generated__';

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
        studentId,
        residencyStatus
        },
        token,
        authority {
        authorityId,
        role
        }
    }
    }
`)

export const APPLICATIONS = graphql(`
    query Applications {
    applications {
        applicationId
        createdAt
        lastUpdate
        status
        student {
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
    }
`)

export const FILTERS_DATA = graphql(`
    query Query {
    applicationStatus
    applicationTypes
    batches {
        year
    }
    departments {
        shortName
    }
    }
`)