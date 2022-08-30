import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import { Button, Searchbar, ImageGallery, Loader, Modal } from 'components';
import getImages from "../shared/api.js";
import 'react-toastify/dist/ReactToastify.css';
import s from "./App.module.scss"

export class App extends Component {

  state = {
    search: '',
    arrImage: [],
    page: 1,
    showBtn: false,
    loading: false,
    showModal: false,
    total: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search) {
      this.setState({
        loading: true,
      });
      getImages(search, page)
        .then(({ hits, total }) => {
          if (total === 0) {
            this.setState({
              loading: false,
              showBtn: false,
              arrImage: [],
            });
            return toast.error(
              "🌈🌈🌈 Sorry, there are no images matching your search query. Please try again", {
              position: "top-right",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
          this.setState({
            arrImage: [...hits],
            total: total,
            showBtn: true,
            loading: false,
          });
        })
        .catch(err => console.log(err));
    }

    if (page !== prevState.page) {
      this.setState({
        loading: true,
      });
      getImages(search, page)
        .then(({ hits, total }) => {
          if (hits.length < 12) {
            this.setState({
              showBtn: false,
            });
          }
          this.setState({
            arrImage: [...prevState.arrImage, ...hits],
            total: total,
            loading: false,
          });
        })
        .catch(err => console.log(err));
    }
  }

  onSubmitData = dataSearch => {
    this.setState({
      search: dataSearch,
    });
  };

  onClickAddImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClickToggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  renderImgInModal = ({ target }) => {
    this.onClickToggleModal();
    const { title } = target;
    this.setState({
      title,
    });
  };

  render() {
    const { onSubmitData, onClickAddImg, renderImgInModal } = this;
    const { arrImage, showBtn, loading, showModal, title } = this.state;
    return (
      <>
        <div className={ s.app }>
          { showModal && (
            <Modal onClick={ this.onClickToggleModal }>
              <img src={ title } alt="" />
            </Modal>
          ) }
          <Searchbar onSubmit={ onSubmitData } />
          <ImageGallery
            arrImage={ arrImage }
            renderImgInModal={ renderImgInModal }
          />
          { loading && <Loader /> }
          <ToastContainer />
        </div>
        { showBtn && <Button onClickAdd={ onClickAddImg } /> }
      </>
    );
  }
}
