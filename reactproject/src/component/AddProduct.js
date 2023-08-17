import React from 'react';

const AddProduct =()=>{
    const [name, setName]= React.useState('');
    const [price, setPrice]= React.useState('');
    const [category, setCategory]= React.useState('');
    const [company, setCompany]= React.useState('');
    const [error,setError] = React.useState(false)

    const addProduct = async ()=>{

        console.warn(!name);
        if(!name || !price || !category || !company )
        {
            setError(true)
            return false;
        }
       
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
       
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
           
            headers:{
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result= await result.json();
        console.warn(result);
    }
       
    return(
   <>
        <div className='container'>
            <div className='product'>
             <h3>Add Product</h3>
             <div className='row'>
                <div className='col-md-4'>
                <div className='form-group'>
                    <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} className='form-control' placeholder='Enter product name'/><br/>
                    {error && !name && <span className='invalid-input'>Enter valid name</span>}
                    <input type='price' onChange={(e)=>{setPrice(e.target.value)}} value={price} className='form-control' placeholder='Enter product price'/><br/>
                    {error && !price && <span className='invalid-input'>Enter valid price</span>}
                    <input type='category' onChange={(e)=>{setCategory(e.target.value)}} value={category} className='form-control' placeholder='Enter product category'/><br/>
                    {error && !category && <span className='invalid-input'>Enter valid category</span>}
                    <input type='company' onChange={(e)=>{setCompany(e.target.value)}} value={company} className='form-control' placeholder='Enter product company'/></div>
                    {error && !company && <span className='invalid-input'>Enter valid company</span>}
                    <button type='button' onClick={addProduct} className='btn btn-primary form-control' >Add Product</button>
                </div>
                </div>
              </div>
         
        </div>
        </>
    
    
    );
}

export default AddProduct;