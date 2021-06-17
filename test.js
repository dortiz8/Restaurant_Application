import React, { useState } from 'react';
// Selection component dependent on quantity

export default function ChoicesComponent({
    activeItem,
    qty,
    addToChoices,
    editChoice,
    storedChoices,
    setStoredChoices,
    options

}) {
    let qtyArr = Array.from(Array(parseInt(qty)).keys())
    return (
        <>
            {qtyArr.map(id => (
                <SelectionComponent
                    id={id}
                    activeItem={activeItem}
                    addToChoices={addToChoices}
                    editChoice={editChoice}
                    storedChoices={storedChoices}
                    setStoredChoices={storedChoices}
                    options={options}
                />
            )

            )}
        </>
    )
}


function SelectionComponent(
    id,
    activeItem,
    addToChoices,
    editChoice,
    storedChoices,
    setStoredChoices,
    options) {
    const [choiceObj, setChoiceObj] = useState({});


    function setMeat(target) {
        setChoiceObj({
            ...choiceObj,
            ["meat"]: target
        })
    }
    function setWrap(target) {
        setChoiceObj({
            ...choiceObj,
            ["wrap"]: target
        })
    }
    //Function to add choices to the localStorage object

    //Function to edit choices after choices were selected


    function activateAddToChoices(targetId) {
        if (choiceObj.id === targetId) {

        }

        return true;
    }

    //Selections component that returns the choices selected and 
    //stored in localStorage
    function Selections({ storedChoices, id }) {
        let meat = "";
        let wrap = "";
        if (storedChoices.length === 0) {
            return (
                <></>
            )
        } else {
            storedChoices.forEach(c => {
                if (c.id === id) {
                    meat = c.meat;
                    wrap = c.wrap;
                }
            })
            
            return (
                <>
                    <span>{meat}</span>
                    <span>{wrap}</span>
                </>
            )
        }

    }
    //Fetching Meat and Wrap Choices
    function FetchMeatChoices({ activeItem, setMeat }) {
        const i = activeItem;
        for (const key in options.meatChoices) {
            const choices = options.meatChoices[key];
            if (key == i.name.toLowerCase()) {
                return (
                    <div>

                        <select
                            onChange={(e) => setMeat(e.target.value)}
                            name=""
                            id=""
                        >
                            <option value="">Select Meat</option>
                            {
                                choices.map(c => (
                                    <option
                                        value={c}
                                        key={choices.indexOf(c)}
                                    >{c}</option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
        }
    }

    function FetchWrapChoices({ activeItem, setWrap }) {
        const i = activeItem;
        for (const key in options.wraps) {
            const choices = options.wraps[key];
            if (key == i.name.toLowerCase()) {
                return (
                    <select
                        onChange={(e) => setWrap(e.target.value)}

                        name=""
                        id="">
                        <option value="">Select Wrap</option>
                        {
                            choices.map(c => (
                                <option
                                    value={c}
                                    key={choices.indexOf(c)}
                                >{c}</option>
                            ))
                        }
                    </select>

                )
            }
        }
    }
    return (
        <div>
            <div>
                <p>{`Option: ${id + 1}`}</p>

                <div>
                    <Selections
                        storedChoices={storedChoices}
                        id={id}
                    />
                    <FetchMeatChoices activeItem={activeItem} setMeat={setMeat} />
                    <FetchWrapChoices activeItem={activeItem} setWrap={setWrap} />
                    <button
                        onClick={() => addToChoices(choiceObj, id)}
                        disabled={false}
                        id={id}
                    >Done</button>
                    <button
                        onClick={() => editChoice(id, choiceObj)}
                        disabled={true}

                    >Edit</button>
                </div>
            </div>


        </div>
    )

}