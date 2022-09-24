import React from 'react';
import { useState } from 'react';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateEmployee() {

  const params = useParams(); 
  const [empFullname , setEmpFullname] = useState('');
  const [empAddress , setEmpAddress] = useState('');
  const [empTel , setEmpTel] = useState('');
  const [empSalary , setEmpSalary] = useState('');
  const [empFilePhoto , setEmpFilePhoto] = useState('');
  const [msg , setMsg] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    if(!empFullname || !empAddress || !empTel || !empSalary || !empFilePhoto){
        setMsg('Input is required.');
    }else{
        const formData = new FormData();
        formData.append('empFullname' , empFullname);
        formData.append('empAddress' , empAddress);
        formData.append('empTel' , empTel);
        formData.append('empSalary' , empSalary);
        formData.append('image' , empFilePhoto);

        fetch(`https://aqueous-bastion-38134.herokuapp.com/updatemember/${params.id}` , {
            method: 'PUT',
            body: formData
        }).then(res => {
            if(res.status === 200){
                Swal.fire(
                    'Successfully to update',
                    'You clicked the button!',
                    'success'
                ).then(() => {
                    window.location = '/';
                });
            }
        })
    }
  }

  return (
    <div className='container'>
        <h1 className='text-center mt-5 mb-5'>Update Employee</h1>
        {msg.length > 0 && <div className='alert alert-danger' role='alert'>{msg}</div>}
        <form onSubmit={formSubmit} encType='multipart/form-data'>
            <div className="mb-3">
                <label htmlFor="empFullName" className="form-label">Employee FullName:</label>
                <input type='text' autoComplete='off' id='empFullName' className='form-control' onChange={(e) => setEmpFullname(e.target.value)}></input>
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
                <input type='file' id='empPhoto' className='form-control' name='image' onChange={(e) => setEmpFilePhoto(e.target.files[0])}></input>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default UpdateEmployee