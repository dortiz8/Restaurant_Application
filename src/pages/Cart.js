import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchAll from '../services/useFetchAll'

function Cart({ cart, emptyCart, deleteFromCart, duplicateCartItem, orderTotal }) {
    const navigate = useNavigate();
    const urls = cart.map(i => `menu?name=${i.name}`)
    const { data: items, loading, error } = useFetchAll(urls);


    function renderItem(i) {
        const { name, price, id, sides, choices, qty } = i;
        const singleItem = items.find(b => b[0].name === name)
        console.log(choices)

        return (

            <li key={id} className="cartItem">
                <div>
                    <h4>{singleItem[0].name}</h4>
                    {qty > 0 && (<p>Qty: {qty}</p>)}
                    <span>${price}</span>
                </div>
                <img src={`public/images/${singleItem[0].image}`}></img>
                {choices !== undefined && (
                    <div>
                        <p>Choices</p>
                        <ul>
                            {
                                choices.map(c => (
                                    <li>
                                        <p>{c.id + 1}</p>
                                        <span>{c.meat}</span><br></br>
                                        <span>{c.wrap}</span>
                                    </li>
                                )
                                )
                            }
                        </ul>
                    </div>
                )
                }
                {sides !== undefined && (
                    <div>
                        <p>Sides</p>
                        <ul>
                            {
                                sides.map(s => (
                                    <li>
                                        {s}
                                    </li>
                                )
                                )
                            }
                        </ul>
                    </div>
                )
                }
                <div>
                    <button
                    id={id}
                    onClick={(e)=>deleteFromCart(e.target.id)}
                    >Delete</button>
                    <button
                    onClick={()=>duplicateCartItem(i)}
                    >+</button>
                </div>
                

            </li>
        )

    }




    if (loading) return <h1>Page is loading...</h1>

    return (
        <section>
            <h1>Cart</h1>
            <h2>{cart.length == 0 ? "Your Cart is empty" : `Items in cart: ${cart.length}`}</h2>
            <h3>{cart.length == 0 ? "" : `Order total: $${orderTotal}`}</h3>
            {   cart.length != 0 &&
                <div>
                    <button onClick={() => navigate("/menu")}>Add Items</button>
                    <button onClick={() => emptyCart()}>Clear Cart</button>
                </div>
            }
            <ul>
                {cart.map(renderItem)}
            </ul>



        </section>


    )
}



export default Cart;
