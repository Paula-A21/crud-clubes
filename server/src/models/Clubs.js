const { DataTypes } = require("sequelize");

module.exports = (sequelize) => { 
    sequelize.define("Club", {
        id_UUID: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id:{ //id
            type: DataTypes.INTEGER
        },
        country_name:{ //area.name
            type: DataTypes.STRING, 
            allowNull: false
        },
        cup_name:{ //name
            type: DataTypes.STRING, 
            allowNull: false
        },
        start_of_season:{ //currentSeason.startDate
            type: DataTypes.DATEONLY,  
            allowNull: false
        },
        end_of_season:{ //currentSeason.endDate
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        winner_name:{ //winner.shortName
            type: DataTypes.STRING,
            allowNull: true 
        },
        winner_adress:{ //winner.address
            type: DataTypes.STRING, 
            allowNull: true
        }
    },
    {
        timestamps:false
    })
}