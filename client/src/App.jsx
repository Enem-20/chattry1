import React from 'react';
import ReactDOM from 'react-dom/client';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

export default App;
