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
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
   useEffect(()=>{
    // Get the current URL
    const url = new URL(window.location.href);
    
    console.log('url',url)
    // Get the value of the 'categoryid' parameter
    const categoryid = url.searchParams.get('category');
    const {hash} = window.location;

    console.log('categoryId',categoryId)
    console.log('hash',hash)
    // Extract the categoryid parameter from the hash
    const categoryIdParam = new URLSearchParams(hash.substring(1)).get('category');
    const categoryIds = hash.split('=')[1];
    const subCategoryIdParam = new URLSearchParams(hash.substring(1)).get('subcategory');
    const subCategoryIds = hash.split('=')[1];
    setCategoryId(categoryIds)
    setSubCategoryId(subCategoryIds)
    console.log('categoryIds',categoryIds)
  console.log('categoryId',categoryIdParam)
  console.log('subCategoryIds',subCategoryIds)
  console.log('subCategoryIdParam',subCategoryIdParam)
  },[categoryId])
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
      {(category && subcategory)&&<SubCategoryChart setCategoryId={setCategoryId} setSubCategoryId={setSubCategoryId} categoryId={categoryId} subCategoryId={subCategoryId}/>}
    {(category&&!subcategory )&&<CategoryChart1 setCategoryId={setCategoryId} categoryId={categoryId}/>}
    {(!category&&!subcategory )&&(!categoryId && !subCategoryId)&&<DonutDashboard/>}
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
