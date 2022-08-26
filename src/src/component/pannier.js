import React from "react";
import PannierCard from "./pannierCrad";
export default class Pannier extends React.Component {
  state = {
    products: "",
    totalPrice: "",
    cart: JSON.parse(localStorage.getItem("Product : ")) || [],
    count: [],
    new_count: null,
  };
  constructor(props) {
    super(props);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.Moins = this.Moins.bind(this);
    this.local = this.local.bind(this);
    this.Plus = this.Plus.bind(this);
  }

  componentDidMount() {
    this.getTotalPrice();
  }

  getTotalPrice() {
    let sum = 0;
    this.state.cart.map((product) => {
      sum += parseFloat(product.price) * product.count;
    });
    console.log(this.state.cart);

    sum = Math.round(sum * 100) / 100;
    return sum.toFixed(2);
  }

  local() {
    localStorage.setItem("Product", JSON.stringify(this.props.cart));
    let toto = JSON.parse(localStorage.getItem("Product"));
  }

  Plus(data) {
    let tab = [];

    let count = 0;
    if (JSON.parse(localStorage.getItem("Product : ")) !== null) {
      let New_data = JSON.parse(localStorage.getItem("Product : "));
      New_data.map((dataa, index) => {
        count += dataa.count;
        if (New_data[index].title == data) {
          New_data[index].count += 1;
        }
        tab.push(dataa.count);
      });
      localStorage.setItem("Product : ", JSON.stringify(New_data));
      this.setState(() => {
        return {
          cart: New_data || [],
          new_count: count,
        };
      });
      this.getTotalPrice();
      console.log("test");
    }

    if (JSON.parse(localStorage.getItem("Product : ")) === null) {
      localStorage.setItem("Product : ", JSON.stringify(tab));
    }
  }

  Moins(data) {
    let tab = [];

    let count = 0;
    if (JSON.parse(localStorage.getItem("Product : ")) !== null) {
      let New_data = JSON.parse(localStorage.getItem("Product : "));
      New_data.map((dataa, index) => {
        count -= dataa.count;
        if (New_data[index].title == data) {
          New_data[index].count -= 1;
        }
        tab.push(dataa.count);
        if (New_data[index] === 0) {
        }
        tab.unshift(New_data);
      });

      localStorage.setItem("Product : ", JSON.stringify(New_data));
      this.setState(() => {
        return {
          count: tab,
          cart: New_data || [],
          new_count: count,
        };
      });
      this.getTotalPrice();
      console.log("test");
    }

    if (JSON.parse(localStorage.getItem("Product : ")) === null) {
      localStorage.setItem("Product : ", JSON.stringify(tab));
    }
  }

  render() {
    return (
      <>
        <div className="contents">
          <p>{this.getTotalPrice()} &euro;</p>
        </div>

        <div className="imgs">
          {this.state.cart.map((product, index) => {
            return (
              <PannierCard
                Plus={this.Plus}
                Moins={this.Moins}
                key={index}
                cart={this.cart}
                product={product}
              />
            );
          })}
        </div>
      </>
    );
  }
}
