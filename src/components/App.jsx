import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export default function App() {
  const [searchValue, setSearchValue] = useState('');

  const formSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmit} />
      <ToastContainer />
      <ImageGallery searchValue={searchValue} />
    </>
  );
}
