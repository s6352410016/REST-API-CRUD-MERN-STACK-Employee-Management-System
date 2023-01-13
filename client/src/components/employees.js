import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Employees() {

    const [empData , setEmpData] = useState([]);

    const fetchData = () => {
      fetch('https://wild-cyan-bass-coat.cyclic.app/employees' , {
        method: 'GET'
      }).then(res => {
        return res.json();
      }).then(resData => {
        setEmpData(resData);
      });
    }
    fetchData();

    const deleteEmployee = (id) => {
      Swal.fire({
        title: 'Are you sure to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your Data has been deleted.',
            'success'
          ).then(() => {
            fetch(`https://wild-cyan-bass-coat.cyclic.app/deletemember/${id}` , {
            method: 'DELETE'
          }).then(res => {
            if(res.status === 200){
              window.location = '/';
            }
          });
          });
        }
      });
    }

  return (
    <div className='container'>
      <h1 className='text-center mt-5 mb-5'>Employee Management System</h1>
      <Link to='/addemployee' className='btn btn-success'>Add Employee</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">empId</th>
            <th scope="col">empFullname</th>
            <th scope="col">empAddress</th>
            <th scope="col">empTel</th>
            <th scope="col">empSalary</th>
            <th scope="col">empPhoto</th>
            <th scope="col">empUpdate</th>
            <th scope="col">empDelete</th>
          </tr>
        </thead>
        <tbody>
          {!empData && 
          <tr>
            <td colSpan={8} className='text-center'>
              <b>Data employee is empty.</b>
            </td>
          </tr>}
          {empData.map(data => {
            return(
              <tr>
                <td>{data._id}</td>
                <td>{data.empFullname}</td>
                <td>{data.empAddress}</td>
                <td>{data.empTel}</td>
                <td>{data.empSalary}</td>
                <td><img src={`./images/${data.empPhoto}`} width='100px' height='100px'></img></td>
                <td><Link to={`/update/${data._id}`} className='btn btn-primary'>Update</Link></td>
                <td><Link className='btn btn-danger' onClick={() => deleteEmployee(data._id)}>Delete</Link></td>
              </tr>
            );
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Employees;