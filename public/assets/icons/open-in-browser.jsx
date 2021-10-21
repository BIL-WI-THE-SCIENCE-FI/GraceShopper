import React from 'react'

function OpenInBrowser(props) {
  const fill = props.fill || 'currentColor'
  const secondaryfill = props.secondaryfill || fill
  const strokewidth = props.strokewidth || 1
  const width = props.width || '100%'
  const height = props.height || '100%'
  const title = props.title || 'open in browser'

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
        <path d="M24.781,17.375a1.034,1.034,0,0,0-1.562,0l-8,10A1,1,0,0,0,16,29h6V43a2,2,0,0,0,4,0V29h6a1,1,0,0,0,.781-1.625Z" />
        <path
          d="M43,3H5A3.957,3.957,0,0,0,1,7V33a3.957,3.957,0,0,0,4,4h7a1,1,0,0,0,0-2H5a1.956,1.956,0,0,1-2-2V13H45V33a1.956,1.956,0,0,1-2,2H36a1,1,0,0,0,0,2h7a3.957,3.957,0,0,0,4-4V7A3.957,3.957,0,0,0,43,3Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

export default OpenInBrowser
