import { dynamoDbClient } from "./pubSub";
import { ulid } from 'ulid';

export type UsersModel = {
  id: string;
  username: string;
  userid: string;
};

export const resolvers = {
  Mutation: {
    async userMutation(rootValue: any, args) { 
      const paramsItems = {
        TableName : 'Users',
        FilterExpression : 'userid = :userid',
        ExpressionAttributeValues : {':userid' : args.userid}            
      };
      const userItem = await dynamoDbClient.scan(paramsItems).promise();

      const user = { 
        "id": ulid(), 
        "username": args.username, 
        "userid":args.userid
      }; 

      const params = {
        TableName : 'Users',
        Item:user           
      };
      if(userItem.Count===0){
        const result = await dynamoDbClient.put(params).promise();
      }else{
        user.id = userItem.Items[0]['id'];
      }        
      return user;
    }
  },
  Query: {
    user: async (_, { userid }) => {
      const params = {
          TableName : 'Users',
          FilterExpression : 'userid = :userid',
          ExpressionAttributeValues : {':userid' : userid}            
      };
      const result = await dynamoDbClient.scan(params).promise();
      return result.Items[0];
    }
  }
};
