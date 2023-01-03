import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:5000/api";
const token = localStorage.getItem("userToken");

export const vehicleAdd = createAsyncThunk("vehicles/vehicleAdd", async (vehicle, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${baseUrl}/vehicle/add`, vehicle, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const vehiclesGet = createAsyncThunk("vehicles/vehiclesGet", async (id=null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle/getAll`);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export const vehicleUpdate = createAsyncThunk("vehicles/vehicleUpdate", async (vehicle, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseUrl}/vehicle/update/${vehicle._id}`, vehicle, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export const vehiclesDelete = createAsyncThunk("vehicles/vehicleDelete", async (id=null, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${baseUrl}/vehicle/delete/${id}`, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: [
        ],
        emptyVehicle: { id: '', vehNo: '', make: '', model: '', mfc_year: '', reg_year: '', fuel: '', km: '', engine: '', transmission: '', country: '', prevOwners: '', price: '', img: ['vits_1.jpg', 'vits_2.jpg', 'vits_3.jpg', 'vits_4.jpg', 'vits_5.jpg'], negotiable: false, trimEdition: '', condition: '', bodyType: '' },
        filter: { make: '', model: '', year: '' },
        deleteStatus: "",
        addVehicleStatus: "",
        error: ""
    },
    reducers: {
        updateFilter: (state, action) => {
            state.filter = {...action.payload}
        },
    },
    extraReducers: {
        [vehicleAdd.pending]: (state, action) => {
            return {
                ...state,
                addVehicleStatus: "pending",
                error: ""
            }
        },
        [vehicleAdd.fulfilled]: (state, action) => {

            return {
                ...state,
                vehicles: [action.payload, ...state.vehicles],
                addVehicleStatus: "success",
                error: ""
            }
        },
        [vehicleAdd.rejected]: (state, action) => {
            return {
                ...state,
                addVehicleStatus: "rejected",
                error: action.payload
            }
        },
        [vehiclesGet.pending]: (state, action) => {
            return {
                ...state,
                getVehicleStatus: "pending",
                error: ""
            }
        },
        [vehiclesGet.fulfilled]: (state, action) => {

            return {
                ...state,
                vehicles: [...action.payload],
                getVehicleStatus: "success",
                error: ""
            }
        },
        [vehiclesGet.rejected]: (state, action) => {
            return {
                ...state,
                getVehicleStatus: "rejected",
                error: action.payload
            }
        },
        [vehicleUpdate.fulfilled]: (state, action) => {

            return {
                ...state,
                vehicles: state.vechicles ? state.vechicles.map(veh => veh._id === action.payload_id ? action.payload : veh) : state.vehicles,
                getVehicleStatus: "success",
                error: ""
            }
        },
        [vehiclesDelete.fulfilled]: (state, action) => {
            return {
                ...state,
                vehicles: state.vehicles.filter(veh => veh._id !== action.payload._id),
                getVehicleStatus: "",
                error: ""
            }
        },
    }
});

export const { deleteVehicle, updateFilter } = vehicleSlice.actions;
export default vehicleSlice.reducer;