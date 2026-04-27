const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://simpleDBUser:GDLa6fxXe1yV4LZQ@cluster0.snyhksc.mongodb.net/?appName=cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Simple crud server running, hello world ");
});

async function run() {
  try {
    await client.connect();

    const usersDB = client.db("usersDB");
    const myCollation = usersDB.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = myCollation.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("need user with id", id);
      const query = { _id: new ObjectId(id) };
      const result = await myCollation.findOne(query);
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const updateUser = req.body;
      const id = req.params.id;
      console.log("to update", id, updateUser);
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
        },
      };
      const option = {};
      const result = await myCollation.updateOne(query, update, option);
      res.send(result);
    });

    // delete from database
    app.delete("/users/:id", async (req, res) => {
      // console.log(req.params.id);
      // console.log("delete user from database");
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myCollation.deleteOne(query);
      res.send(result);
    });

    // save this users data to the database (via server)

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("user details", newUser);
      const result = await myCollation.insertOne(newUser);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. you successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`crud server running on port: ${port}`);
});
