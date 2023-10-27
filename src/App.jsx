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
  const [category , setCategory] = useState('cats');
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchData(category));
    
  }, [ dispatch, category]);

  if (status === 'loading') {
    return <div className="spinner">
      <HashLoader  color="#176ae6" size={80} loading={true} />
    </div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="App">
      <div className='container-fluid mt-5'>
        <div className='d-flex align-items-center justify-content-between my-2'>
          <h1 className='mt-4'>
              API'S TABLE
          </h1>

          <div className='d-flex align-items-center justify-content-end'>
              <div className='form-group me-2 mt-2'>
                <select 
                  name={category}
                  className='form-select'
                  value={category}  // Use "value" to set the selected option
                  onChange={(e) => setCategory(e.target.value)} // Use "onChange" to handle changes
                >
                  <option value='cats'>Cats</option>
                  <option value='dogs'>Dogs</option>
                </select>
              </div>
              <div className='form-group ms-2 mt-2'>
                <input name='searchQuery' className='form-input' type='text' placeholder='search Api' onChange={(e)=>setSearchQuery(e.target.value)}/>
              </div>
           </div>
        </div>
        
        <CustomTable data={
        data.data.filter(
              (item) =>
                item.api_link.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.api_model.toLowerCase().includes(searchQuery.toLowerCase())
            )} 
          itemsPerPage={5} />
      
      </div>
     
    </div>
  );
}

export default App;
