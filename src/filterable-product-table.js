import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ProductRow(props){
  return(
    <tr><td>{props.name}</td> <td>{props.price}</td></tr>
  );
}

function ProductCategoryRow(props){
  return(
    <th><td><strong>{props.category}</strong></td></th>
  )
}

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    // To reflect on the user interface
    if(e.target.type === 'checkbox'){
      this.props.filterProducts(null, e.target.checked);
    } else {
      this.props.filterProducts(e.target.value, null);
    }                           
  }
  render(){
    return(
      <div>
        <input type="text" value={this.props.value} onChange={this.handleChange}/><br/>
        <input type="checkbox" onChange={this.handleChange} checked={this.props.onlyInStock}/>
        <label>Show only available products</label>
      </div>
    )
  }
}

class ProductTable extends React.Component{
  constructor(props){
    super(props);
    this.filterProducts = this.filterProducts.bind(this);
  }
  
  filterProducts(filterText, onlyInStock){
    let initialList = this.props.products;
    let filteredList = [];
    if(onlyInStock === true){
      initialList = this.filterOnlyInStock(initialList);
    }
    if(filterText === ""){
      return initialList;
    }
    initialList.forEach(function(item){
      // To accomodate case insensitive comparision, both the string and
      // filter text are converted into lower case
      if(item.name.toLowerCase().includes(filterText.toLowerCase())){
        filteredList.push(item);
      }
    });
    return filteredList;
  }

  filterOnlyInStock(list){
    let onlyInStockList = [];
    list.forEach(function(item){
      if(item.stocked)
        onlyInStockList.push(item);
    });
    return onlyInStockList;
  }

  render(){    
    const filterText = this.props.value;
    const onlyInStock = this.props.onlyInStock;
    
    // First, the data of products matching the filtering criteria will be retrieved
    let products = this.filterProducts(filterText, onlyInStock);

    // Then, the categories of those filtered products will be retrieved.
    // By using this, the search result will show only categories whose 
    // at least one product matches the filter criteria i.e. there will not
    // be any category name with empty product list in the search 
    //results
    let categories = [];
    products.forEach(function(currentProduct){
      let currentCategory = currentProduct.category;
      if(!categories.includes(currentCategory)){
        categories.push(currentCategory);
      }
    });
    let rows = [];

    // Then, the resultant rows will be displayed under their categories with following
    categories.forEach(function(currentCategory){
      rows.push(<ProductCategoryRow category={currentCategory}/>);
      products.forEach(function(currentProduct){
        if(currentProduct.category === currentCategory)
        rows.push(<ProductRow name={currentProduct.name} price={currentProduct.price}/>);
      });
    });

    return (
      // Filtered products will be displayed as a table
      <table border="0.5">
        {rows}
      </table>
    );
  }
}

// This class will be exported to the external js source files.
// I have made this as an independent and reusable component
class FilterableProductTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:'',
      onlyInStock: false
    }
    this.updateStateParams = this.updateStateParams.bind(this);
  }

  updateStateParams(filterText, onlyInStock){
    if(filterText !== null){
      this.setState({value:filterText});
    }
    if(onlyInStock !== null){
      this.setState({onlyInStock:onlyInStock});
    }
  }

  render(){
    return(
      <div>
        <SearchBar value={this.state.value} onlyInStock={this.state.onlyInStock} filterProducts = {this.updateStateParams}/>
        <ProductTable products = {this.props.data} value={this.state.value} onlyInStock={this.state.onlyInStock} />
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <FilterableProductTable data={products}/>    
//     );
//   }
// }

export default FilterableProductTable;
