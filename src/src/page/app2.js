import logo from "../logo.svg";
import { Switch, Route } from "react-router-dom";
import "../App.css";
import Header from "../component/navbar2";
import Home from "./Accueil";
import Page404 from "./404";
import Product from "../component/product";
import Search from "./SEARCH";
import React from "react";
import Discount from "./navdirection/discount";
import Stock from "./navdirection/stock";
import Rated from "./navdirection/rated";
import Figurine from "./navdirection/figurine";
import Vetement from "./navdirection/vetement";
import Deco from "./navdirection/deco";
import Results from "./results";
import Pannier from "../component/pannier";

export default class App extends React.Component {
  state = {
    search: "",
    test: "",
    ok: 1,
  };
  constructor(props) {
    super(props);
    this.header = this.header.bind(this);

    this.deleteFromCart = this.deleteFromCart.bind(this);
  }
  handleChange() {
    this.setState(() => {
      return {
        search: "",
      };
    });
  }

  header(data) {
    this.setState(() => {
      return {
        search: data,
      };
    });
    return console.log(data);
  }
  deleteFromCart(product) {
    let tab = this.state.tab;
    tab.shift(product);
    this.setState(() => {
      // nouvelle technique

      return {
        cart: tab,
        local: tab,
      };
    });

    localStorage.setItem("Product", JSON.stringify(this.state.local));
    let toto = JSON.parse(localStorage.getItem("Product"));
    console.log(toto);
  }

  render() {
    let $search = this.state.search;
    return (
      <div className="App">
        <Route
          render={(props) => {
            return (
              <Header
                func={this.header}
                searching={this.state}
                history={props.history}
              />
            );
          }}
        />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search">
            <Results
              searching={this.state.search}
              products={this.state.products}
              addToCart={this.addToCart}
            />
          </Route>
          <Route path="/product/:id" component={Product} />
          <Route path="/pannier">
            <Pannier deleteFromCart={this.deleteFromCart} />
          </Route>
          <Route path="/discount">
            <Discount />
          </Route>
          <Route path="/stock">
            <Stock />
          </Route>
          <Route path="/rated">
            <Rated />
          </Route>
          <Route path="/figurine">
            <Figurine />
          </Route>
          <Route path="/vetement">
            <Vetement />
          </Route>
          <Route path="/decoration">
            <Deco />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    );
  }
}
/*return (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/product/:id" component={Product} />
      <Route path="/panier">ceci est le panier</Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  </div>
);*/
