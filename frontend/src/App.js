import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to="/auth" exact/>
                <Route path="/auth" component={AuthPage}/>
                <Route path="/events" component={EventsPage}/>
                <Route path="/bookings" component={BookingsPage}/>
            </Switch>
        </BrowserRouter>
    );
}


// class App extends Component {
//     render() {
//         return (
//             <BrowserRouter>
//                 <Route path="/" component={null}/>
//                 <Route path="/auth" component={null}/>
//                 <Route path="/event" component={null}/>
//                 <Route path="/booking" component={null}/>
//             </BrowserRouter>
//         );
//     }
// }

export default App;
