import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ItemCount from "../ItemCount/ItemCount";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemDetail.css';

export default function ItemDetail(props) {
    const [counter, setCounter] = useState(0);
    const stock = (props.data[0]?.stock);
    const [itemCarrito, setItemCarrito] = useState();
    const [show, setShow] = useState(true)
    const [showCart, setShowCart] = useState(false)

    const addOne = () => {counter < stock && setCounter(counter + 1)}

    const removeOne = () => {counter !== 0 && setCounter(counter -1)}

    const addCarrito = () => {
        if (counter >= 1) {
            setShow(false)
            setShowCart(true)

        }else {
            alert("debes agregar al menos 1 item");
        }
    }

    
    return (
        <>
        <div className="detail-wrapper">
            <div className="detail-img">
                <img src={props.data[0]?.img}></img>
                <img src={props.data[0]?.img}></img>
                <img src={props.data[0]?.img}></img>
            </div>
            <div className="detail-description">
                <h2>{props.data[0]?.title}</h2>
                <p>{props.data[0]?.description}</p>
                <p>{"$" + props.data[0]?.price}</p>
                {show?<div className="contador">{<ItemCount addOne={addOne} removeOne={removeOne} counter={counter} stock={stock}/>}</div>:null}                
                <br></br>

                {show?<div className="d-grid gap-2">
                    <Button onClick={addCarrito} variant="outline-danger">Agregar al carrito</Button>
                </div>:null}
                {showCart?<div className="d-grid gap-2">
                    <Link to="/cart"><Button variant="outline-danger">Finalizar Compra</Button></Link>
                </div>:null}
                

            </div>

        </div>
        </>

    )

}