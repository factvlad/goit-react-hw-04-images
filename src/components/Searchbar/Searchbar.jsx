import PropTypes from "prop-types"
import { Component } from 'react'
import { toast } from "react-toastify";
import s from "./Searchbar.module.scss"

class Searchbar extends Component {
  state = {
    search: '',
  };

  searchInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitSearch = e => {
    e.preventDefault();
    const { search } = this.state;
    if (search === '') {
      this.reset();
      return toast.warn("🦄 Please enter your request!")
    }
    this.props.onSubmit(search);
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { searchInput, submitSearch } = this;
    const { search } = this.state;
    return (
      <>
        <header className={ s.searchBar } >
          <form className={ s.searchForm } onSubmit={ submitSearch }>
            <button className={ s.searchFormButton } type="submit"  >
              <span className={ s.searchFormButtonLabel }>
                Search
              </span>
            </button>
            <input
              className={ s.searchFormInput }
              onChange={ searchInput }
              value={ search }
              name="search"
              placeholder="Search images and photos and something else"
              type="text"
              autoComplete="off"
              autoFocus
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func
}

export default Searchbar;
