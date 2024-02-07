import app from './src/server.js';
import sequelize from './src/models/db.js';
import clubFetch from './src/utils/fetch-clubs.js';
const { fetchClubs } = clubFetch;
const PORT = 3001;

sequelize.sync({ force: false })
  .then(async () => {
    await fetchClubs();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error);
    process.exit(1); // Terminate the application in case of an error
  });

