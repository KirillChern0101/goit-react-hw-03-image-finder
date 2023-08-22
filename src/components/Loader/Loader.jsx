import css from './Loader.module.css';
import { Dna } from 'react-loader-spinner';

export const Loader = () => (
  <div className={css.Loader}>
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div>
);
