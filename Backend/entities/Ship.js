import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Ship = db.define("Ship", 
{
    ShipId:  // PK of the Ship
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    ShipName:  // name of the ship
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    ShipDisplacement:  // Weight of the ship
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
    // Ship has an id (integer, primary key), a name (string of at least 3 characters), a displacement (integer greater than 50).
});

export default Ship;