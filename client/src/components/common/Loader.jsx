import React from 'react';
import { RingLoader } from 'react-spinners';


const Loader = props => (
  <div className="sweet-loading loader-center">
    <RingLoader
      color="#e50000"
      loading={props.Loading}
    />
  </div>
);

export default Loader;
