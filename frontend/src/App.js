import React, { useEffect, useState } from 'react'

import './App.css';
import Header from './components/header';
import axios from 'axios'
import { baseUri } from './config/api';
import UsersTable from './components/UsersTable';
import AddUserForm from './components/AddUserForm';
import { postCreateUser } from './utils/utils';

function App() {

  const [shown, setShown] = useState(false)
  const [tableData,setTableData] = useState()
  const [managers,setManagers] = useState()

  const toggleModal = () => setShown(prev => !prev)

  useEffect(()=>{
    const fetchAllUsers = async() => {
      const res = await axios.get(`${baseUri}/allUsers`)
      console.log("res.data : " , res.data)
      setTableData(res.data)
    }
    fetchAllUsers()
  },[])
  
  useEffect(()=>{
    if(tableData){
      const assignManagers = () => {
        let tempArray = []
        tableData.map((item)=>{
          if(item.userRole === "manager"){
            tempArray.push(item)
          }
        })
        setManagers(tempArray)
      }
      assignManagers()
    }
  },[tableData])

  const newUserSubmit = (formData) => {
    postCreateUser(formData)
    setShown(false)
  }

  const handleClose = () =>{
    setShown(false)
  }


  return (
    <div className="App">
      <Header />
      <div id="content">
        {/* <GenericModal displayModal={shown} closeModal={toggleModal}> */}
        {shown &&
          <AddUserForm onSave={newUserSubmit} onClose={handleClose} managers={managers}>
            <h1>Add New User</h1>
          </AddUserForm>
        }
        {/* </GenericModal> */}
        {tableData ? <UsersTable tableData={tableData} toggleModal={toggleModal} />: <div>Fetching data. please wait...</div>}
      </div>
    </div>
  );
}

export default App;
