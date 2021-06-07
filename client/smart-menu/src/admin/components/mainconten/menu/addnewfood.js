import React, { Component } from 'react';
import { storage } from "../../../Api-admin/firebase";

import { shortenMoney } from '../../../../utils/shortenMoney';
import { addDataProduct, getAddMenu } from '../../../Api-admin';


import './addnewfood.css'
class addnewfood extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            category: [],
            categorySelect: '',
            link_img: '',
            side: [150000, 200000, 250000],
            imgAsFile: {},
            price: ''
        }
        this.addName = this.addName.bind(this);
        this.uploadToFireBase = this.uploadToFireBase.bind(this);
        this.deletePrice = this.deletePrice.bind(this);
        this.addPrice = this.addPrice.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.addNewCategoty = this.addNewCategoty.bind(this)
        this.selectOnchange = this.selectOnchange.bind(this)
        this.postData = this.postData.bind(this)
    }

    addName(e) {
        this.setState({
            name: e.target.value
        })
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
        side.splice(item, 1)
        this.setState({
            side: side
        })
    }

    addPrice(e) {
        this.setState({
            price: parseInt(e.target.value)
        })
    }
    onKeyUp(e) {
        if (e.charCode === 13) {
            if (e.target.id === "addNewPrice") {
                const { side } = this.state;
                side.push(this.state.price)
                console.log(side)
                this.setState({
                    side: side,
                    price: ''
                })
            }
            if (e.target.id === "addNewCategory") {
                const { category } = this.state;
                category.push(e.target.value)
                this.setState({
                    categorySelect: e.target.value,
                    categorySelect: ''
                })
            }
        }
    }
    selectOnchange(e) {
        var dropdownInput = document.querySelector('.dropdown-input.all');
        if (e.target.value === 'Thêm') {
            dropdownInput.classList.toggle('active')
            dropdownInput.style.height = dropdownInput.classList.contains('active') ? '95px' : '0'
            dropdownInput.style.marginBottom = dropdownInput.classList.contains('active') ? '60px' : '0'
        }
        else {
            dropdownInput.classList.remove('active')
            dropdownInput.style.height = dropdownInput.classList.contains('active') ? '95px' : '0'
            dropdownInput.style.marginBottom = dropdownInput.classList.contains('active') ? '60px' : '0'
            this.setState({
                categorySelect: e.target.value
            })
        }

    }
    addNewCategoty(e) {
        this.setState({
            categorySelect: e.target.value
        })
    }
    componentDidMount() {
        var dropdownInput = document.querySelector('.dropdown-input.all');
        dropdownInput.classList.toggle('active')
        dropdownInput.style.height = dropdownInput.classList.contains('active') ? '95px' : '0'
        dropdownInput.style.marginBottom = dropdownInput.classList.contains('active') ? '60px' : '0'
        getAddMenu().then(res => {
            this.setState({
                category: Object.keys(res.data)
            })
        })
    }

    postData() {
        //uploadImg
        const { imgAsFile } = this.state
        const upLoadTask = storage.ref(`/images/${imgAsFile.name}`).put(imgAsFile)
        upLoadTask.on('state_changed',
            (snapShot) => {
                // console.log(snapShot)
            }, (err) => {
                // console.error(err)
            }, () => {
                storage.ref('images').child(imgAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        //tra link img
                        const dataConvent = {
                            "category": this.state.categorySelect,
                            "name": this.state.name,
                            "link_img": fireBaseUrl,
                            "side": this.state.side
                        }
                        addDataProduct(dataConvent).then(res => {
                            alert("Thêm sản phẩm thành công")
                            this.setState({
                                name: '',
                                category: [],
                                categorySelect: '',
                                link_img: '',
                                side: [150000, 200000, 250000],
                                imgAsFile: {},
                                price: ''
                            })
                        }).catch(err => console.log(err))
                    })
            })
    }

    render() {
        const { category, side } = this.state
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
                                    value={this.state.name} onChange={this.addName} />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Danh mục</label>
                                <select className="form-input" onChange={this.selectOnchange}>
                                    <option >Thêm</option>
                                    {
                                        this.state.category.map((item, index) => <option key={index}>{item}</option>)
                                    }
                                </select>
                            </div>
                            <div className="dropdown-input all">
                                <div className="form-group">
                                    <label className="label-title">Thêm danh mục *</label>
                                    <input type="text" id="addNewCategory" className="form-input" placeholder="Thêm danh mục"
                                        value={this.state.categorySelect} onChange={this.addNewCategoty} onKeyPress={this.onKeyUp} />
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
                                        id="addNewPrice"
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
                        <button type="submit" className="btn-addnewfood" onClick={this.postData}>Create</button>
                    </div>

                </div>
            </>
        );
    }
}

export default addnewfood;