import React from 'react'

//* This component will render when directed to /cart
//* It will show a logged out users cart
export default function LoggedOutCart() {
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(true)
  const [removed, setRemoved] = useState(undefined)
  const [selected, setSelected] = useState(undefined)

  // setter
  // localStorage.setItem('myData', data)

  // getter
  // localStorage.getItem('myData')

  // remove
  // localStorage.removeItem('myData')

  //* Return the jsx
  // return (
  //   <OrderDisplay
  //     products={getProducts(order.orderdetails, setSelected, selected, removed, setRemoved)}
  //     selected={selected}
  //     setUpdate={setUpdate}
  //     setSelected={setSelected}
  //     userId={userId}
  //     quantity={quantity}
  //     handleUpdateQuantity={handleUpdateQuantity}
  //     setRemoved={setRemoved}
  //     total={total}
  //   />
  // )
  return <></>
}
