import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';

import ImageGallery from './ImageGallery/ImageGallery';

import Loader from './Loader/Loader';

import Button from './Button/Button';

import pixabayApi from './api/pixabay-api';

class App extends Component {
  state = {
    gallery: [],
    currentPage: 1, // для того, чтоб при onload more, могло догружаться еще 12 фото на 1й стр
    perPage: 12,
    searchQuery: '', //для сохран. query м/д запросами
    isLoading: false, // состояние загрузки
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    /* console.log('update');
    если при обновлении компонента, обновилось свойство searchQuery ({ searchQuery: query }) , делаем http-запрос.
    в противном случае, http-запрос делается с пустой сторокой(searchQuery: ''). Результат не возвращается*/
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  // когда будет изменяться query, использ м-д, который будет отрабатываться при submit формы,
  changeQuery = query => {
    // console.log(query);

    /* чтобы при нажатии на  Load more продолжался осуществляться запрос по предыдущему query;
    Для изменения термина поиска. Чтобы currentPage снова начинал отрисовываться с 1-й страницы, а не продалжал увеличиваться +1 при вводе нового query в input 
    Чтобы articles  обнулялся от предыдущих статей при новом запросе перед началом
    И при каждом новом запросе обнулялся error*/
    this.setState({
      searchQuery: query,
      currentPage: 1,
      gallery: [],

      error: null, //для catch, для обработки ошибок
    });
  };

  // для удобства переиспользования, выносим http-запрос в отдельный метод
  fetchImages = () => {
    const { searchQuery, currentPage, perPage, error } = this.state;

    // в отдельную переменную выводим  searchQuery, currentPage для того, чтобы передать options в props в pixabay-api.js;
    const options = { searchQuery, currentPage, perPage, error };

    // соcтояние загрузки, значение меняется
    this.setState({ isLoading: true });

    // если пользователь ничего не ввел в input, http-запрос не отправлять (проверка)
    if (!searchQuery) {
      return;
    }
    //   делаем http-запрос по результатам того, что пользователь ввел в input. Т.е., по результатам query,

    // вызов функции из файла, который прописывает логику настроек Api (pixabay-api.js)
    pixabayApi
      .fetchImages(options)

      .then(({ hits, totalHits }) => {
        // console.log(hits);
        // console.log(totalHits);

        // если массив данных не пустой, условие:
        if (hits.length === 0) {
          throw new Error('No matches were found! Try again!');
        }

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...hits],
          totalHits,

          // при нажатии на Load more увеличиваем currentPage (отрисовывается следующую часть запроса)
          currentPage: prevState.currentPage + 1,
        }));

        // Плавная прокрутка
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))

      // когда загрузились данные, убираем отображение спиннера
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { gallery, currentPage, perPage, isLoading, totalHits, error } =
      this.state;

    // если закончились images, должен ли отображаться Load more и спиннер
    const shouldRenderLoadMoreButton = gallery.length > 0 && !isLoading;

    const hideLoadMoreButton = totalHits > (currentPage - 1) * perPage;
    // console.log('perPage:', perPage);
    // console.log('currentPage:', currentPage);

    return (
      <div className="App">
        {/* В props передаем метод, который будет отрабатываться при submit формы(Searchbar. ) */}
        <Searchbar onSubmit={this.changeQuery} />
        {/* ImageGallery */}
        <ImageGallery gallery={gallery} />
        {/* Loader {/* появление спиннера, рендерим по условию  */}
        {isLoading && <Loader />}
        {/* Button Load more. Рендер по условию */}
        {shouldRenderLoadMoreButton && hideLoadMoreButton && (
          <Button onClick={this.fetchImages}>
            <Loader />
          </Button>
        )}
        {/*  рендер по условию.Для обработки ошибок (error), error.message = 'No matches were found! Try again!' */}
        {error && <h2 className="ErrorMessage">{error.message}</h2>}
      </div>
    );
  }
}

export default App;
