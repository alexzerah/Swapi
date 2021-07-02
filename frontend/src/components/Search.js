import React, { Component } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Checkbox from "./Checkbox";

const callApi = async (api, path) => {
  const res = await axios.get(api + path, {});
  const data = await res.data;
  return data;
};

const OPTIONS = [
  "people",
  "planets",
  "films",
  "species",
  "vehicles",
  "starships",
];

const object = {
  name: "o",
  age: 12,
  father: "ss",
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
      search: "",
      results: {},
      isWookie: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchbarChange = this.handleSearchbarChange.bind(this);
    this.handleIsWookieChange = this.handleIsWookieChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const res = Object.keys(this.state.checkboxes).filter(
      (checkbox) => this.state.checkboxes[checkbox]
    );

    const field = res[0];

    const searched = this.state.search;
    const isWookie = this.state.isWookie;

    const data = await callApi(
      "http://localhost:8000",
      `/api/${field}?search=${searched}&path=${field}&wookie=${isWookie}`
    );

    this.setState({
      results: data,
    });

    return;
  }

  handleCheckboxChange(changeEvent) {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  }

  handleSearchbarChange(changeEvent) {
    const search = changeEvent.target.value;

    this.setState(() => ({
      search: search,
    }));
  }

  handleIsWookieChange(changeEvent) {
    const isWookie = changeEvent.target.checked;

    this.setState(() => ({
      isWookie: isWookie,
    }));
  }

  render() {
    function RenderView() {
      const location = useLocation();
      return <h3>Bonjour {location.pathname}</h3>;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Recherche:
            <input
              type="text"
              name="name"
              onChange={this.handleSearchbarChange}
            ></input>
          </label>
          <label>
            Wookie
            <input type="checkbox" onChange={this.handleIsWookieChange} />
          </label>
          <Checkbox
            label={"people"}
            isSelected={this.state.checkboxes["option"]}
            onCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            label={"planets"}
            isSelected={this.state.checkboxes["option"]}
            onCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            label={"films"}
            isSelected={this.state.checkboxes["option"]}
            onCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            label={"species"}
            isSelected={this.state.checkboxes["option"]}
            onCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            label={"vehicles"}
            isSelected={this.state.checkboxes["option"]}
            onCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            label={"starships"}
            isSelected={this.state.checkboxes["option"]}
            onCheckboxChange={this.handleCheckboxChange}
          />
          <input type="submit" value="Envoyer" />
        </form>
        <div>
          <p>Résultats: {this.state.results?.count}</p>
          <ul>
            {this.state.results?.results?.map((r) => (
              <li key={r.name + "-" + r.height}>
                <Link to={{ pathname: `/api/card/`, state: { user: r } }}>
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <RenderView />
        <div></div>
      </div>
    );
  }
}

export default Search;
