import React, { memo } from 'react'

function Grid(props) {
  const { color } = props;
  return (
    <div
      className="color-box"
      style={{ backgroundColor: color.hex, height: 200 + Math.floor(Math.random() * 25) * 10 }}
    >
      <span className="name">{color.name}</span>
      <span className="hex">{color.hex}</span>
    </div>
  )
}

export default memo(Grid);