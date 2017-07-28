import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import fontAwesomeStyles from 'font-awesome/css/font-awesome.min.css';
import deathAndCoRecipes from './etc/death_and_co_recipes.csv';
import pdtRecipes from './etc/pdt_recipes.csv';
import { chain, map } from 'lodash';
import { HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import CocktailIndex from './CocktailIndex'

const indexes = map([{
  name: 'PDT',
  link: '/pdt',
  recipes: pdtRecipes
}, {
  name: 'Death & Co',
  link: '/death_and_co',
  recipes: deathAndCoRecipes
}], i => ({...i, ingredients: chain(i.recipes).map('ingredient').uniq().sortBy().map(name => ({ name })).value() }));


const App = ({ ...props }) => {
  const links = map(indexes, (i, idx) => (
    <Route path={i.link} key={i.name} children={({match}) => (
      <span>{idx > 0 && ' / '}{match ? i.name : <Link to={i.link}>{i.name}</Link>}</span>
    )} />
  ));

  return (
    <Router>
      <div className="container-fluid" style={{marginTop: 10, fontSize: '80%'}}>
        <h2 className="text-center mb-2">{links} Index</h2>
        <Switch>
          {indexes.map(i => (
              <Route key={i.name} path={i.link} render={props => (
                <CocktailIndex name={i.name} recipes={i.recipes} ingredients={i.ingredients} saveKey={`selected`} />
              )} />
          ))}
          <Route render={() => <Redirect to="/pdt" />}></Route>
        </Switch>
        <p className="text-muted mt-3 text-center">Thanks to /u/ThePaternalDrunk and /u/el_joker1 for the original index spreadsheets</p>
      </div>
    </Router>
  );
}

export default App;
