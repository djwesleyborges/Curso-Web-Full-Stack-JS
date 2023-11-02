import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import SignIn from "./pages/public/SingIn";
import SignUp from "./pages/public/SingUp";


function Home() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

function Contacts() {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Lista Contatos</h2>
            <ul>
                <li>
                    <Link to={`${url}/1`}>Contato A</Link>
                </li>
                <li>
                    <Link to={`${url}/2`}>Contato B</Link>
                </li>
                <li>
                    <Link to={`${url}/3`}>Contato C</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path} />
                <Route path={`${path}/:contactId`}>
                    <Contact />
                </Route>
            </Switch>
        </div>
    )
}

function Contact() {
    let { contactId } = useParams();
    return (
        <div>
            <h3>Contato: {contactId}</h3>
        </div>
    )
}

function Messages() {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Lista de mensagens</h2>
            <ul>
                <li>
                    <Link to={`${url}/1`}>Mensagen Enviada A</Link>
                </li>
                <li>
                    <Link to={`${url}/2`}>Mensagen Enviada B</Link>
                </li>
                <li>
                    <Link to={`${url}/3`}>Mensagen Enviada C</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path={path} />
                <Route path={`${path}/:messageId`}>
                    <Message />
                </Route>
            </Switch>
        </div>
    )
}

function Message(){
    let { messageId } = useParams();
    return (
        <div>
            <h3>Mensagen: {messageId}</h3>
        </div>
    )
}

export default function Routes() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/contacts">Contatos</Link>
                    </li>
                    <li>
                        <Link to="/messages">Mensagens</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/contacts">
                        <Contacts />
                    </Route>

                    <Route exact path="/messages">
                        <Messages />
                    </Route>

                    <Route exact path="/signin">
                        <SignIn />
                    </Route>

                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}