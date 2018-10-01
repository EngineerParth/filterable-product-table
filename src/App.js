import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import products from './Products.js';

function ProductRow(props){
  return(
    <div>{props.name} {props.price}</div>
  );
}

function ProductCategoryRow(props){
  return(
    <div><strong>{props.category}</strong></div>
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
      if(item.name.includes(filterText)){
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
    let categories = ["Sporting Goods","Electronics"];// retrieve categories here
    
    const filterText = this.props.value;
    const onlyInStock = this.props.onlyInStock;
    
    let products = this.filterProducts(filterText, onlyInStock);
    let rows = [];

    categories.forEach(function(currentCategory){
      rows.push(<ProductCategoryRow category={currentCategory}/>);
      products.forEach(function(currentProduct){
        if(currentProduct.category === currentCategory)
        rows.push(<ProductRow name={currentProduct.name} price={currentProduct.price}/>);
      });
    });
    return rows;
  }
}

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

class App extends Component {
  render() {
    return (
      <FilterableProductTable data={products}/>    
    );
  }
}

export default App;
