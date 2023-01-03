import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../scss/VehicleCard.scss';
import { vehiclesDelete } from './vehicleSlice';

const VehicleCard = ({vehicle}) => {
    const [ showPopup, setShowPopup ] = useState(false);
    const { userInfo } = useSelector(state => state.auth);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    return (        
        <div className="Vehicle mb-5 md:w-1/3 w-full rounded-lg shadow-md">
           
            <div className='Vehicle__Image rounded-t-lg' style={{ backgroundImage: `url(/img/cars/${vehicle.img[0]}` }}></div>
            
            <div className="p-5">
                { userInfo && (
                    <div className='Vehicle__Icons'>
                        <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => navigate(`/editVehicle/${vehicle._id}`)} />
                        <TrashIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => dispatch(vehiclesDelete(vehicle._id))} />
                    </div>
                )}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{vehicle.make} - {vehicle.model}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Vehicle No: </b>{vehicle.vehNo}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Year: </b>{vehicle.reg_year}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{vehicle.km} km</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>PRICE: </b>Rs. {vehicle.price} /=</p>
                {/* <button
                    class="mt-5 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    type="button" data-modal-toggle={`${vehicle._id}Modal`}>
                Toggle modal
                </button> */}
                <button
                    className='mt-5 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full cursor-pointer'
                    onClick={() => {setShowPopup(true)}}>View Details</button>
            </div>
            {/* <div id={`${vehicle._id}Modal`} tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div class="relative w-full h-full max-w-2xl md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                            <button data-modal-toggle="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div>
                    </div>
                </div>
            </div> */}
            {showPopup && ( 
                <div className="Vehicle__popup">
                     <div className='Vehicle__popupBodyContainer'>
                         <XMarkIcon className='Vehicle__PopupClose cursor-pointer text-gray-500' onClick={() => setShowPopup(false)} />
                         <div className='Vehicle__popupBody flex flex-col md:flex-row'>
                             <div className='Vehicle__carousel'>
                                 <Carousel showStatus={false}>
                                     {vehicle.img.map((img, idx) => <img key={idx} alt="img alt" src={`/img/cars/${img}`} />)}
                                 </Carousel>
                             </div>
                             <div className='Vehicle__Details'>
                                 <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600 text-center mt-3 mb-5">Vehicle Details</h3>
                                 <p><b>Vehicle Number</b> : {vehicle.vehNo}</p>
                                 <p><b>Make</b> : {vehicle.make}</p>
                                 <p><b>Model</b> : {vehicle.model}</p>
                                 <p><b>Mfc. Year</b> : {vehicle.mfc_year}</p>
                                 <p><b>Reg. Year</b> : {vehicle.reg_year}</p>
                                 <p><b>Trim Edition</b> : {vehicle.trimEdition}</p>
                                 <p><b>Condition</b> : {vehicle.condition}</p>
                                 <p><b>Body Type</b> : {vehicle.bodyType}</p>
                                 <p><b>Fuel</b> : {vehicle.fuel}</p>
                                 <p><b>Km</b> : {vehicle.km}</p>
                                 <p><b>Engine cc </b> : {vehicle.engine}</p>
                                 <p><b>Transmission</b> : {vehicle.transmission}</p>
                                 <p><b>Country</b> : {vehicle.country}</p>
                                 <p><b>Previous Owners</b> : {vehicle.prevOwners}</p>
                                 <p><b>Price</b> : Rs. {vehicle.price} /=</p>
                             </div>
                         </div>
                     </div>
                </div>
            )}
        </div>
    );
}

export default VehicleCard;