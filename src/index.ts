import { Server, DynamoDBEventProcessor } from 'aws-lambda-graphql';
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { subscriptionManager, connectionManager } from "./pubSub";

const server = new Server({
  connectionManager,
  eventProcessor: new DynamoDBEventProcessor(),
  resolvers,
  subscriptionManager,
  // use serverless-offline endpoint in offline mode
  ...(process.env.IS_OFFLINE
    ? {
        playground: {
          subscriptionEndpoint: 'ws://localhost:3001/dev',
        },
      }
    : {}),
  typeDefs
});

export const handleHttp = server.createHttpHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept'
    ],
    credentials: true
  }
});