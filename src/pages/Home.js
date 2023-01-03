import React from 'react';
import { useSelector } from 'react-redux';
import Filter from '../components/Filter';
import Vehicles from '../features/vehicle/Vehicles';

import '../scss/Home.scss';

const Home = () => {
    const { filter } = useSelector(state => state.vehicle);
    return (
        <div className='Home'>
            <div className='Home__Banner'>
                <div className='Home__Overlay'>
                    <div className='Home__Filter flex align-center'>
                        <Filter />
                    </div>
                </div>
            </div>
            <div className='Home__vehicles'>
                <Vehicles filterObj={filter} />
            </div>
        </div>
    );
}

export default Home