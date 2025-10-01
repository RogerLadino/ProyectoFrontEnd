import React from 'react';

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

export default FeatureSection;