import React from 'react'

//* This is the component that should render when an admin types /users
//* It will allow them to view all individual users
export default function AllUsers(props) {
  const isLoggedIn = useSelector(state => state.auth.id)
  const dispatch = useDispatch(function)
  const [users, setUsers] = useState()
  const usersInView = us

  return (
    <div className="product-page">
      <div className="product-container">
        <SimpleBar className="product-scroll">
          <div className="products-container">
            {productsInView !== undefined && productsInView.length > 0 ? (
              productsInView.map(product => <ProductCard key={product.id} product={product} />)
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}
