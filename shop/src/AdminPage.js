import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AdminPage.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Button from 'react-bootstrap/Button';
import { Browser } from '@syncfusion/ej2-base';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import AddProductModal from './AddProductModal';
import AddMotorTypeModal from './AddMotorTypeModal';
import { Services } from './Services/Services';
import { useMotorTypes } from './hooks/useMotorTypes';
import { useSelector } from 'react-redux';
import { useOrder } from './hooks/useOrder';

ChartJS.register(ArcElement, Tooltip, Legend);
const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [orderData, setOrderData] = useState([]);


  useEffect(() => {

  }, []);

  useEffect(() => {
    if (userData.length > 0 && productData.length > 0) {
      const chartData = {
        labels: ['School Aid', 'Medical Aid', 'Debt/Capital', 'Elected Officials', 'University', 'Executive', 'Other Local Assistance'],
        datasets: [{
          data: [26, 20, 5, 3, 7, 17, 22],
          backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'cyan'],
          hoverBackgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'cyan']
        }]
      };
      setChartData(chartData);
    } else {
      setChartData({
        labels: ['No Data'],
        // startAngle: Browser.isDevice ? 0 : -0.5 * Math.PI,
        datasets: [{
          data: [100],
          backgroundColor: ['gray'],
          hoverBackgroundColor: ['gray']
        }]
      });
    }
  }, [userData, productData]);

  return (
    <div className="admin-page">
      <Row>
      <h1 className="heading">Admin Dashboard</h1>
      </Row>
      <Row>
      <div className="table-container">
        <Col lg={6} xs={12}>
        <div className="table-wrapper">
          <h2 className="sub-heading">User Statistics</h2>
          <UserTable userData={userData} />
        </div>
        </Col>
        <Col lg={6} xs={12}>
        <div className="table-wrapper">
          <h2 className="sub-heading">Product Statistics</h2>
          <ProductTable productData={productData} />
        </div>
        </Col>
      </div>
      </Row>
      <Row>
      <div className="table-container">
        <Col lg={6} xs={12}>
        <div className="table-wrapper">
          <h2 className="sub-heading">MotorTypes Statistics</h2>
          <MotorTypeTable />
        </div>
        </Col>
        <Col lg={6} xs={12}>
        <div className="table-wrapper">
          <h2 className="sub-heading">Order Statistics</h2>
          <OrderTable orderData={orderData} />
        </div>
        </Col>
      </div>
      </Row>
      <Row>
      <div className='pie'> {/*TO DO: fix arc is not registered element --FIXED*/}
        {chartData && <Pie data={chartData} options={{
          plugins:{
            legend:{
              display: true,
              position: 'bottom',
            },
          },
          radius: Browser.isDevice ? '40%' : '50%',
          marginBlock: '0px',
          responsive: true,
        }}/>}
      </div>
      </Row>
      <Row>
      <div className="table-container-order">
          <div className="table-wrapper-order">
            <h2 className="sub-heading">Order Statistics</h2>
            <OrderTable orderData={orderData} />
          </div>
          {/* Add another table component if needed */}
      </div>
    </Row>
    </div>
  );
};

const UserTable = () => {
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const data = useSelector(state => state.users);

  const handleToggleAllUsers = (event) => {
    const isChecked = event.target.checked;
    // setSelectAllUsers(isChecked);
    // const userIds = isChecked ? users.map(user => user.id) : [];
    // setSelectedUserIds(userIds);
  };

  const handleUserCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedUserIds([...selectedUserIds, userId]);
    } else {
      setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
    }
  };

  const handleDeleteSelectedUsers = () => {
    console.log("Deleting selected users:", selectedUserIds);
    // Add backend function to delete selected users
  };

  const handleResetUsers = () => {
    console.log("Reseting password for selected users:", selectedUserIds);
    // Add backend function to delete selected users
  };

  return (
    <div>
      <table className="data-table-user">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllUsers} onChange={handleToggleAllUsers} /></th>
            <th>User ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <tr key={user.id}>
              <td><input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={(e) => handleUserCheckboxChange(e, user.id)} /></td>
              <td>{user.id}</td>
              <td>{user.type}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outline-success" style={{marginBlock:'10px'}} onClick={handleResetUsers}>Reset Password</Button>
        <Button variant="outline-danger" style={{marginBlock:'10px'}} onClick={handleDeleteSelectedUsers}>Delete Selection</Button>
      </div>
    </div>
  );
};

const ProductTable = ({ productData }) => {
  const [selectAllProducts, setSelectAllProducts] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleToggleAllProducts = (event) => {
    const isChecked = event.target.checked;
    setSelectAllProducts(isChecked);
    const productIds = isChecked ? productData.map(product => product.id) : [];
    setSelectedProductIds(productIds);
  };

  const handleProductCheckboxChange = (event, productId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedProductIds([...selectedProductIds, productId]);
    } else {
      setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
    }
  };

  const handleDeleteSelectedProducts = () => {
    console.log("Deleting selected products:", selectedProductIds);
    // Example: Make an API call to delete selected products
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddNewProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <table className="data-table-product">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllProducts} onChange={handleToggleAllProducts} /></th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Render product data rows */}
        </tbody>
      </table>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outline-success" onClick={handleAddNewProduct} style={{marginBlock: '10px'}}>Add New Product</Button>
        <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
      />
        <Button variant="outline-danger" style={{marginBlock:'10px'}} onClick={handleDeleteSelectedProducts}>Delete Selection</Button>
      </div>
    </div>
  );
};

const OrderTable = ({ orderData }) => {
  const [selectAllOrders, setSelectAllOrders] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const {
    orders
  } = useOrder();

  const handleToggleAllOrders = (event) => {
    const isChecked = event.target.checked;
    setSelectAllOrders(isChecked);
    const orderIds = isChecked ? orderData.map(order => order.id) : [];
    setSelectedOrderIds(orderIds);
  };

  const handleOrderCheckboxChange = (event, orderId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedOrderIds([...selectedOrderIds, orderId]);
    } else {
      setSelectedOrderIds(selectedOrderIds.filter(id => id !== orderId));
    }
  };

  const handleDeleteSelectedOrders = () => {
    console.log("Deleting selected orders:", selectedOrderIds);
    // Add backend function to delete selected orders
  };

  const handleAcceptedSelectedOrders = () => {
    console.log("Accepting selected orders:", selectedOrderIds);
    // Add backend function to delete selected orders
  };

  return (
    <div>
      <table className="data-table-order">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllOrders} onChange={handleToggleAllOrders} /></th>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map(order => (
            <tr key={order.id}>
              <td><input type="checkbox" checked={selectedOrderIds.includes(order.id)} onChange={(e) => handleOrderCheckboxChange(e, order.id)} /></td>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outline-success" onClick={handleAcceptedSelectedOrders}>Accept Transaction</Button>
        <Button variant="outline-danger" onClick={handleDeleteSelectedOrders}>Decline Transaction</Button>
      </div>
    </div>
  );
};

const MotorTypeTable = () => {
  const [selectAllMotorTypes, setSelectAllMotorTypes] = useState(false);
  const [selectedMotorTypeIds, setSelectedMotorTypeIds] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const {
    motorTypes,
    addNewMotorType,
  } = useMotorTypes();

  useEffect(() => {
    console.log('Motor types table:', motorTypes);
  }, [motorTypes]);

  const handleToggleAllMotorTypes = (event) => {
    const isChecked = event.target.checked;
    setSelectAllMotorTypes(isChecked);
    const motorTypeIds = isChecked ? motorTypes.map(motorType => motorType.id) : [];
    setSelectedMotorTypeIds(motorTypeIds);
  };

  const handleMotorTypeCheckboxChange = (event, motorTypeId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedMotorTypeIds([...selectedMotorTypeIds, motorTypeId]);
    } else {
      setSelectedMotorTypeIds(selectedMotorTypeIds.filter(id => id !== motorTypeId));
    }
  };

  const handleDeleteSelectedMotorTypes = () => {
    console.log("Deleting selected motor types:", selectedMotorTypeIds);
    // Add backend function to delete selected motor types
  };

  return (
    <div>
      <table className="data-table-motor-type">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAllMotorTypes} onChange={handleToggleAllMotorTypes} /></th>
            <th>Motor Type ID</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {motorTypes.map(motorType => (
            <tr key={motorType.id}>
              <td><input type="checkbox" checked={selectedMotorTypeIds.includes(motorType.id)} onChange={(e) => handleMotorTypeCheckboxChange(e, motorType.id)} /></td>
              <td>{motorType.id}</td>
              <td>{motorType.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outline-success" onClick={() => setShowModal(true)}>Add New Motor Type</Button>
        <AddMotorTypeModal
        show={showModal}
        addNewMotorType={addNewMotorType}
        handleClose={() => setShowModal(false)}
      />
        <Button variant="outline-danger" onClick={handleDeleteSelectedMotorTypes}>Delete Selection</Button>
      </div>
    </div>
  );
}

export default AdminPage;
