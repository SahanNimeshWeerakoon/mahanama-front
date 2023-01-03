import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from './VehicleCard';
import { vehiclesGet } from './vehicleSlice';

import '../../App.scss'

const Vehicles = ({ filterObj }) => {
    const dispatch = useDispatch();
    const { vehicles } = useSelector(state => state.vehicle);
    let [ filteredVehicles, setFilteredVehicles ] = useState([...vehicles]);

    useEffect(() => {
        dispatch(vehiclesGet());
    }, [dispatch]);

    useEffect(() => {setFilteredVehicles([...vehicles])}, [vehicles]);

    useEffect(() => {
        let filteredVeh = vehicles.filter(veh => {
            if(
                (veh.make === filterObj.make || filterObj.make === '') &&
                (veh.model.toLowerCase() === filterObj.model.toLowerCase() || filterObj.model === '') &&
                (veh.mfc_year === filterObj.year || filterObj.year === '')
            ) {
                return true;
            } else {
                return false;
            }
        });
        setFilteredVehicles([...filteredVeh]);
    }, [filterObj, vehicles]);

    return (
        <div className='Vehicles flex justify-around flex-wrap'>
            {filteredVehicles.map((vehicle, idx) => <VehicleCard vehicle={vehicle} key={idx} />)}
        </div>
    );
}

export default Vehicles;