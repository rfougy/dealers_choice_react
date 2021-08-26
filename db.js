const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/pokemon_db"
);

//Creating Tables...
const Pokemon = db.define("pokemon", {
  name: {
    type: STRING,
    allowNull: false,
  },
  element: {
    type: ENUM("Electric", "Fire", "Water", "Earth", "Unknown"),
    defaultValue: "Unknown",
    allowNull: false,
  },
});

const Owner = db.define("owner", {
  name: {
    type: STRING,
    allowNull: false,
  },
});t

//Creating DB Relationships...
Pokemon.belongsTo(Owner, { as: "owner" });
Owner.hasMany(Pokemon, { as: "pokemon", foreignKey: "ownerId" });

//Inserting Data into Tables...
const syncAndSeed = async() => {
  await db.sync({ force: true });
  const [Pikachu, Squirtle, Bulbasaur, Charizard, Ash Ketchum, Brock, Misty] = await Promise.all([
    Pokemon.create({name: 'Pikachu', type: 'Electric'}),
    Pokemon.create({name: 'Squirtle', type: 'Water'}),
    Pokemon.create({name: 'Bulbasaur', type: 'Earth'}),
    Pokemon.create({name: 'Charizard', type: 'Fire'}),

    Owner.create({name: 'Ash Ketchum'}),
    Owner.create({name: 'Brock'}),
    Owner.create({name: 'Misty'}),
  ])
}

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
