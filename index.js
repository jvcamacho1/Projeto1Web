const express = require("express");
const mongoose = require("mongoose");
const routes = require("./router");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "production"){
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

mongoose
  .connect(
    "mongodb+srv://tester:teste123@cluster0.fy1ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(
      "Error in DB connection : " + JSON.stringify(err, undefined, 2)
    );
  });

app.use("/api", routes);

app.listen(3000);
