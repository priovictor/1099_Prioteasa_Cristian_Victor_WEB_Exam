import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const CrewMember = db.define("CrewMember", 
{
    CrewMemberId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    CrewMemberName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    CrewMemberRole:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    ShipId:   // FK from Ship
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    // CrewMember has an id (integer, primary key), a name, (string of at least 5 characters), 
    //a role (from a limited set of possible roles e.g. CAPTAIN, BOATSWAIN).
});

export default CrewMember;