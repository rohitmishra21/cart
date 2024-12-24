import { useEffect, useState } from "react"
import { IoStar } from "react-icons/io5";
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
const App = () => {

  const [data, setdata] = useState([])
  const [cart, setCart] = useState([])
  const [price, setPrice] = useState(0)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0
      cart.map((data) => (total += data.price))
      setPrice(total.toFixed(2))
    }
  }, [cart]);


  const getData = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    setdata(response?.data)
  }

  function click(elem) {
    const newArr = [...cart, elem]
    setCart(newArr)
  }



  function deleteHendler(index) {
    const deleteArr = [...cart]
    const remove = deleteArr.splice(0, index)
    setCart(remove)
  }

  return (
    <>
      <div className="flex">
        <div className="w-9/12 flex h-screen">
          <div className="p-4 grid  grid-cols-4 gap-4">
            {data.map(function (elem, idx) {
              return (
                <div key={idx} className="  mb-5 shadow-sm shadow-black text-slate-900">
                  <div className="h-80 flex justify-center items-center ">
                    <img className="w-[60%]" src={elem.image} alt="" />
                  </div>
                  <div className="p-3 text-lg flex flex-col gap-2 capitalize">
                    <h1 className="font-semibold">{elem.category}</h1>
                    <h1 className="font-bold">${elem.price}</h1>
                    <h1 className="text-base">{elem.description.slice(1, 49) + (".....")}</h1>
                    <h1 className="flex items-center gap-1 "><IoStar className="" />{elem.rating.rate}</h1>
                    <button onClick={(() => (
                      click(elem, idx)
                    ))} className="bg-black text-white py-2 my-2 hover:scale-95 transition-all duration-300 hover:bg-black/90 uppercase font-medium">add to cart </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className=" px-7 min-h-screen w-1/4">
          <h1 className="text-5xl  text-white font-semibold">Cart</h1>
          {cart.map(function (item, index) {
            return (
              <>
                <div key={index} className="w-full h-32  flex shadow-sm shadow-black mt-2">
                  <div className=" bg-pink-500 h-full">
                    <img className="w-40 h-full object-cover" src={item.image} alt="" />
                  </div>
                  <div className="w-full capitalize p-3 flex justify-between items-center h-full">
                    <div>
                      <h1 className="font-semibold">{item.category}</h1>
                      <h1 className="text-base w-32 ">{item.description.slice(0, 19) + (".....")}</h1>
                      <h1 className="flex items-center gap-1 "><IoStar className="" />{item.rating.rate}</h1>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full">
                      <RxCross2
                        onClick={() => {
                          deleteHendler(index);
                        }}
                        size={30} />
                      <h1 className="font-bold">${item.price}</h1>
                    </div>
                  </div>

                </div>

              </>

            )
          })}
          < div className="w-full p-3  shadow-sm shadow-black mt-10" >

            <div>
              {cart.map((elem, i) => (
                <div key={i} className="flex capitalize justify-between">
                  <div>
                    <h1>{elem.category}</h1>
                  </div>
                  <div>
                    <h1>{" $ " + elem.price}</h1>
                  </div>
                </div>
              ))}

            </div>
            <div className="border my-4 border-black"></div>
            <div className="flex justify-between">
              <h1>Total</h1>
              <h1>{"$ " + price}</h1>
            </div>

          </div>

        </div>
      </div >
    </>
  )
}

export default App