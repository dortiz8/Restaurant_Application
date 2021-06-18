import React, {useState, useEffect}from 'react';
import PageNotFound from './PageNotFound'
import {useNavigate} from 'react-router-dom'
import useFetch from '../services/useFetch'
import ComplexItem from './ComplexItem';

function Item({sides,activeItem, addToCart, addToSides, deleteFromSides}){
    const {data: options, loading, error} = useFetch("complexOptions")
    // const [sides, setSides] = useState([])

    // function addToSides(val){
    //     setSides((side)=>{
    //         return [...side, val]
    //     })
    // }
    // function deleteFromSides(val){
    //     let newArr = [];
    //     for (let i = 0; i < sides.length; i++) {
    //         const c = sides[i];
    //        if (val != c) {
    //         newArr.push(c);
    //        }
    //     }
    //     setSides(newArr)
    // }

    useEffect(()=>{
        let sideList = document.getElementsByClassName("side");
        for (let i = 0; i < sideList.length; i++) {
            const side = sideList[i];
            sides.length ==2 && !side.checked ? side.disabled=true : side.disabled=false;
        }
    }, [sides])


    function fetchSides(){
        return   options.sides.map(s=>(
               <li key={options.sides.indexOf(s)}>
                   {s}
                   <input
                   className="side"
                   type="checkbox"
                    onClick={(e)=>{
                        if (e.target.checked && sides.length != 2) {
                            addToSides(e.target.value)
                        }else{
                            deleteFromSides(e.target.value)
                        }
                    } }
                    value={s}

                   ></input>
               </li>
           ))
       }
    if(loading) return <h1>Page is loading...</h1>
  return  activeItem.complexity === "simple" ? (
        <section>
                <img src={`/public/images/${activeItem.image}`} />
                <h1>{activeItem.name}</h1>
                <p>${activeItem.price}</p>
                 <p>{activeItem.description}</p>
                 <ul>
                {fetchSides()}
                </ul>
                 <button
                    onClick={()=>addToCart(activeItem, sides)}
                    disabled={sides.length < 1}
                 >Add to Cart</button>
            </section>
    ) : (
        <ComplexItem
        activeItem={activeItem}
        addToCart={addToCart}
        sides={sides}
        addToSides={addToSides}
        deleteFromSides={deleteFromSides}
        />
    )


}



export default Item;
