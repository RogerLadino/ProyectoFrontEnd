import React from 'react';
import PropTypes from 'prop-types';

function FeatureSection({ sectionClassName, boxClassName, title, imageSrc }) {
  return (
    <section className={sectionClassName}>
      <h2>{title}</h2>
      <div className={boxClassName}>
        <img src={imageSrc} alt={title} />
      </div>
    </section>
  );
}

FeatureSection.propTypes = {
  sectionClassName: PropTypes.string.isRequired,
  boxClassName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
};

export default FeatureSection;