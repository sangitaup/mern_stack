import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import './ProductList.css';
import ReactPaginate from 'react-paginate';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit,setLimit]=useState(3);
  const [pageCount, setPageCount] = useState(1);
  const currentPage=useRef();



  useEffect(() => {
    currentPage.current=1;
   getProducts();
    getPaginatedProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      method:'get',
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    setProducts(result);
  };
 
 
  const deleteProduct = async (id)=>{
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      method:'Delete',
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result =  await result.json()
    if(result)
    {
      alert("record is deleted")
    }

  };

  const searchHandle = async(e)=>{
   let key = e.target.value;
   if(key){
    let result = await fetch(`http://localhost:5000/search/${key}`,{
    
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    if(result){
     setProducts(result)
    }

   }else{
        getProducts();
   }
  
  }
  const handlePageClick = async(e)=>{
    console.log(e);
    currentPage.current=e.selected+1;
    getPaginatedProducts();
    
  };

const getPaginatedProducts = async()=>{
  let result= await fetch(`http://localhost:5000/paginatedProducts?page=${currentPage.current}&limit=${limit}`,{
      method: 'get',
    headers:{
      authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
  }
    });
    result = await result.json();
    console.log(result, 'Products');
    setPageCount(result.pageCount);
    setProducts(result);
   
 
}
 async function changeLimit(){
  currentPage.current=1; //date will come to first page
  getPaginatedProducts();
  getProducts();

}

  

  return (
    <>
    <div className="container ">
       <h2 className="product-list">Product List</h2>
        <div className="row">
         <div className="col-lg-6 mx-auto">
        
            <div className="input-group">                
            <input type = "text" placeholder="Search Product" className="form-control" onChange={searchHandle} />
            </div>
          </div>
        </div>
       
    
        <table className="table table-dark table-scrollY table-hover">
            <thead>
                <tr  className="color">
                    <th >Sr.No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                      <th>Operation</th>
                </tr>
                {
                  products.length>0 ? products.map((item,index)=>
                <tr key={item._id}>
                  <th>{index+1}</th>
                  <th>{item.name}</th>
                  <th>{item.price}</th>
                  <th>{item.category}</th>
                  <th>{item.company}</th>
                  <th><button onClick={()=>deleteProduct(item._id)} className="btn btn-danger">delete</button>
                  <Link to={'/update/'+item._id} className="btn btn-success">Update</Link>
                  </th>
                  
                </tr>
                  )
                  : <h1>No Result Found</h1>
              } 
            </thead>
              </table> 
              
              <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
       containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage.current-1}
      />
   
      <input placeholder="Limit"  onChange={e=>setLimit(e.target.value)} />
      <button onClick={changeLimit} className="btn btn-secondary"> Set Limit</button>
    
      </div>
      </>
  );
};





export default ProductList;
