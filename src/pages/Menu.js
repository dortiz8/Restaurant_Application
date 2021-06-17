import React from 'react';
// import { useNavigate } from 'react-router-dom'
import useFetch from '../services/useFetch'


function Menu({ showActiveItem, addSingleItem}) {
    const { data: menu, loading, error } = useFetch('menu')
    

    function MainItem({ i }) {
        return (
            <>
                <h4>{i.name}</h4>
                <p>${i.price}</p>
                <p>{i.description}</p>
            </>
        )
    }


    if (loading) return (<h1>Loading Menu...</h1>)
    return (
        <section>
            <h1>Menu</h1>
            <div>
                <h3 className="menuSectionTitle">Specialties</h3>
                <ul>
                    {menu.map(i => {
                        if (i.type === "specialty")
                            return (
                                <li key={i.id}>
                                    {<MainItem i={i} />}
                                    <button onClick={() => {

                                        // moveToActive(i)
                                        // navigate('/item')
                                        showActiveItem(i)
                                    }}>Select</button>
                                </li>
                            )
                    })}
                </ul>
            </div>
            <div>
                <h3 className="menuSectionTitle">Sides</h3>
                <ul>
                    {menu.map(i => {
                        if (i.type === "side")
                            return (
                                <li key={i.id}>
                                    {<MainItem i={i} />}
                                    <button onClick={() => {
                                       addSingleItem(i);
                                    }}>Select</button>
                                </li>
                            )
                    })}
                </ul>
            </div>
            <div>
                <h3 className="menuSectionTitle">Desserts</h3>
                <ul>
                    {menu.map(i => {
                        if (i.type === "dessert")
                            return (
                                <li key={i.id}>
                                    {<MainItem i={i} />}
                                    <button onClick={() => {
                                       addSingleItem(i)
                                    }}>Select</button>
                                </li>
                            )
                    })}
                </ul>
            </div>
        </section>
    )
}



export default Menu;
