import {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Grid, TextField, Button} from '@material-ui/core';
import {post, put, get} from '../Calls';
import {shipRoute} from '../ApiRoutes';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddShip(){

    const [ship, setShip] = useState
    ({
        ShipName: "",
        ShipDisplacement: ""
    });

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    useEffect(async () => {
        if (!id)
            return;

        let data = await get(shipRoute, id);
        setShip(data);    
    }, [])

    const onChangeShip = e => {
        setShip({...ship, [e.target.name]: e.target.value});
    }

    const saveShip = async () => {
        if (!id)
            await post(shipRoute, ship);
        else
            await put(shipRoute, id, ship);
            
        navigate("/");    
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ShipName"
                        name="ShipName"
                        label="Ship Name"
                        fullWidth
                        value={ship.ShipName}
                        onChange={e => onChangeShip(e)}
                        />
                </Grid>

                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ShipDisplacement"
                        name="ShipDisplacement"
                        label="Ship Displacement"
                        fullWidth
                        value={ship.ShipDisplacement}
                        onChange={e => onChangeShip(e)}
                        />
                </Grid>

            </Grid>

            <Button color="primary" variant='contained' startIcon={<CancelIcon />}
                onClick={() => {navigate("/")}}
            >
                Cancel
            </Button>  

             <Button color="primary" variant='contained' startIcon={<SaveIcon />}
                onClick={saveShip}
            >
                Save
            </Button>  

        </div>
    )
}