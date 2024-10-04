import React from 'react';

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'grey',
        borderRadius: '50%',
        padding: '10px',
        zIndex: 2,
        cursor: 'pointer',
        ...(direction === 'prev' ? { left: '10px' } : { right: '10px' })
      }}
      onClick={onClick}
    >
      {direction === 'prev' ? '<' : '>'}
    </div>
  );
};

export default CustomArrow;
