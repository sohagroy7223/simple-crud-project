const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
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

    // save this users data to the database (via server)
    app.post("/users", (req, res) => {
      const newUser = req.body;
      console.log("user details", newUser);
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
