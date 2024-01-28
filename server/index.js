const server = require("./src/server");
const { conn } = require('./src/db');
const { fetchClubs } = require("./src/utils/fetch-clubs");
const PORT = 3001;

conn.sync({ force: true }).then(async () => {
    await fetchClubs();
    server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}) 
}).catch(error => console.error(error))