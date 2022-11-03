import { useState ,useEffect} from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useRouter } from 'next/router'

// interface authType {
//     id?: number,
//     email?: string,
//     role?: string
// }
export default function AddOrder () {
    const router = useRouter()
    const [position,setPosition] = useState(1)
    const [name, setName] = useState('')
    const [link,setLink] = useState('')
    const [option,setOption] = useState('')
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(1)
    let [total,setTotal] = useState(0)
    let [isLinkValid,setIsLinkValid] = useState(false)
    const {authData,loading}  = useTypedSelector(state => state.authData)
    // console.log('authData',authData)
    
    let validateLink = (e) => {
        setLink(e)
        console.log('link',link)
        if(link.length > 1 && link.length !== 0 ){
            setIsLinkValid(true)
        }else{
            setIsLinkValid(false)
        }
    }
    const {addOrder} = useActions()
    let userId = authData.id
    // console.log("authData.id",authData.id)
    // console.log('userId in AddOrder',userId)
    // let currentUserId = authData.id
    // let currentOrderLists =  orderList.filter(o => o.userId == authData.id)
    // let currentOrderList = currentOrderLists[1]
    // let orderListId = currentOrderList.id
    // console.log("currentOrderList",currentOrderList)
    // console.log("currentOrderList.id",currentOrderList.id)
    const add = () => {
        addOrder(position,name,option,link,price,count,total,userId)
        // router.reload()
        setName('')
        setLink('')
        setOption('')
        setPrice(0)
        setCount(1)
    }
    
    return (
        <>
        <div className="mt-2 ms-2">
        <div >Добавить заказ </div>
        <div className="d-flex flex-wrap">

                <input className="border-2 border-radius-5px " aria-describedby="name" placeholder="Название" value={name} onChange={e => setName(e.target.value)}></input>
                <input className="border-2 border-radius-5px" placeholder="Опция" value={option} onChange={e => setOption(e.target.value)}></input>
                <input className="border-2 border-radius-5px" placeholder="Ссылка" value={link} onChange={ e => validateLink(e.target.value)}></input>
                <input className="border-2 border-radius-5px" placeholder="Цена в &#8364;" type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))}></input>
                <input className="border-2 border-radius-5px  " placeholder="Количество" type="number" value={count} onChange={e => setCount(parseFloat(e.target.value))}></input>
                <label placeholder="Total"  className="">Итого &#8364;: { !price ? 0 : total=count*price} </label>
                {/* <label>ИД {id}</label> */}
            </div>
           
        <div className="d-flex bd-highlight">
            {loading 
            ? <button className="btn btn-info col-3 mt-2 ms-auto me-auto" onClick={add} disabled={true}>Loading</button> 
            :
             <button className="btn btn-info col-3 mt-2 ms-auto me-auto" onClick={add} disabled={!isLinkValid}>Add</button>
            }
        {/* <button className="btn btn-info col-3 mt-2 ms-auto me-auto" onClick={add} disabled={!isLinkValid}>Add</button> */}
        </div>
            
        </div>
        </>
    )
}