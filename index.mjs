import pkg from "./src/server.js";  
const { listen } = pkg;
import sequelize from './src/models/db.js';
import clubFetch from './src/utils/fetch-clubs.js';
const { fetchClubs } = clubFetch;
const PORT = 8080;

sequelize.sync({ force: false }).then(async () => {
    await fetchClubs();
    listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(error => console.error(error));
