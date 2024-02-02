import { config } from "dotenv";
import axios from 'axios';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { log } from "console";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { API_TOKEN } = process.env;
 
config();

const saveImageLocally = async (url, fileName, saveDirectory) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const filePath = join(saveDirectory, fileName);
    writeFileSync(filePath, Buffer.from(response.data, 'binary'));
  } catch (error) {
    console.error(`Error while downloading ${fileName}: ${error.message}`);
  }
};

const downloadImages = async () => {
  try {

    const saveDirectory = join(__dirname, '../images/crests');

    const response = await axios.get('https://api.football-data.org/v4/teams', {
      headers: {
        'X-Auth-Token': API_TOKEN
      },
    });
    
    const teams = response.data.teams;
    
    if (Array.isArray(teams)) {
      teams.forEach((team) => {
        const {shortName, crest } = team;

        const crestFileName = `${shortName.replace(/\s/g, '_').toLowerCase()}.png`;
        saveImageLocally(crest, crestFileName, saveDirectory);
    
      });
    }

  } catch (error) {
    console.error(`Error getting teams: ${error.message}`);
  }
};

export { downloadImages };
