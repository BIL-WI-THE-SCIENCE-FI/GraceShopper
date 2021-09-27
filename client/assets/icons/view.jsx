import React from 'react'

function View(props) {
  const fill = props.fill || 'currentColor'
  const secondaryfill = props.secondaryfill || fill
  const strokewidth = props.strokewidth || 1
  const width = props.width || '100%'
  const height = props.height || '100%'
  const title = props.title || 'view'

  return (
    <svg
      className="svgicon"
      height={height}
      width={width}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={secondaryfill}>
        <path
          d="M31.376,14.2C29.239,11.433,23.463,5,16,5,8.442,5,2.717,11.438.608,14.2a2.936,2.936,0,0,0,.011,3.592C2.758,20.563,8.536,27,16,27s13.239-6.433,15.374-9.195A2.935,2.935,0,0,0,31.376,14.2ZM16,22a6,6,0,1,1,6-6A6,6,0,0,1,16,22Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

export default View
