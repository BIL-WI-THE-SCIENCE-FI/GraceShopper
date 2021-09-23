import React from 'react'

//* This is the product card that will appear on the all products
//* page.
export default function PageSelector(props) {
  //* Obtain the information required thru props
  const { setPage, query, currentCount } = props
  const { page, limit } = query
  const maxpage = Math.ceil((currentCount === 0 ? 1 : currentCount) / limit)
  const nextPage = page + 1 <= maxpage ? page + 1 : maxpage
  const prevPage = page - 1 >= 1 ? page - 1 : 1

  //* The users manually typed in limit and reloaded
  if (page > maxpage) {
    setPage(1)
  }

  //* Return the component JSX
  return (
    <div className="page-selector">
      <button
        name="back"
        className="header-button"
        type="button"
        onClick={() => setPage(prevPage)}
        disabled={page === 1}
      >
        {'◀'}
      </button>
      <span>{`Page: ${page}/${isNaN(maxpage) ? 1 : maxpage}`}</span>
      <button
        name="forward"
        className="header-button"
        type="button"
        onClick={() => setPage(nextPage)}
        disabled={page === maxpage}
      >
        {'▶'}
      </button>
    </div>
  )
}
