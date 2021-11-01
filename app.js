const express = require("express");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const mongose = require('mongoose');
const HttpError = require("./models/http-error")

const app = express();
app.use(express.json());

app.use("/api/places", placesRoutes); // => /api/places...
app.use("/api/users", usersRoutes); // => /api/users...

app.use((req, res, next) => {
  const error = new HttpError("Could Not Find This Route", 404);
  throw error;
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongose.connect("mongodb+srv://User:N4tx7sVyidCj5iEO@cluster0.hbohr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
  app.listen(3000);
  console.log('listening on port 3000!');
})
.catch(err => {
  console.log(err)
})

