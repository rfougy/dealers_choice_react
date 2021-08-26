const {
  db,
  syncAndSeed,
  models: { Pokemon, Owner },
} = require("./db");
const express = require("express");
const app = express();

//Requests...
//Retrieve all Pokemon Data
app.get("/pokemon", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
});
//Retrieve Specific Pokemon...
app.get("/pokemon/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
  } catch (err) {
    next(err);
  }
});
//Add New Pokemon...
app.post("/pokemon", async (req, res, next) => {
  try {
    await Pokemon.create({name: , element: })
  } catch (err) {
    next(err);
  }
});
//Delete Pokemon...
app.delete("/pokemon", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
});

//API Requests...
app.get("/api/pokemon", async (req, res, next) => {
  try {
    res.send(await Pokemon.findAll());
  } catch (err) {
    next(err);
  }
});

app.get("/api/owners", async (req, res, next) => {
  try {
    res.send(
      await Owner.findAll({
        include: {
          model: Pokemon,
          as: "pokemon",
        },
      })
    );
  } catch (err) {
    next(err);
  }
});

//Middleware: Error Handler...
app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send("An error has occurred!");
});

//Syncing Data to DB, listening on PORT...
const init = async () => {
  try {
    await db.sync();
    server.listen(PORT, () =>
      console.log(`

          Listening on port ${PORT}

          http://localhost:${PORT}/

      `)
    );
  } catch (err) {
    console.log(`There was an error starting up!`, err);
  }
};

init();
