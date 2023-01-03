import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vehicleAdd, vehicleUpdate } from './vehicleSlice';
import { useParams, useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import '../../scss/AddEditVehicle.scss';

const AddEditVehicle = () => {
    const { id } = useParams();
    const { vehicles, emptyVehicle } = useSelector(state => state.vehicle);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    let existingVehicle = vehicles.find(vehicle => vehicle._id === id);
    existingVehicle = existingVehicle ? existingVehicle : emptyVehicle;
    const [ vehicle, setVehicle ] = useState({...existingVehicle});

    const handleChange = (e, negotiable, status) => {
        if (negotiable) {
                setVehicle({
                        ...vehicle,
                        negotiable: status
                });
        } else {
                setVehicle({
                    ...vehicle,
                    [e.target.name]: e.target.value
                });
        }
    }

    const setImagesArr = selectedImages => {
        // setVehicle(veh => {
        //         return {
        //                 ...veh,
        //                 img: [...veh.img, selectedImages.name]
        //         }
        // });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (id) {
            dispatch(vehicleUpdate(vehicle, id))
        } else {
            dispatch(vehicleAdd(vehicle));
        }
        navigate('/');
    }

    useEffect(() => {
        if (!userInfo) {
                navigate("/login");
        }
    }, [userInfo]);

    return (
        <div className='AddEditVehicle flex justify-center items-center flex-col'>
            <h2 className='text-center text-gray-700 text-3xl md:text-5xl pt-5' style={{textAlign: 'center'}}>{ id ? 'Edit Vehicle Details' : 'Add New Vehicle' }</h2>
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 md:mt-10 md:shadow-md h-auto p-10">
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Vehicle Number</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.vehNo} placeholder="Number" name="vehNo" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Make</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.make} placeholder="Make" name="make" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Model</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.model} placeholder="Model" name="model" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Manufacture Year</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.mfc_year} placeholder="Manufacture year" name="mfc_year" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Register Year</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.reg_year} placeholder="Register year" name="reg_year" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Trim Edition</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.trimEdition} placeholder="Trim Edition" name="trimEdition" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Condition</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.condition} placeholder="Condition" name="condition" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Body Type</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.bodyType} placeholder="Body Type" name="bodyType" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Fuel Type</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.fuel}  placeholder="Fuel" name="fuel" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Km</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.km} placeholder="Km" name="km" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Engine</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.engine} placeholder="Engine" name="engine" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Transmission</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.transmission} placeholder="Transmission" name="transmission" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Country</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.country} placeholder="Country" name="country" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Previous Owners</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.prevOwners} placeholder="Previous Owners" name="prevOwners" onChange={handleChange} />
                </div>
                <div className='mb-5'>
                        <label className='block w-full text-slate-600 ml-2 text-l'>Price</label>
                        <input className='block w-full bg-white p-3 border-b mb-2' type="text" value={vehicle.price} placeholder="Price" name="price" onChange={handleChange} />
                </div>
                <div className="mb-5">
                        <input id="default-radio-1" checked={vehicle.negotiable ? true : false} onChange={(e) => handleChange(e, 'negotiable', true)} type="radio" value="" name="negotiable" className="w-4 h-4" />
                        <label htmlFor="default-radio-1" className="text-l text-slate-600 ml-2">Negotiable</label>
                </div>
                <div className="mb-5">
                        <input checked={!vehicle.negotiable ? true : false} onChange={(e) => handleChange(e, 'negotiable', false)} id="default-radio-2" type="radio" value="" name="negotiable" className="w-4 h-4" />
                        <label htmlFor="default-radio-2" className="text-l text-slate-600 ml-2">Non-negotiable</label>
                </div>
                <div className='mb-5'>
                        <ImageUpload setImagesArr={setImagesArr} />
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 font-old py-2 px-4 rounded float-right'>Submit</button>
            </form>
        </div>
    );
}

export default AddEditVehicle;