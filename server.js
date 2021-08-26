

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