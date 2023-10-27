import React from 'react';
import './customTable.scss';
import { fetchData } from '../slices/myApiSlice';

const CustomTable = ({ data, pagination, dispatch}) => {

  return (
    <div className=''>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>API Model</th>
            <th>API</th>
            <th>ART DISPLAY</th>
            <th>ARTIST</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.api_model}</td>
              <td>{item.api_link}</td>
              <td>{item.artist_display}</td>
              <td>{item.artist_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-primary mr-2"
          onClick={() => dispatch(fetchData(pagination.prev_url))}
          disabled={pagination.current_page === 1}
        >
          Previous
        </button>
        <span className='p-2'>Page {pagination.current_page} of {pagination.total_pages}</span>
        <button
          className="btn btn-primary ml-2"
          onClick={() => dispatch(fetchData(pagination.next_url))}
          disabled={pagination.current_page === pagination.total_pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
