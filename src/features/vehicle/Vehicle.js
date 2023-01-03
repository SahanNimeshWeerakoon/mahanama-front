import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOne } from './vehicleSlice';
import { useParams } from 'react-router-dom';

const Vehicle = ({vehicle}) => {
    const { vehicles } = useSelector(state => state.vehicle);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { make } = vehicles.find(vehicle => vehicle.id == id);

    return (
        <div>
            <button onClick={ () => dispatch(deleteOne(vehicle.id)) }>delete</button>
            <div>{make}</div>
        </div>
    );
}

export default Vehicle;