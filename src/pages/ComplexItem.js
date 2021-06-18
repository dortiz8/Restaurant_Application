

import React, { useEffect, useState } from 'react';
import useFetch from '../services/useFetch'
import ChoicesComponent from "./ChoicesCompoenent"


function ComplexItem({
    activeItem,
    addToCart,
    sides,
    addToSides,
    deleteFromSides
}) {
    const { data: options, loading, error } = useFetch("complexOptions")
    const [qty, setQty] = useState(0);
    // const [storedChoices, setStoredChoices] = useState([])
    const [id, setId] = useState(0);
    const [choiceList, setChoiceList] = useState([]); 
    const [disable, setDisable] = useState(true); 


    //Enable AddtoCart button if the conditions are met
    useEffect(()=>{
        if(qty === 0) return true; 
        if (sides.length > 0 && (choiceList.length === parseInt(qty)) ){
            setDisable(false);
        } else{
            setDisable(true)
        }
    }, [sides, choiceList])

    useEffect(() => {
        setChoiceList([])
    }, [qty])

    function addToChoiceList(obj) {
        setChoiceList(list => {
            return ([...list, { ...obj }])
        })

    }
    function editChoiceList(id) {
        let selectedChoice;
        choiceList.forEach(choice => {
            if (id === choice.id) {
                selectedChoice = choice;
            }
        });
        const position = choiceList.indexOf(selectedChoice);
        setChoiceList(list => {
            list.splice(position, 1);
            return [...list]
        })
    }

    // useEffect(() => {
    //     localStorage.setItem("storedChoices", JSON.stringify(storedChoices)); 
        

    // }, [storedChoices, qty]);

    //useEffect() to keep track of the sides boxes selected
    // useEffect(() => {
    //     let sideList = document.getElementsByClassName("side");
    //     for (let i = 0; i < sideList.length; i++) {
    //         const side = sideList[i];
    //         sides.length == 2 && !side.checked ? side.disabled = true : side.disabled = false;
    //     }
    // }, [sides])


    function fetchQty(i) {
        for (const key in options.quantities) {
            const choices = options.quantities[key];
            if (key == i.name.toLowerCase()) {
                return (
                    choices.map(c => (
                        <option
                            value={c}

                        >{c}</option>
                    )
                    )
                )

            }
        }
    }
    function fetchSides() {
        return options.sides.map(s => (
            <li>
                {s}
                <input
                    className="side"
                    type="checkbox"
                    onClick={(e) => {
                        if (e.target.checked && sides.length != 2) {
                            addToSides(e.target.value)
                        } else {
                            deleteFromSides(e.target.value)
                        }
                    }}
                    value={s}
                ></input>
            </li>
        ))
    }


    function activateAddToCart() {
       
    }

    if (loading) return <h1>Page is loading...</h1>

//Final return of ComplexItem 
    return (
        <section>
            <img src={`public/images/${activeItem.image}`} />
            <h1>{activeItem.name}</h1>
            {!options.quantities ? (<></>) : <p>Quantity</p>}

            <select
                onChange={
                    (e) => {setQty(e.target.value)}
                    }
                name="" id="">
                <option value={0}>Select quantity</option>
                {fetchQty(activeItem)}
            </select>
       
            {
                qty==0 ? (<></>): (
                    <div className="choiceComponent">
                        {<ChoicesComponent
                            activeItem={activeItem}
                            qty={qty}
                            choiceList={choiceList}
                            addToChoiceList={addToChoiceList}
                            editChoiceList={editChoiceList}
                        />}
                    </div>
                )
            }
           

            <ul>
                {fetchSides()}
            </ul>
            <button
                onClick={() => addToCart(activeItem, sides, choiceList, qty)}
                disabled={disable}
            >Add to Cart</button>

        </section>

    )
}



export default ComplexItem;
