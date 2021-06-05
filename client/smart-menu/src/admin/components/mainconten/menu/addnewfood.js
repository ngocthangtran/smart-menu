import React, { Component } from 'react';
import { shortenMoney } from '../../../../utils/shortenMoney';
import { getAddMenu } from '../../../Api-admin';


import './addnewfood.css'
class addnewfood extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            category: [],
            link_img: '',
            side: {
                1: 150000,
                2: 200000,
                3: 250000,
            },
            imgAsFile: {},
            price: ''
        }
        this.uploadToFireBase = this.uploadToFireBase.bind(this);
        this.deletePrice = this.deletePrice.bind(this);
        this.addPrice = this.addPrice.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onClickAddPrice() {
        var dropdownInput = document.querySelectorAll('.dropdown-input')[1];
        dropdownInput.classList.toggle('active')
        dropdownInput.style.height = dropdownInput.classList.contains('active') ? '95px' : '0'

    }

    uploadToFireBase(e) {
        const imgAsFile = e.target.files[0];
        if (imgAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imgAsFile)}`)
        }

        this.setState({
            link_img: URL.createObjectURL(imgAsFile),
            imgAsFile: imgAsFile
        })
    }
    deletePrice(item) {
        var { side } = this.state
        delete side[item]
        this.setState({
            side: side
        })
    }

    addPrice(e) {
        e.preventDefault();
        this.setState({
            price: e.target.value
        })
    }
    onKeyUp(e) {
        if (e.charCode === 13) {
            const { side } = this.state;
            side[Object.keys(side).length + 1] = this.state.price
            this.setState({
                side: side,
                price: ''
            })
        }
    }
    selectOnchange(e) {
        var dropdownInput = document.querySelector('.dropdown-input.all');
        if (e.target.value === 'Thêm') {
            dropdownInput.classList.toggle('active')
            dropdownInput.style.height = dropdownInput.classList.contains('active') ? '95px' : '0'
            dropdownInput.style.marginBottom = dropdownInput.classList.contains('active') ? '60px' : '0'
        }
        else{
            dropdownInput.classList.remove('active')
            dropdownInput.style.height = dropdownInput.classList.contains('active') ? '95px' : '0'
            dropdownInput.style.marginBottom = dropdownInput.classList.contains('active') ? '60px' : '0'
        }
    }
    componentDidMount() {
        getAddMenu().then(res => {
            this.setState({
                category: Object.keys(res.data)
            })
        })
    }
    render() {
        const { category, side } = this.state
        console.log(category)
        return (
            <>
                <div className="signup-form" action="/register" method="post">
                    <div className="form-header">
                        <h1>Món ăn</h1>
                    </div>
                    <div className="form-body">
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Tên món *</label>
                                <input type="text" id="firstname" className="form-input" placeholder="Nhập tên món ở đây"
                                    required="required" />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Danh mục</label>
                                <select className="form-input" onChange={this.selectOnchange}>
                                    <option>Hấp</option>
                                    <option>Nướng</option>
                                    <option>Xào</option>
                                    <option>Chiên</option>
                                    <option >Thêm</option>
                                </select>
                            </div>
                            <div className="dropdown-input all">
                                <div className="form-group">
                                    <label className="label-title">Thêm danh mục *</label>
                                    <input type="text" id="firstname" className="form-input" placeholder="Thêm danh mục"
                                        required="required" />
                                </div>
                            </div>
                        </div>
                        <div className="horizontal-group all">
                            <div className="form-group left">
                                <label className="label-title">Hình ảnh minh họa</label>
                                <input type="file" size="80" onChange={this.uploadToFireBase}></input>
                            </div>
                            <div className="form-group right">
                                <img src={
                                    this.state.link_img.length !== 0 ? this.state.link_img : process.env.PUBLIC_URL + '/asset/img/no-img.png'
                                }
                                    alt=""></img>
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Giá</label>
                                <div className='items-price'>
                                    {
                                        Object.keys(side).map((item, index) => {
                                            return (
                                                <div className='item-price' key={index}>
                                                    <div>{shortenMoney(side[item])}</div>
                                                    <i className='bx bx-x' onClick={() => { this.deletePrice(item) }}></i>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='item-price' onClick={this.onClickAddPrice}>
                                        <div>Thêm giá</div>
                                    </div>
                                </div>
                                <div className="dropdown-input">
                                    <label className="label-title">Giá khác *</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="Ví dụ:150000 - Hoàn thành nhấn enter"
                                        value={this.state.price}
                                        onChange={this.addPrice}
                                        onKeyPress={this.onKeyUp}

                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="form-footer">
                        <span>*Testing</span>
                        <button type="submit" className="btn-addnewfood">Create</button>
                    </div>

                </div>
            </>
        );
    }
}

export default addnewfood;