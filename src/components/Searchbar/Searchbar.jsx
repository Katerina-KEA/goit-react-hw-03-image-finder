import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchbarHeader, SearchForm } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    /*Вызываем функцию `onSubmit` из свойства `props` текущего объекта.
     Эта функция принимает один аргумент - значение переменной `query` из состояния(state).
     Передаем это значение в функцию`onSubmit`,
     чтобы она могла обработать его или выполнить какие-то действия, связанные с этим значением*/
    this.props.onSubmit(this.state.query);

    this.setState({
      query: '',
    });
  };
  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

