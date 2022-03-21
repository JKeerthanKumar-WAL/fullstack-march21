import { useState, useEffect } from 'react';
import axios from 'axios';

const Twitter = () => {
    const [details, setDetails] = useState([
        {
            title: 'Australia Cricket Board',
            body: 'Australian mens cricket team is working really hard',
            date_of_creation: 1647860807440,
            author: 'Justin Langer',
            category: 'Sports',
        },
        {
            title: 'Film Festival',
            body: 'RRR promotions are going on at a rapid speed',
            date_of_creation: 1647860807440,
            author: 'Candice',
            category: 'Entertainment',
        },
    ]);
    const getDetails = () => {
        axios
            .get('/twitter')
            .then((res) => {
                setDetails(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getDetails();
    }, []);
    const createDetails = (event) => {
        event.preventDefault();
        const doc = Date.now();
        const detailsOb = {
            title: event.target.title.value,
            body: event.target.body.value,
            date_of_creation: doc,
            author: event.target.author.value,
            category: event.target.category.value,
        };
        axios
            .post('/twitter', detailsOb)
            .then((res) => {
                getDetails();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteDetails = (indexToDelete) => {
        axios
            .delete('/twitter/' + indexToDelete)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getDetails();
    };
    const deleteAll = () => {
        axios
            .get('/twitter/deleteall')
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getDetails();
    };
    return (
        <div className="App-div">
            <h1>Twitter</h1>
            <form onSubmit={createDetails}>
                <b>Title : </b>
                <input type="text" name="title" />
                <br />
                <b>Body : </b>
                <textarea name="body"></textarea>
                <br />
                <b>Author : </b>
                <input type="text" name="author" />
                <br />
                <b>Category : </b>
                <select name="category">
                    <option selected>Select</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Study">Study</option>
                    <option value="Politics">Politics</option>
                    <option value="Sports">Sports</option>
                </select>
                <br />
                <button>
                    <b>Add Details</b>
                </button>
            </form>
            {details.map((val, index) => {
                return (
                    <div className="Card-div">
                        <h2>
                            {val.title}
                            <span className="Category-span">
                                {val.category} <b>-</b>
                            </span>
                            <span className="Doc-span">
                                {val.date_of_creation}
                            </span>
                        </h2>
                        {val.body} - <b>{val.author}</b>
                        <br />
                        <div className="Button-div">
                            <button
                                onClick={() => {
                                    deleteDetails(index);
                                }}
                            >
                                <b>Delete</b>
                            </button>
                        </div>
                    </div>
                );
            })}
            <button onClick={deleteAll}>
                <b>Delete All</b>
            </button>
        </div>
    );
};
export default Twitter;
