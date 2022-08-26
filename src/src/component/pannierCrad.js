import React from "react";
export default class PannierCard extends React.Component {
  state = {
    count: this.props.product.count,
    price: this.props.product.price,
  };
  constructor(props) {
    super(props);
    this.Plus = this.Plus.bind(this);
  }
  Plus() {
    this.props.Plus(this.props.product.title);
    console.log("test");
  }
  Moins() {
    this.props.Moins(this.props.product.title);
    console.log("test");
  }

  render() {
    return (
      <div className="img">
        <figure className="card-image p-6 is-180x180">
          {<img src={this.props.product.image[0]} />}
        </figure>

        <div className="contents">
          <p>{this.props.product.title}</p>
          <h2>{this.props.product.price}</h2>
        </div>
        <div className="btn">
          <button
            className="btnplus"
            type="button"
            onClick={() => {
              this.Plus();
              this.setState((state) => {
                return {
                  count: state.count + 1,
                };
              });
            }}
          >
            +
          </button>
          <h1>{this.state.count}</h1>
          <button
            className="btnmoins"
            type="button"
            onClick={() => {
              this.Moins();
              this.setState((state) => {
                return {
                  count: state.count - 1,
                };
              });
            }}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}
