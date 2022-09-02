import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      toast.error('Введите наименование картинки!');
      return;
    }
    onSubmit(value);
    reset();
  };

  const reset = () => {
    setValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button className={s.searchFormButton} type="submit">
          <span className={s.SearchFormButtonLabel}></span>
        </button>

        <input
          onChange={handleChange}
          className={s.searchFormInput}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
