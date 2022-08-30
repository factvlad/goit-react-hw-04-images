import PropTypes from "prop-types"
import s from "./ImageGallaryItem.module.scss"

function ImageGalleryItem({ webformat, id, largeImg, tags, renderImgInModal }) {
  return (
    <li className={ s.imageGalleryItem } key={ id } onClick={ renderImgInModal }>
      <img className={ s }
        src={ webformat }
        alt={ tags }
        title={ largeImg } />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  largeImg: PropTypes.string.isRequired,
  renderImgInModal: PropTypes.func,
  tags: PropTypes.string.isRequired,
  webformat: PropTypes.string.isRequired,
}

export default ImageGalleryItem;
