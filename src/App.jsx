import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { useEffect, useState } from 'react';
import { fetchData } from './slices/myApiSlice';
import CustomTable from './components/customTable';
import { HashLoader} from 'react-spinners';

function App() {

  const data = useSelector((state) => state.myApi.data);
  const status = useSelector((state) => state.myApi.status);
  const error = useSelector((state) => state.myApi.error);
  const [searchQuery , setSearchQuery] = useState('');
  const [searchTitle , setSearchTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchData());
      
  }, [dispatch]);

  console.log(data);
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="App">
      <div className='container-fluid mt-5'>
        <div className='d-flex align-items-center justify-content-between my-2'>
          <h1 className='mt-4'>
              API'S LIST
          </h1>

          <div className='d-flex align-items-center justify-content-end'>
             
          <div className='form-group me-2 mt-2'>
                <input name='searchName' value={searchTitle} className='form-input bg-light' type='text' 
                placeholder='search by title or api ' onChange={(e)=>setSearchTitle(e.target.value)}/>
                <span>

                </span>
              </div>

              <div className='form-group me-2 mt-2'>
                <input name='searchQuery' value={searchQuery} className='form-input bg-light' type='text' 
                placeholder='search category name' onChange={(e)=>setSearchQuery(e.target.value)}/>
                <span>

                </span>
              </div>

              <div className='form-group ms-2 mt-2'>
                <button type="button" className='btn btn-dark' onClick={()=>dispatch(fetchData(`https://api.artic.edu/api/v1/artworks/search?q=${searchQuery}`))}>submit</button>
              </div>
           </div>
        </div>
        {status === 'loading'? <div className="spinner">
          <HashLoader  color="#176ae6" size={80} loading={true} />
        </div>  :
          <CustomTable data={data.data.filter(
            (item) =>
              item.api_link.toLowerCase().includes(searchTitle.toLowerCase()) ||
              item.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
              item.api_model.toLowerCase().includes(searchTitle.toLowerCase())
          )} pagination={data.pagination} dispatch={dispatch}/>
        }
      </div>
     
    </div>
  );
}

export default App;
