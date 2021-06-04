import React, { Component } from 'react';


import './addnewfood.css'
class addnewfood extends Component {
    render() {
        return (
            <>
                <form className="signup-form" action="/register" method="post">
                    <div className="form-header">
                        <h1>Món ăn</h1>
                    </div>
                    <div className="form-body">
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label for="firstname" className="label-title">Tên món *</label>
                                <input type="text" id="firstname" className="form-input" placeholder="Nhập tên món ở đây"
                                    required="required" />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Danh mục</label>
                                <select className="form-input" id="level">
                                    <option value="B">Hấp</option>
                                    <option value="I">Nướng</option>
                                    <option value="A">Xào</option>
                                    <option value="Z">Chiên</option>
                                </select>
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label for="choose-file" className="label-title">Hình ảnh minh họa</label>
                                <input type="file" id="choose-file" size="80"></input>
                            </div>
                            <div className="form-group right">
                                <img src="https://wna.cdnxbvn.com/wp-content/uploads/2019/06/cach-lam-de-hap-tia-to-ngon.jpg"
                                    alt=""></img>
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Giá</label>
                                <div className='items-price'>
                                    <div className='item-price'>
                                        <div>150k</div>
                                        <i class='bx bx-x'></i>
                                    </div>
                                    <div className='item-price'>
                                        <div>150k</div>
                                        <i class='bx bx-x'></i>
                                    </div>
                                    <div className='item-price'>
                                        <div>Thêm giá</div>
                                    </div>
                                </div>
                                    <div className="dropdown-input">
                                        <label for="firstname" className="label-title">Giá khác *</label>
                                        <input type="text" id="firstname" className="form-input" placeholder="Ví dụ:150000 - Hoàn thành nhấn enter"
                                            required="required" />
                                    </div>
                            </div>

                        </div>
                    </div>
                    <div class="form-footer">
                        <span>*Testing</span>
                        <button type="submit" class="btn-addnewfood">Create</button>
                    </div>

                </form>
            </>
        );
    }
}

export default addnewfood;