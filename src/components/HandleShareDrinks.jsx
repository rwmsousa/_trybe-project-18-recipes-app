import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function HandleShare({ value }) {
  const {
    msgClipboard,
    shareLink } = value;

  return (
    <div>
      { msgClipboard ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Link copiado!</strong>
        </div>
      ) : null }

      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ shareLink }
      >
        <img src={ shareIcon } alt="share link" />
      </button>
    </div>
  );
}

HandleShare.propTypes = {
  value: PropTypes.shape({
    msgClipboard: PropTypes.func,
    shareLink: PropTypes.func,
  }),
};

HandleShare.defaultProps = {
  value: [],
};

export default HandleShare;
