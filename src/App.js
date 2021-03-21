import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./component/home";
import PokemonDetail from "./component/pokemon";

import "./index.css";


const App = () => {
  
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/pokemon/:pokemonId" component={PokemonDetail} exact />
          </Switch>
      </BrowserRouter>
    );
  
}

export default App;