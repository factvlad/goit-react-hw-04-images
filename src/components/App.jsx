import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import { Button, Searchbar, ImageGallery, Loader, Modal } from 'components';
import getImages from "../shared/api.js";
import 'react-toastify/dist/ReactToastify.css';
import s from "./App.module.scss"

function App() {
  const [search, setSearch] = useState("")
  const [arrImage, setArrImage] = useState([])
  const [page, setPage] = useState(1)
  const [showBtn, setShowBtn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [title, showTitle] = useState("")

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoading(true);

    getImages(search, page)
      .then(({ hits, total }) => {
        if (total === 0) {
          setArrImage([]);
          setLoading(false);
          setShowBtn(false);
          return toast.error(
            "🌈🌈🌈 Sorry, there are no images matching your search query. Please try again",
          )
        }
        if (total <= 12) {
          setShowBtn(false);
          setLoading(false);
          setArrImage([...hits]);
          ;
        }
        setArrImage([...hits]);
        setShowBtn(true);
        setLoading(false);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (search === '' || page === 1) {
      return;
    }

    setLoading(true);
    getImages(search, page)
      .then(({ hits }) => {
        if (hits.length <= 12) {
          setShowBtn(false);
        }

        setArrImage(prevArr => [...prevArr, ...hits]);

        setShowBtn(true);
        setLoading(false);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [page]);

  const onSubmitData = dataSearch => {
    setSearch(dataSearch)
    setPage(1)
  };

  const onClickAddImg = () => {
    setPage(prevState => prevState + 1)
  };


  const onClickToggleModal = () => {
    setShowModal(!showModal);
  };

  const renderImgInModal = ({ target }) => {
    onClickToggleModal();
    const { name } = target;
    showTitle(name)
  };

  return (
    <>
      <div className={ s.app }>
        { showModal && (
          <Modal onClick={ onClickToggleModal }>
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

export default App;

