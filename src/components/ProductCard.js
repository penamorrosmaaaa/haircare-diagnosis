// ProductCard.jsx
import React from 'react';
import './ProductCard.css';

function ProductCard({ product, reason, language }) {
  return (
    <div className="product-card horizontal">
      {/* Si tuvieras imagen, podrías ponerla aquí */}
      <div className="product-card__info">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">
          <em>{product.description}</em>
        </p>
        {/* Razón de recomendación */}
        <p className="product-card__reason">
          <strong>{language === 'es' ? 'Razón:' : 'Reason:'}</strong> {reason}
        </p>
        <p>
          <strong>
            {language === 'es' ? 'Beneficio Principal:' : 'Main Benefit:'}
          </strong>{' '}
          {product.mainBenefit}
        </p>
        <p>
          <strong>
            {language === 'es'
              ? 'Beneficios Secundarios:'
              : 'Secondary Benefits:'}
          </strong>{' '}
          {product.secondaryBenefits}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
