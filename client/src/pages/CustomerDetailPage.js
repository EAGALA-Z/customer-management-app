import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './CustomerDetailPage.css';

function CustomerDetailPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ load(); /* eslint-disable-next-line */ }, [id]);

  async function load(){
    setLoading(true);
    try{
      const res = await api.get(`/customers/${id}`);
      setCustomer(res.data.data);
    }catch(err){ console.error(err); alert('Failed to load'); }
    finally{ setLoading(false); }
  }

  async function handleDelete(){
    if(!window.confirm('Delete this customer?')) return;
    try{
      await api.delete(`/customers/${id}`);
      alert('Deleted');
      navigate('/');
    }catch(err){ console.error(err); alert('Delete failed'); }
  }

  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Customer Details</h2>
        <div>
          <Link to={`/customers/${id}/edit`} className="button">Edit</Link>
          <button onClick={handleDelete} className="button" style={{marginLeft:8}}>Delete</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        customer ? (
          <div>
            <div className="customer-info">
                <p><strong>ID:</strong> {customer.id}</p>
                <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
                <p><strong>Phone:</strong> {customer.phone_number}</p>
                <h3>Addresses</h3>
            <AddressManager customerId={customer.id} addresses={customer.addresses} onChange={load} />
            </div>
          </div>
        ) : <div>Customer not found</div>
      )}
    </div>
  );
}

function AddressManager({ customerId, addresses = [], onChange }){
  const [list, setList] = useState(addresses);
  const [showForm, setShowForm] = useState(false);

  useEffect(()=>{ setList(addresses); }, [addresses]);

  async function addAddress(data){
    try{
      await api.post(`/customers/${customerId}/addresses`, data);
      alert('Address added');
      setShowForm(false);
      onChange();
    }catch(err){ console.error(err); alert('Failed to add address'); }
  }

  async function deleteAddress(id){
    if(!window.confirm('Delete address?')) return;
    try{
      await api.delete(`/addresses/${id}`);
      alert('Deleted');
      onChange();
    }catch(err){ console.error(err); alert('Failed'); }
  }

  return (
    <div>
      <button onClick={()=>setShowForm(s=>!s)} className="button">{showForm ? 'Cancel' : 'Add Address'}</button>
      {showForm && <AddressForm onSubmit={addAddress} />}

      <table className="table" style={{marginTop:12}}>
        <thead>
          <tr><th>ID</th><th>Details</th><th>City</th><th>State</th><th>Pin</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {list.map(a=> (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.address_details}</td>
              <td>{a.city}</td>
              <td>{a.state}</td>
              <td>{a.pin_code}</td>
              <td>
                <button className="button small" onClick={()=>{
                  const newDetails = prompt('Edit address details', a.address_details);
                  if(newDetails!=null){ api.put(`/addresses/${a.id}`, {address_details:newDetails}).then(()=>onChange()); }
                }}>Edit</button>
                <button className="button small" onClick={()=>deleteAddress(a.id)} style={{marginTop:8}}>Delete</button>
              </td>
            </tr>
          ))}
          {list.length===0 && <tr><td colSpan={6}>No addresses</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function AddressForm({ onSubmit }){
  const [form, setForm] = useState({ address_details:'', city:'', state:'', pin_code:'' });
  function change(e){ setForm(s=>({...s,[e.target.name]:e.target.value})); }
  function submit(e){ e.preventDefault(); if(!form.address_details) return alert('Enter details'); onSubmit(form); }
  return (
    <form onSubmit={submit} style={{marginTop:12}}>
      <div className="form-row"><input name="address_details" value={form.address_details} onChange={change} placeholder="Address details" className="input"/></div>
      <div className="form-row" style={{display:'flex',gap:8}}>
        <input name="city" value={form.city} onChange={change} placeholder="City" className="input" />
        <input name="state" value={form.state} onChange={change} placeholder="State" className="input" />
        <input name="pin_code" value={form.pin_code} onChange={change} placeholder="Pin code" className="input" />
      </div>
      <div className="form-row"><button className="button primary">Save Address</button></div>
    </form>
  );
}

export default CustomerDetailPage;
