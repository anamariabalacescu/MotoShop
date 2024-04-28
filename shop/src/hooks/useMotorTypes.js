import { useState, useEffect } from 'react';
import { Services } from '../Services/Services';
import MotorType from '../schemas/MotorType';
export const useMotorTypes = () => {
    const [motorTypes, setMotorTypes] = useState([]);
    
    const addNewMotorType = async (motorTypeData) => {
        const motorType = new MotorType({id:null, type: motorTypeData.type});
        await Services.MotorType.create(motorType);
        fetchMotorTypes();
    }

    const fetchMotorTypes = async () => {
        const response = await Services.MotorType.getAll();
        console.log('Motor types:', response)
        setMotorTypes(response);
    };
    
    useEffect(() => {    
        fetchMotorTypes();
    }, []);

    return {motorTypes, addNewMotorType};
};
