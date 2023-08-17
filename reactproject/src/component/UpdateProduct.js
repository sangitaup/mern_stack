import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

 const UpdateProduct = ()=>{

    const [name, setName]= React.useState('');
    const [price, setPrice]= React.useState('');
    const [category, setCategory]= React.useState('');
    const [company, setCompany]= React.useState('');
    const params= useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        console.warn(params)
        getProductDetails();
    },[])

    const getProductDetails = async(req, resp)=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

const updateProduct= async ()=>{
    console.warn(name,price,category,company)
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method: 'put',
        body: JSON.stringify({name,price,category,company}),
        headers:{
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
    });
    result= await result.json()
    console.warn(result)
    navigate('/');

    }

     return(
        <>
        <div className='container'>
            <div className='product'>
                <div className="panel panel-default updatePanel">
                    <div className="panel-heading">
                    <h3 className="panel-updateTitle">Update product</h3>
                    </div>
                </div>
           
            
             <div className='row'>
                <div className=' col-md-6'>
                <div className='form-group'>
                    <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} className='form-control' placeholder='Enter product name'/><br/>
                    
                    <input type='price' onChange={(e)=>{setPrice(e.target.value)}} value={price} className='form-control' placeholder='Enter product price'/><br/>
                    
                    <input type='category' onChange={(e)=>{setCategory(e.target.value)}} value={category} className='form-control' placeholder='Enter product category'/><br/>
                  <input type='company' onChange={(e)=>{setCompany(e.target.value)}} value={company} className='form-control' placeholder='Enter product company'/></div>
                 
                    <button type='button' onClick={updateProduct} className='btn btn-primary form-control' >Update Product</button>
                </div>
                </div>
              </div>
         
        </div>
        </>
    
    
    );
}
 export default UpdateProduct;

