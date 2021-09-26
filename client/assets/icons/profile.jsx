import React from 'react'

function Profile(props) {
  const fill = props.fill || 'currentColor'
  const secondaryfill = props.secondaryfill || fill
  const strokewidth = props.strokewidth || 1
  const width = props.width || '100%'
  const height = props.height || '100%'
  const title = props.title || 'profile'

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
          d="M16,32A32.808,32.808,0,0,1,3.594,29.914,1,1,0,0,1,3,29,10.011,10.011,0,0,1,13,19h6A10.011,10.011,0,0,1,29,29a1,1,0,0,1-.594.914A32.808,32.808,0,0,1,16,32Zm12-3h0Z"
          fill={fill}
        />
        <path d="M16,17c-4.579,0-8-4.751-8-9A8,8,0,0,1,24,8C24,12.249,20.579,17,16,17Z" />
      </g>
    </svg>
  )
}

export default Profile
