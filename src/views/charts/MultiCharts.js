/*eslint-disable*/
import React, { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import SubCategoryChart from '../../components/dashboard/SubCategoryChart';
import CategoryChart1 from '../../components/dashboard/CategoryChart1';
import DonutDashboard from '../../components/dashboard/DonutChart';
import { Button } from 'reactstrap';

const MultiChart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('project');
  const subcategory = searchParams.get('emp');
  
   let categoryids=null;
  let subCategoryid=null;
  const {hash} = window.location;
  const categoryIds = hash.split('=')[1];
   categoryids=categoryIds;
   const subCategoryIds = hash.split('=')[1];
   subCategoryid=subCategoryIds;
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
   useEffect(()=>{
    // Get the current URL
    const url = new URL(window.location.href);
    
    console.log('url',url)
    // Get the value of the 'categoryid' parameter
    const categoryid = url.searchParams.get('project');
    
    const {hash} = window.location;

    console.log('categoryId',categoryId)
    console.log('hash',hash)
    // Extract the categoryid parameter from the hash
    const categoryIdParam = new URLSearchParams(hash.substring(1)).get('project');
    const categoryIds = hash.split('=')[1];
    const subCategoryIdParam = new URLSearchParams(hash.substring(1)).get('emp');
    const subCategoryIds = hash.split('=')[1];
    //categoryids=categoryIds;
    subCategoryid=subCategoryIds;
    setCategoryId(categoryIds)
    setSubCategoryId(subCategoryIds)
    console.log('categoryIds',categoryIds)
  console.log('categoryId',categoryIdParam)
  console.log('subCategoryIds',subCategoryIds)
  console.log('subCategoryIdParam',subCategoryIdParam)
  },[window.location])
  useEffect(()=>{
    // Get the current URL
    const url = new URL(window.location.href);
    
    console.log('url',url)
    // Get the value of the 'categoryid' parameter
    const categoryid = url.searchParams.get('project');
    const {hash} = window.location;

    console.log('categoryId',categoryId)
    console.log('hash',hash)
    // Extract the categoryid parameter from the hash
    const categoryIdParam = new URLSearchParams(hash.substring(1)).get('project');
    const categoryIds = hash.split('=')[1];
    const subCategoryIdParam = new URLSearchParams(hash.substring(1)).get('emp');
    const subCategoryIds = hash.split('=')[1];
    // categoryids=categoryIds;
    subCategoryid=subCategoryIds;
    setCategoryId(categoryIds)
    setSubCategoryId(subCategoryIds)
    console.log('categoryIds',categoryIds)
  console.log('categoryId',categoryIdParam)
  console.log('subCategoryIds',subCategoryIds)
  console.log('subCategoryIdParam',subCategoryIdParam)
  },[])
  // if (category && subcategory) {
  //   // Render subcategory chart
  //   return <SubCategoryChart setCategoryId={setCategoryId} setSubCategoryId={setSubCategoryId} categoryId={categoryId} subCategoryId={subCategoryId}/>;
  // } else if (category) {
  //   // Render category chart
  //   return <CategoryChart1 setCategoryId={setCategoryId} categoryId={categoryId}/>;
  // } else {
  //   return <DonutDashboard/>;
  // }
  return (
    <div>
      <Button type='submit' onClick={()=>navigate('/')}>
        Home
      </Button>
      {/* Component content here */}
      {(category && subcategory)&&(categoryids && subCategoryid)&&<SubCategoryChart setCategoryId={setCategoryId} setSubCategoryId={setSubCategoryId} categoryId={categoryids} subCategoryId={subCategoryid}/>}
    {(category&&!subcategory )&&categoryids &&<CategoryChart1 setCategoryId={setCategoryId} categoryId={categoryids}/>}
    {(!category&&!subcategory )&&(!categoryids && !subCategoryid)&&<DonutDashboard/>}
    </div>
  )
};

export default MultiChart;

// import React from 'react'

// function MultiChart() {
//   return (
//     <div>
//       {/* Component content here */}
//       {(category && subcategory)&& <SubCategoryChart setCategoryId={setCategoryId} setSubCategoryId={setSubCategoryId} categoryId={categoryId} subCategoryId={subCategoryId}/>}
//     {(category&&!subcategory )&&<CategoryChart1 setCategoryId={setCategoryId} categoryId={categoryId}/>}
//     {(!category&&!subcategory )&&<DonutDashboard/>}
//     </div>
//   )
// }

// export default MultiChart;
