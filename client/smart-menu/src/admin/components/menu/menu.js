import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { shortenMoney } from '../../../utils/shortenMoney';
import { deleteProduct } from '../../Api-admin';
import { database, deleteImg } from '../../../utils/firebase';

import './menu.css'

const CardFood = (props) => {
    const { productDetail } = props
    var minPrice = productDetail.side[0]
    productDetail.side.forEach(element => {
        if (element < minPrice) {
            minPrice = element
        }
    });

    const deleteData = () => {
        const { link_img } = productDetail;
        deleteImg(link_img).then((res) => {
            console.log(res)
            console.log("Xoa anh thanh cong")
        })
        deleteProduct(productDetail.category, productDetail.key).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }
    return (
        <div className="food-card">
            <img src={productDetail.link_img} alt=""></img>
            <div className="card-body">
                <h5>{productDetail.name}</h5>
                <div className="food-info">
                    <div className="food-conten">
                        <div className="text-title">
                            Phân loại:
                                        </div>
                        <div className="text-conten">
                            {productDetail.category}
                        </div>
                    </div>
                    <div className="food-conten">
                        <div className="text-title">
                            Giá:
                                         </div>
                        <div className="text-conten">
                            Từ {shortenMoney(minPrice)}
                        </div>
                    </div>
                </div>
                <div className='group-icon'>
                    <Link to={`/menu/product?category=${productDetail.category}&key=${productDetail.key}`} className="btn-detail">Chi tiết</Link>
                    <i className='bx bxs-trash-alt' onClick={deleteData}></i>
                </div>
            </div>
        </div>
    )
}

class menu extends Component {
    constructor() {
        super();
        this.state = {
            category: {},
            products: []
        }
    }
    componentDidMount() {
        database.ref('product').on('value', (listProduct) => {
            var data = listProduct.val()
            if (data) {
                this.setState({
                    category: Object.keys(data).map(k => k),
                    products: Object.keys(data).map(k => data[k])
                })
            }
        })

        // getAddMenu().then(res => {
        // })
    }
    render() {
        const { products, category } = this.state;
        return (
            <>
                <div className="category-food">
                    {
                        products.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="category-head">
                                        {category[index]}
                                    </div>
                                    <div className="category-item">
                                        {
                                            Object.values(item).map((product, index) => {
                                                return (
                                                    <CardFood productDetail={product} key={index} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </>
        );
    }
}



export default menu;