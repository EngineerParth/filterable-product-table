import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilterableProductTable from './filterable-product-table';
import products from './Products.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FilterableProductTable  data={products}/>, document.getElementById('root'));
registerServiceWorker();
