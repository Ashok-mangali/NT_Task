import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [updateId, setUpdateId] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateId) {
        await axios.put('http://127.0.0.1:5000/api/up', formData);
        setUpdateId(null);
      } else {
        await axios.post('http://127.0.0.1:5000/api/po', formData);
        
      }
      fetchData();
      setFormData({});
    } catch (error) {
      console.error('Error adding data: ', error);
    }
  };

  const handleEdit = (id) => {
    const selectedData = data.find((item) => item._id === id);
    setFormData(selectedData);
    setUpdateId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/del/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };
  

  return (
    <div className='App'>
      <h1>Data from MangoDB</h1>
      <form onSubmit={handleSubmit}>
      {/* <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="number"
          placeholder="Enter Your Id"
          name="Id"
          value={formData.Id || ''}
          onChange={handleChange}
        /> */}
        <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
        />
        <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="number"
          placeholder="Enter age"
          name="Age"
          value={formData.Age || ''}
          onChange={handleChange}
        />
        <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="text"
          placeholder="Enter Your Role"
          name="Role"
          value={formData.Role || ''}
          onChange={handleChange}
        />
        <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="text"
          placeholder="Enter Your Address"
          name="Address"
          value={formData.Address || ''}
          onChange={handleChange}
        />
        <button style={{ backgroundColor:'lightblue',color:'black', margin:'5px', padding:'8px'}} type="submit">{updateId ? 'Update' : 'Add'}</button>
        </form>
        <div style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: '15px' }}>
          
                <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                {/* <li style={{ display: 'inline-block', marginRight: '10px', padding: "20px", justifyContent: 'space-between' }}> <h4 style={{ color: 'red' }}>Id</h4> {data.map((item) => (
                        <h3 key={item._id}>
                            {item.Id}

                        </h3>

                    ))}</li> */}
                    <li style={{ display: 'inline-block', marginRight: '10px', padding: "20px", justifyContent: 'space-between' }}> <h4 style={{ color: 'red' }}>Name</h4> {data.map((item) => (
                        <h3 key={item._id}>
                            {item.name}

                        </h3>

                    ))}</li>

                    <li style={{ display: 'inline-block', marginRight: '10px', padding: "20px", justifyContent: 'space-between' }}> <h4 style={{ color: 'red' }}>Age</h4> {data.map((item) => (
                        <h3 key={item._id}>
                            {item.Age}

                        </h3>

                    ))}</li>


                    <li style={{ display: 'inline-block', marginRight: '10px', padding: "20px", justifyContent: 'space-between' }}><h4 style={{ color: 'red' }}>Role</h4> {data.map((item) => (
                        <h3 key={item._id}>
                            {item.Role}

                        </h3>

                    ))}</li>
                    <li style={{ display: 'inline-block', marginRight: '10px', padding: "20px", justifyContent: 'space-between' }}><h4 style={{ color: 'red' }}>Address</h4> {data.map((item) => (
                        <h3 key={item._id}>
                            {item.Address}

                        </h3>
                    ))}</li>

                    <li style={{ display: 'inline-block', marginRight: '10px', padding: "20px", justifyContent: 'space-between' }}><h4 style={{ color: 'red' , padding:'1px'}}>Actions</h4>{data.map((item) => (
                        <div style={{ display: 'flex', marginRight: '10px', padding: "9px", justifyContent: 'space-between' }} >
                            

                            
                            <button onClick={() => handleEdit(item._id)} style={{color:'black', backgroundColor:'lightGreen',padding:'2px', margin:'1px'}}>Edit</button>
                            <button onClick={() => handleDelete(item._id)}style={{color:'black', backgroundColor:'red',padding:'2px', margin:'1px'}}>Delete</button>
                        </div>
                        
                    ))}</li>

                </ul>
            </div>
      
    </div>
  );
};

export default App;
