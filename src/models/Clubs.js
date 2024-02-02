import sequelize from '../models/db.js';
import { DataTypes } from 'sequelize';

export default () => { 
    const Clubs = sequelize.define("Clubs", {
        id_UUID: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id: {
            type: DataTypes.INTEGER
        },
        club_name: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        club_adress: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        club_foundation_year: { 
            type: DataTypes.INTEGER,  
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return Clubs;
};
