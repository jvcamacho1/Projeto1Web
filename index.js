const express = require("express");
const mongoose = require("mongoose");
const routes = require("./router");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://jvcamacho:jvcamacho090299@C@cluster0.gnso7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(
      "Error in DB connection : " + JSON.stringify(err, undefined, 2)
    );
  });

app.use("/api", routes);

app.listen(3000);
