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

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      if (id) {
        console.log('Updating data for ID:', id);
        await axios.put(`http://127.0.0.1:5000/api/up/${id}`, formData);
        const updatedData = data.map(item => {
          if (item._id === id) {
            return { ...item, ...formData };
          }
          return item;
        });
        setData(updatedData);
        setUpdateId(null);
        
        console.log('Data updated successfully.');
      } else {
        console.log('Adding new data:', formData);
        await axios.post('http://127.0.0.1:5000/api/po', formData);
        fetchData();
        console.log('New data added successfully.');
      }
      setFormData({});
    } catch (error) {
      console.error('Error adding/updating data: ', error);
    }
  };

  const handleEdit = (id) => {
    const selectedData = data.find((item) => item._id === id);
    setFormData(selectedData);
    setUpdateId(id);
    console.log('Editing data for ID:', id);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      await axios.delete(`http://127.0.0.1:5000/api/del/${id}`);
      setData(data.filter(item => item._id !== id));
      console.log('Data deleted successfully.');
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  console.log('Rendering data:', data);
  
  
  

  return (
    <div className='App'>
      <h1>Data from MangoDB</h1>
      <form onSubmit={(e) => handleSubmit(e, updateId)}>
      
        <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
        />
        <input style={{ color:'black', margin:'5px', padding:'7px', fontWeight:'bold'}}
          type="number"
          placeholder="Enter Your Age"
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
                        <div style={{  marginRight: '10px', padding: "9px", justifyContent: 'space-between' }} >
                            

                            
                            <button onClick={() => handleEdit(item._id)}>Edit</button>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                        
                    ))}</li>

                </ul>
            </div>
      
    </div>
  );
};

export default App;
