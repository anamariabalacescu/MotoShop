import { useState, useEffect } from "react";
import { Services } from "../Services/Services";
import { useSelector, useDispatch } from "react-redux";
export const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    const fetchOrders = async () => {
        const orders = await Services.Order.getAll();
        if (!orders) return;
        setOrders(orders);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const createOrder = async (order) => {
        const newOrder = await Services.Order.createOrder(order);
        if (!newOrder) return false;
        return true;
    }

    const updateOrder = async (order) => {
        const updatedOrder = await Services.Order.updateOrder(order);
        if (!updatedOrder) return false;
        return true;
    }

    const deleteOrder = async (id) => {
        const deletedOrder = await Services.Order.deleteOrder(id);
        if (!deletedOrder) return false;
        return true;
    }

    return {createOrder, updateOrder, deleteOrder, orders};
}