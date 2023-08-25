import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './apiPixaby/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
    showButton: false,
  };

  handleSubmit = async e => {
    this.setState({ isLoading: true });
    this.setState({
      currentSearch: e.query.value,
      images: [],
      isLoading: false,
      pageNr: 1,
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
      showButton: false,
    });
  };

  handleClickMore = async () => {
    this.setState(prevState => {
      return { pageNr: prevState.pageNr + 1 };
    });
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentSearch !== this.state.currentSearch ||
      prevState.pageNr !== this.state.pageNr
    ) {
      const response = await fetchImages(
        this.state.currentSearch,
        this.state.pageNr
      );

      this.setState({
        images: [...this.state.images, ...response.hits],
        showButton: this.state.pageNr !== Math.ceil(response.total / 12),
      });
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <React.Fragment>
          <Searchbar handleSubmit={this.handleSubmit} />
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <ImageGallery
                onImageClick={this.handleImageClick}
                images={this.state.images}
              />
              {this.state.images.length > 0 && this.state.showButton && (
                <Button show={this.state.show} onClick={this.handleClickMore} />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
        {this.state.modalOpen && (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
