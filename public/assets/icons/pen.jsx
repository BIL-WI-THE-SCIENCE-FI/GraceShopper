import React from 'react'

function Pen(props) {
  const fill = props.fill || 'currentColor'
  const secondaryfill = props.secondaryfill || fill
  const strokewidth = props.strokewidth || 1
  const width = props.width || '100%'
  const height = props.height || '100%'
  const title = props.title || 'pen'

  return (
    <svg
      className="svgicon"
      height={height}
      width={width}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={secondaryfill}>
        <path
          d="M28.586,8,6.293,30.293a1,1,0,0,0-.255.433l-4,14A1,1,0,0,0,3,46a1.018,1.018,0,0,0,.274-.038l14-4a1,1,0,0,0,.433-.255L40,19.414Z"
          fill={fill}
        />
        <path d="M44.828,8.929,39.07,3.172a4.093,4.093,0,0,0-5.656,0L30,6.586,41.414,18l3.414-3.414A4,4,0,0,0,44.828,8.929Z" />
      </g>
    </svg>
  )
}

export default Pen
