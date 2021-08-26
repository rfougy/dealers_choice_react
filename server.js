const {
  db,
  syncAndSeed,
  models: { Pokemon, Owner },
} = require("./db");
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

//***Middlware...
//Dist Middleware...
app.use("/dist", express.static(path.join(__dirname, "dist")));
//Assets Middleware...
app.use("/assets", express.static(path.join(__dirname, "assets")));
//Logging Middleware...
app.use(morgan("dev"));
//Body Parsing Middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//***Requests...
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/pokemon", async (req, res, next) => {
  try {
    const pokemonList = await Pokemon.findAll();
    res.json(pokemonList);
  } catch (err) {
    next(err);
  }
});
app.get("/api/pokemon/:pokemonId", async (req, res, next) => {
  try {
    const selectedPokemon = await Pokemon.findByPk(req.params.pokemonId);
    res.json(selectedPokemon);
  } catch (err) {
    next(err);
  }
});
app.get("/api/owners", async (req, res, next) => {
  try {
    const ownerList = await Owner.findAll({
      include: {
        model: Pokemon,
        as: "pokemon",
      },
    });
    res.json(ownerList);
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
    // await db.sync();
    await syncAndSeed();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
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
