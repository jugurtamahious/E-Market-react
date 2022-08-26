import { Component } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Product from "./product";

export default class Productcard extends React.Component {
  state = {
    cart: null,
    local: null,
  };
  constructor(props) {
    super(props);
  }
  addToCart() {
    let tab = [];
    console.log(tab);
    let obj = {
      id: this.props.data.id,
      title: this.props.data.title,
      image: this.props.data.images.photos,
      price: this.props.data.price,
      count: 1,
    };
    tab.push(obj);
    let init = false;
    if (JSON.parse(localStorage.getItem("Product : ")) !== null) {
      let New_data = JSON.parse(localStorage.getItem("Product : "));
      New_data.map((dataa, index) => {
        if (dataa.title == this.props.data.title) {
          init = true;
          dataa.count += 1;
          console.log("test");
        }
      });
      if (init === false) {
        New_data.push(obj);
      }
      localStorage.setItem("Product : ", JSON.stringify(New_data));
    }

    if (JSON.parse(localStorage.getItem("Product : ")) === null) {
      localStorage.setItem("Product : ", JSON.stringify(tab));
    }
  }
  render() {
    return (
      <div className="card m-6 carte card-min-width">
        <div className="card-image p-6 is-128x128">
          <figure className="image">
            <img src={this.props.data.images.photos} alt="Placeholder" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{this.props.data.title}</p>
            </div>
          </div>

          <div className="content">
            <p>Description : </p>
            <p className="">Prix : {this.props.data.price} </p>
            <Link to={"product/" + this.props.data.id}>
              <button className="button is-info p-5">Plus d'information</button>
            </Link>
            <button
              className="button is-info p-5 mt-3"
              onClick={() => {
                this.addToCart();
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    );
  }
}
