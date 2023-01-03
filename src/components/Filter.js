import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../features/vehicle/vehicleSlice';
import '../scss/Filter.scss';

const Filter = () => {
    const [ filter, setFilter ] = useState({
        make: '',
        model: '',
        year: ''
    });
    const { vehicles } = useSelector(state => state.vehicle);
    const dispatch = useDispatch();

    const handleInput = e => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        dispatch(updateFilter(filter));
    }, [filter, dispatch]);

    return (
        <div className='Filter'>
            <div className="flex flex-wrap">
                <div className="w-1/2 md:w-1/3 p-2 md:order-1">
                    <label className="block font-bold mb-2 text-gray-300" htmlFor="make">
                        Make
                    </label>
                    <div className="relative">
                        <select onChange={handleInput} value={filter.make} name="make" className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="make">
                            <option value="">Any</option>
                            {vehicles.map(vehicle => <option key={vehicle._id} value={vehicle.make}>{vehicle.make}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-2 md:order-2 order-4">
                    <label className="block font-bold mb-2 text-gray-300" htmlFor="model">
                        Model
                    </label>
                    <input onInput={handleInput} name="model" className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="model" type="text" placeholder="Any" />
                </div>
                <div className="w-1/2 md:w-1/3 p-2 md:order-3">
                    <label className="block font-bold mb-2 text-gray-300" htmlFor="year">
                        Year
                    </label>
                    <div className="relative">
                        <select onChange={handleInput} value={filter.year} name="year" className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="make">
                            <option value="">Any</option>
                            {vehicles.map(vehicle => <option key={vehicle._id} value={vehicle.mfc_year}>{vehicle.mfc_year}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;