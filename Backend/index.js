import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './dbConfig.js';
import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';
import Ship from './entities/Ship.js';
import CrewMember from './entities/CrewMember.js';
import LikeOp from './Operators.js';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

let conn;

mysql.createConnection({
    user : DB_USERNAME,
    password : DB_PASSWORD
})
.then((connection) => {
    conn = connection;
    return connection.query('CREATE DATABASE IF NOT EXISTS ShipDB');
})
.then(() => {
    return conn.end();
})
.catch((err) => {
    console.warn(err.stack);
})

// One to many Ship->CrewMember relationship
Ship.hasMany(CrewMember, {as : "CrewMembers", foreignKey: "ShipId"});
CrewMember.belongsTo(Ship, { foreignKey: "ShipId"});
db.sync();


// Async Funtions

async function getShips(){
    return await Ship.findAll({include: ["CrewMembers"]});
}
async function getShipById(id){
    return await Ship.findByPk(id, {include: ["CrewMembers"]});
}
async function createShips(ship){
    return await Ship.create(ship, {include: [{model: CrewMember, as : "CrewMembers"}]});
}
async function updateShip(id, ship){
    if (parseInt(id) !== ship.ShipId){
        console.log("Entity ID is different!");
        return;
    }

    let updateEntity = await getShipById(id);

    if (!updateEntity){
        console.log("There isn't a ship with this id");
        return;
    }

    return updateEntity.update(ship);
}
async function deleteShip(id){
    let deleteEntity = await getShipById(id);

    if (!deleteEntity){
        console.log("There isn't a ship with this id");
        return;
    }

    return await deleteEntity.destroy();
}



async function getCrewMember(){
    return await CrewMember.findAll();
}

async function createCrewMember(crewmember){
    return await CrewMember.create(crewmember);
}

async function getCrewMemberById(id){
    return await CrewMember.findByPk(id);
}

async function updateCrewMember(id, crewmember){
    if (parseInt(id) !== crewmember.CrewMemberId){
        console.log("Entity ID is different!");
        return;
    }

    let updateEntity = await getCrewMemberById(id);

    if (!updateEntity){
        console.log("There isn't a crew member with this id");
        return;
    }

    return updateEntity.update(crewmember);
}

async function deleteCrewMember(id){
    let deleteEntity = await getCrewMemberById(id);

    if (!deleteEntity){
        console.log("There isn't a crew member with this id");
        return;
    }

    return await deleteEntity.destroy();
}

async function filterShip(filter){
    let whereClause = {};

    if (filter.shipname)
        whereClause.ShipName = {[LikeOp]: `%${filter.shipname}%`};

    let whereIncludeClause = {};
    
    if (filter.shipdisplacement)
        whereIncludeClause.ShipDisplacement = {[LikeOp]: `%${filter.shipdisplacement}%`};
    
    return await Ship.findAll({
        include:[
            {
                model: CrewMember,
                as: "CrewMembers",
                where: whereIncludeClause
            }
        ],
        where: whereClause
    });   
}


// Routes for Async Functions
// routes ship
router.route('/ship').get( async (req, res) => {
    return res.json(await getShips());
})

router.route('/ship/:id').get( async (req, res) => {
    return res.json(await getShipById(req.params.id));
})

router.route('/ship').post( async (req, res) => {
    return res.json(await createShips(req.body));
})

router.route('/ship/:id').put(async (req, res) => {
    res.json(await updateShip(req.params.id, req.body));
})

router.route('/ship/:id').delete(async (req, res) => {
    res.json(await deleteShip(req.params.id));
})

router.route('/shipFilter').get( async (req, res) => {
    return res.json(await filterShip(req.query));
})

// routes crew member
router.route('/crewmember').get( async (req, res) => {
    return res.json(await getCrewMember());
})

router.route('/crewmember/:id').get( async (req, res) => {
    return res.json(await getCrewMemberById(req.params.id));
})

router.route('/crewmember').post( async (req, res) => {
    return res.json(await createCrewMember(req.body));
})

router.route('/crewmember/:id').put(async (req, res) => {
    res.json(await updateCrewMember(req.params.id, req.body));
})

router.route('/crewmember/:id').delete(async (req, res) => {
    res.json(await deleteCrewMember(req.params.id));
})


let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);