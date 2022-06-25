export const playgroundQuery = `mutation signup {
  signup(
    data: {
      name: "Sample User"
      email: "user1@example.com"
      password: "admin1234"
      age: 18
    }
  ) {
    user {
      id
      name
      email
      age
      createdAt
      updatedAt
      version
    }
    errors {
      field
      message
    }
  }
}

mutation login {
  login(
    data: {
      email: "user1@example.com",
      password: "admin1234"
    }
  ) {
    user {
      id
      name
      email
      age
    }
    errors {
      field
      message
    }
  }
}

mutation refreshToken {
  refreshToken {
    user {
      id
      name
      email
      age
    }
  }
}

mutation logout {
  logout
}

query me {
  me {
    id
    name
    email
    age
    createdAt
    updatedAt
    version
    posts(first: 50) {
      edges {
        node {
          id
          title
          body
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
    comments(first: 50) {
      edges {
        node {
          id
          text
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}


query findUsers {
  users(first: 50) {
    edges {
      node {
        id
        name
        email
        age
        createdAt
        updatedAt
        version
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}


query findUser {
  user(id: "<replace with user id>") {
    id
    name
    email
    age
    createdAt
    updatedAt
    version
  }
}


mutation updateProfile {
  updateProfile(data: {
    name: "Sample User 2",
    age: 19
    }
  ) {
    errors {
      field
      message
    }
    user {
      id
      name
      email
      age
      createdAt
      updatedAt
      version
    }
  }
}

mutation updatePassword {
  updatePassword(
    data: {
      currentPassword: "admin1234",
      newPassword: "user12345",
      confirmPassword: "user12345"
    }
  ) {
    user {
      id
      name
      email
      age
      createdAt
      updatedAt
      version
    }
    errors {
      field
      message
    }
  }
}


mutation depositSaving {
  depositSaving(
    data: {
      amount: 123
    }
  ) {
    balanceAmount
    errors {
      field
      message
    }
  }
}
`;
