import React, { Component } from 'react';
import { getAddMenu } from '../../../Api-admin';

import './menu.css'

const CardFood = (props) => {
    const { productDetail } = props
    const minPrice = productDetail.side.M
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
                            Từ {minPrice}
                        </div>
                    </div>
                </div>
                <a href="/" className="btn-detail">Chi tiết</a>
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
                                <>
                                    <div className="category-head" key={index}>
                                        {category[index]}
                                    </div>
                                    <div className="category-item">
                                        {
                                            Object.values(item).map((product) => {
                                                return (
                                                    <CardFood productDetail={product} />
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </>
        );
    }
}



export default menu;