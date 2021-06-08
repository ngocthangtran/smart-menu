import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { shortenMoney } from '../../../../utils/shortenMoney';
import { getAddMenu } from '../../../Api-admin';

import './menu.css'

const CardFood = (props) => {
    const { productDetail } = props
    var minPrice = productDetail.side[0]
    productDetail.side.map(item => {
        if (item < minPrice) {
            minPrice = item
        }
    })
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
                    <i className='bx bxs-trash-alt'></i>
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
        getAddMenu().then(res => {
            this.setState({
                category: Object.keys(res.data).map(k => k),
                products: Object.keys(res.data).map(k => res.data[k])
            })
        })
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