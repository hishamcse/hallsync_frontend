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