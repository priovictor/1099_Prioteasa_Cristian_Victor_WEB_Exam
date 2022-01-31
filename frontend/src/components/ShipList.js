import {useState, useEffect} from 'react';
import {get, remove} from '../Calls';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {shipRoute} from '../ApiRoutes';
import {useNavigate } from 'react-router-dom';

export default function ShipList(){
    
    const [rows, setRows] = useState([]);      // empty array
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {                    // async method
        let data = await get(shipRoute);    // path the route
        setRows(data);
    }, [needUpdate]);

    const deleteShip = async(id, index) => {
        await remove(shipRoute, id);
        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    }

    return(
        <div>
            <div>
                <Button
                    variant='outlined'                 // more types on material UI
                    color="primary"
                    startIcon={<AddIcon />}             // add any type of icon
                    onClick={() => {navigate("AddShip")}}
                >
                    Add new Ship
                </Button>
            </div>

            <br/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ship Id</TableCell>
                            <TableCell align="right">Ship Name</TableCell>
                            <TableCell align="right">Ship ShipDisplacement</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ShipId}>
                                <TableCell component="th" scope="row">
                                    {row.ShipId}
                                </TableCell>
                                <TableCell align='right'>{row.ShipName}</TableCell>
                                <TableCell align='right'>{row.ShipDisplacement}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => navigate(`/AddShip/${row.ShipId}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteShip(row.ShipId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}