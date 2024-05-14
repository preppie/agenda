import { useState, useEffect } from "react";
import React from "react";



function BookSearch(props) {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (value.length > 0) {
            fetch('https://agenda-a384a-default-rtdb.europe-west1.firebasedatabase.app/').then(
                response => response.json()
            ).then(responseData => {
                setResult([]);
                let searchQuery = value.toLocaleLowerCase();
                for (const key in responseData) {
                    let books = responseData[key].name.toLowerCase();
                    if (books.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                        setResult(prevResult => {
                            return [...prevResult, responseData[key].name]
                        });
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            setResult([]);
        }

    }, [value])

    return (
        <div>
            <p className="titleText">Book Search</p>
            <input type="text"
                className="searchBar"
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <div className="searchBack">
                {result.map((result, index) => (
                    <a href="#" key={index}>
                        <div className="searchEntry">
                            {result}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );

}

export default BookSearch;