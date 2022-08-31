import PropTypes from "prop-types"
import { useState } from 'react'
import { toast } from "react-toastify";
import s from "./Searchbar.module.scss"

function Searchbar({ onSubmit }) {
  const [search, searchState] = useState("")

  const searchInput = ({ target }) => {
    const { value } = target;
    searchState(value);
  };

  const submitSearch = e => {
    e.preventDefault();
    if (search === '') {
      this.reset();
      return toast.warn("🦄 Please enter your request!")
    }
    onSubmit(search);
    reset();
  };

  const reset = () => {
    searchState('')
  }

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


Searchbar.propTypes = {
  onSubmit: PropTypes.func
}

export default Searchbar;
