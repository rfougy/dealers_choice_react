const Sequelize = require("sequelize");
const { STRING, ENUM, UUID, UUIDV4 } = Sequelize;
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
    type: ENUM("electric", "fire", "water", "earth", "unknown"),
    defaultValue: "unknown",
    allowNull: false,
  },
});

const Owner = db.define("owner", {
  name: {
    type: STRING,
    allowNull: false,
  },
});

//Creating DB Relationships...
Pokemon.belongsTo(Owner, { as: "owner" });
Owner.hasMany(Pokemon, { as: "pokemon", foreignKey: "ownerId" });

//Inserting Data into Tables...
const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [pikachu, charizard, bulbasaur, squirtle, ash, brock, misty] =
    await Promise.all([
      Pokemon.create({ name: "pikachu", element: "electric" }),
      Pokemon.create({ name: "charizard", element: "fire" }),
      Pokemon.create({ name: "bulbasaur", element: "earth" }),
      Pokemon.create({ name: "squirtle", element: "water" }),

      Owner.create({ name: "ash" }),
      Owner.create({ name: "brock" }),
      Owner.create({ name: "misty" }),
    ]);
  //Creating Relationships Between Specific Data...
  pikachu.ownerId = ash.id;
  charizard.ownerId = ash.id;
  bulbasaur.ownerId = brock.id;
  squirtle.ownerId = misty.id;
  //Saving Relationships Declared Above...
  await Promise.all([
    await pikachu.save(),
    await charizard.save(),
    await bulbasaur.save(),
    await squirtle.save(),
  ]);
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Pokemon,
    Owner,
  },
};
