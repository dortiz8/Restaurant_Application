

import React, { useState, useEffect } from 'react';
import useFetch from '../services/useFetch';
// Selection component dependent on quantity

export default function ChoicesComponent({
    activeItem,
    qty, 
    choiceList, 
    addToChoiceList,
    editChoiceList

}) {
    const { data: options, loading, error } = useFetch("complexOptions");


    let qtyArr = Array.from(Array(parseInt(qty)).keys())

  

    function DisplayChoices({ itemName, options, addToChoiceList, editChoiceList, choiceList, id }) {

        const [disable, setDisable] = useState(false)

        useEffect(()=>{
            choiceList.forEach(choice => {
                if(choice.id === id){
                    setDisable(true); 
                    return;
                }
            });
        }, [choiceList])

        let fetchMeats = () => {
            for (const key in options.meatChoices) {
                if (itemName.toLowerCase() === key) {
                    return options.meatChoices[key];

                }
            }
        }
        let meatChoices = fetchMeats();
        let fetchWraps = () => {
            for (const key in options.wraps) {
                if (itemName.toLowerCase() === key) {
                    return options.wraps[key];
                }
            }
        }
        const wraps = fetchWraps();
        let obj = {
            meat: "",
            wrap: "",
            id: id
        };

        function Selections({ id, choiceList }) {

            if (choiceList.length < 1) return <></>

            let returnedObj = {}
            choiceList.forEach(choice => {
                if (choice.id === id) {
                    returnedObj.meat = choice.meat;
                    returnedObj.wrap = choice.wrap;
                }
            })
            return (
                <>
                    <p>{returnedObj.meat}</p>
                    <p>{returnedObj.wrap}</p>
                </>
            )
        }
        return (
            <div>
                <Selections id={id} choiceList={choiceList} />
                <select
                    onChange={
                        (e) => {
                            obj.meat = e.target.value
                        }

                    }
                >
                    <option value="">Select meat</option>
                    {
                        meatChoices.map(choice => (
                            <option
                                value={choice}
                            >{choice}</option>
                        ))
                    }
                </select>
                <select
                    onChange={
                        (e) => {
                            obj.wrap = e.target.value
                        }

                    }
                >
                    <option>Select wrap</option>
                    {
                        wraps.map(choice => (
                            <option
                                value={choice}
                            >{choice}</option>
                        ))
                    }
                </select>
                <div>
                    <button
                        onClick={() => {
                            addToChoiceList(obj)

                        }}
                        id={id}
                        className="atcButton"
                        disabled={disable}
                    >Done</button>

                    <button
                        onClick={(e) => {
                            
                            editChoiceList(id)
                        }}
                        id={id}
                        className="editButton"
                        disabled={!disable}
                   
                    >Edit</button>
                </div>
            </div>

        )
    }




    if (loading) return <h1>loading...</h1>
    return (
        //Initial arr determined by quantity
        qtyArr.map(id => (
            <div key={id}>
                <h4>Option {id + 1}</h4>
                <DisplayChoices
                    itemName={activeItem.name}
                    options={options}
                    choiceList={choiceList}
                    addToChoiceList={addToChoiceList}
                    editChoiceList={editChoiceList}
                    id={id}

                    key={id} />
            </div>
        ))

    )

}