import "./styles/main.scss";
import React, {useState,  useReducer, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import useFetch from './services/useFetch'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Item from './pages/Item'
import ComplexItem from "./pages/ComplexItem";


//MAIN APP ---> DERIVED FROM COPY

function App() {
  const navigate = useNavigate();
  // const fetchPrimitive = (name) =>{
  //   try {
  //     return JSON.parse(localStorage.getItem(name)) ?? [];
  //   } catch (error) {
  //     console.log("Parsed local storage info could not be retrieved")
  //     return [];
  //   }
  // }
  const fetchObject = (name)=>{
    try {
      if (typeof JSON.parse(localStorage.getItem(name)) === 'object'){
        return JSON.parse(localStorage.getItem(name)) ?? [];
      }else{
        return parseInt(JSON.parse(localStorage.getItem(name))) ?? 0;
      }
      
    } catch (error) {
      console.log("Parsed local storage info could not be retrieved")
      return [];
    }
  }
  // STATE
  const [activeItem, setActiveItem] = useState(fetchObject("activeItem"));
  const [cart, setCart] = useState(fetchObject("cart"));
  const [orderTotal, setOrderTotal] = useState(fetchObject("orderTotal"));
  const { data: options, loading, error } = useFetch("complexOptions")
  const [sides, setSides] = useState([])
  // DERIVED STATE
  const [id, setId] = useState(fetchObject("id")); 
 console.log("id: ",  id)
  //----------------------------------------------------------------------------//
  function showActiveItem(i){
    setActiveItem(i)
    if(i.complexity === "simple"){
      navigate('/item');
    }else{
      navigate('/complexItem')
    }
  }
  useEffect(()=>{
    localStorage.setItem("activeItem", JSON.stringify(activeItem));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("id", JSON.stringify(id)); 
    localStorage.setItem("orderTotal", JSON.stringify(orderTotal));
  }, [activeItem, cart, id, orderTotal]);

  function addToCart(i, sides, choiceList, qty){
    setId(id => id + 1)
    function priceDetermination(item, qty){
      if (qty === undefined) return item.price;
      switch (item.name.toLowerCase()) {
        case "tacos":
          if (parseInt(qty)===1) {
           return item.price = options.prices.tacos.one; 
          } else if (parseInt(qty) === 3){
            return item.price = options.prices.tacos.three;
          }else{
            return item.price = options.prices.tacos.five;
          }
        default:
          throw new Error;
      }
    }

    let truePrice = priceDetermination(i, qty); 

    setCart((item)=>{
      setOrderTotal((t)=>{
        return t + parseInt(truePrice);
      })
      return [...item, {
        name: i.name, 
        price: truePrice, 
        id: id, 
        complexity: i.complexity, 
        sides, 
        qty, 
        choices: choiceList}];
    });
    navigate('/cart')
  }
  function addSingleItem(i){
    setId(id => id + 1)
    setCart(item=>{
      
      setOrderTotal(t=>{
        return t + parseInt(i.price); 
      })
      return [...item, {
        name: i.name,
        price: i.price, 
        id: id
      }]
    })
    navigate('/cart')
  }
  
  function deleteFromCart(id){
    if(cart.length === 1){
      setOrderTotal(0);
      setId(0);
      setCart([])
      return; 
    }
    let itemToDelete;
    let price; 
    for (let i = 0; i < cart.length; i++) {
      if(parseInt(id)===cart[i].id){
        itemToDelete = i; 
        price = parseInt(cart[i].price);
      } 
    }
    cart.splice(itemToDelete, 1); 
    console.log("deleted item", itemToDelete)
    setCart((items)=>{
      return [...items]; 
    })
    setOrderTotal(total => {
      return total - price; 
    })
   
  }

  function addToSides(val) {
    setSides((side) => {
      return [...side, val]
    })
  }

  function deleteFromSides(val) {
    let newArr = [];
    for (let i = 0; i < sides.length; i++) {
      const c = sides[i];
      if (val != c) {
        newArr.push(c);
      }
    }
    setSides(newArr)
  }

  function emptyCart() {
    setOrderTotal(0); 
    setCart([]);
    setId(0); 
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/cart">Cart<span>{cart.length}</span></Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/menu" element={
        <Menu 
        // moveToActive={moveToActive}
     
        addSingleItem={addSingleItem}
        showActiveItem ={showActiveItem}
        />
        } />
        <Route path="/cart" element={
        <Cart
        cart={cart}
        emptyCart={emptyCart}
        deleteFromCart={deleteFromCart}
        orderTotal={orderTotal}
        />
        } />
        <Route path="/item" element={
        <Item
        sides={sides}
        activeItem={activeItem}
        addToCart={addToCart}
        addToSides={addToSides}
        deleteFromSides={deleteFromSides}
        />
        } />
        <Route path="/complexItem" element={
          <ComplexItem
          sides={sides}
            activeItem={activeItem}
            addToCart={addToCart}
            addToSides={addToSides}
            deleteFromSides={deleteFromSides}
          />
        } />
      </Routes>
    </div>

  )


}

export default App;
