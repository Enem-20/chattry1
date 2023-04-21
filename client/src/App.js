import React from 'react';
import './App.css';

let available = true;

function manageForm() {
    available = !available;
}

function App() {
    if (available)
        return (
            <div className="App">
                <form>
                    <label>
                        Name:
                        <input type="text" name="name"/>
                    </label>
                    <input type="submit" value="Submit" onClick={manageForm}/>
                </form>
            </div>
        );
    else
        return null;
}

export default App;
