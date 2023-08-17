import axios from 'axios';

const fetchImages = ({
  searchQuery = '',
  currentPage = 1,
  perPage = 12,
  error,
}) => {
  const keyApi = '37713540-617e3e53817eb581a56de069f';

  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then(response => response.data)
    .catch(error => error);
};

export default { fetchImages };
