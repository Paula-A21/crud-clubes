const { DataTypes } = require("sequelize");

module.exports = (sequelize) => { 
    sequelize.define("Clubs", {
        id_UUID: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id:{
            type: DataTypes.INTEGER
        },
        club_name:{ 
            type: DataTypes.STRING, 
            allowNull: false
        },
        club_adress:{ 
            type: DataTypes.STRING, 
            allowNull: false
        },
        club_foundation_year:{ 
            type: DataTypes.INTEGER,  
            allowNull: false
        }
    },
    {
        timestamps:false
    })
}