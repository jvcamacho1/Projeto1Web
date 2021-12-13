const express = require("express");
const mongoose = require("mongoose");
const routes = require("./router");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 3000
app.use(express.json());

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

app.listen(port);
