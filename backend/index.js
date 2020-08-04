if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const hapi = require('@hapi/hapi');
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");   

const client = new MongoClient(process.env.MONGODB_CONNECTION);

async function run() {
  await client.connect();
  const db = client.db("lmaobook");
  const postCollection = db.collection("posts");

  const server = hapi.server({
    port: port,
  });

  server.route({
    method: 'GET',
    path:'/posts',
    handler: async (request, h) => {
      const postsCursor = await postCollection.find({}).sort({ timestamp: -1}).limit(20);
      const posts = await postsCursor.toArray();
      return posts;
    }
  });

  server.route({
    method: 'POST',
    path:'/posts',
    handler: async (request, h) => {
      const name = request.payload.name;
      const message = request.payload.message;

      const post = {
        name: name,
        message: message,
        timestamp: new Date().getTime()
      };

      await postCollection.insertOne(post);

      return { success: true };
    }
  });

  await server.start();
  console.log(`Server running on port ${port}`);
}

run()







