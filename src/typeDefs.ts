export const typeDefs = `
    scalar Object

    type UserModel{
      id: String
      username: String
      userid: String
    }

    type Query {
      user(userid:String): UserModel
    }

    type Mutation {
      userMutation(
        username:String
        userid:String
      ):UserModel
    } 
       
`;