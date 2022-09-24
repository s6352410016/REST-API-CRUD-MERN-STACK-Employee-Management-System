import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

function AddEmployee() {  

  const [empFullName , setEmpFullName] = useState('');  
  const [empAddress , setEmpAddress] = useState('');  
  const [empTel , setEmpTel] = useState('');  
  const [empSalary , setEmpSalary] = useState('');  
  const [empFilePhoto , setFilePhoto] = useState('');  
  const [msg , setMsg] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    
    if(!empFullName || !empAddress || !empTel || !empSalary || !empFilePhoto){
        setMsg('Input is required.');
    }else{
        const formData = new FormData();
        formData.append('empFullname' , empFullName)
        formData.append('empAddress' , empAddress)
        formData.append('empTel' , empTel)
        formData.append('empSalary' , empSalary)
        formData.append('image' , empFilePhoto);

        fetch('https://fast-peak-17762.herokuapp.com/addmember' , {
            method: 'POST',
            body: formData
        }).then(res => {
            if(res.status === 201){
                Swal.fire(
                    'Successfully to Add',
                    'You clicked the button!',
                    'success'
                ).then(() => {
                    window.location = '/';
                });
            }
        });
    }
}


  return (
    <div className='container'>
        <h1 className='text-center mt-5 mb-5'>Add Employee</h1>
        {msg.length > 0 && <div className='alert alert-danger' role='alert'>{msg}</div>}
        <form onSubmit={formSubmit} encType='multipart/form-data'> 
            <div className="mb-3">
                <label htmlFor="empFullName" className="form-label">Employee Fullname:</label>
                <input type='text' autoComplete='off' id='empFullName' className='form-control' onChange={(e) => setEmpFullName(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="empAddress" className="form-label">Employee Address:</label>
                <input type='text' autoComplete='off' id='empAddress' className='form-control' onChange={(e) => setEmpAddress(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="empTel" className="form-label">Employee Tel:</label>
                <input type='number' autoComplete='off' id='empTel' className='form-control' onChange={(e) => setEmpTel(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="empSalary" className="form-label">Employee Salary:</label>
                <input type='number' autoComplete='off' id='empSalary' className='form-control' onChange={(e) => setEmpSalary(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="empPhoto" className="form-label">Employee Photo:</label>
                <input type='file' id='empPhoto' className='form-control' name='image' onChange={(e) => setFilePhoto(e.target.files[0])}></input>
            </div>
            <button type="submit" className="btn btn-success">Add</button>
        </form>
    </div>
  );
}

export default AddEmployee;