require("dotenv").config();
const axios = require('axios');
const fs = require('fs');
const { API_TOKEN } = process.env;
const path = require('path');

const saveImageLocally = async (url, fileName, saveDirectory) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const filePath = path.join(saveDirectory, fileName);
    fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));
  } catch (error) {
    console.error(`Error while downloading ${fileName}: ${error.message}`);
  }
};

const downloadImages = async () => {
  try {

    const saveDirectory = '../images/crests'

    const response = await axios.get('https://api.football-data.org/v4/teams', {
      headers: {
        'X-Auth-Token': '2cba144727404798acb1f39490a5cf20'
      },
    });
    console.log(response);
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

downloadImages();
