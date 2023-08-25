import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    const searchBar = e.currentTarget;
    this.props.handleSubmit(this.state);
    searchBar.reset();
  };
  handleChange = async e => {
    this.setState({ query: e.currentTarget });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="inputForSearch"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};
