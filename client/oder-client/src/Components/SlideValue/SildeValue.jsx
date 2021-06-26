import React from "react";
import Slider from "@material-ui/core/Slider";
import PropTypes from 'prop-types';
import { shortenMoney } from "../../utils/convertPrice";

SlideValue.propTypes = {
    listValue: PropTypes.array,
    widthSlide: PropTypes.number
};
SlideValue.defaultProps = {
    listValue: [
        {
            value: 0,
            label: "150k",
            price: 150000
        },
        {
            value: 50,
            label: "200k",
            price: 200000
        },
        {
            value: 100,
            label: "250k",
            price: 250000
        }
    ],
    // widthSlide: 1000
}

export default function SlideValue(props) {
    const { listValue, widthSlide } = props
    function valueLabelFormat(value) {
        const index = listValue.findIndex((mark) => mark.value === value)
        return shortenMoney(listValue[index].price)
        
    }
    return (
        <>
            {/* <Typography id="discrete-slider-restrict" gutterBottom>
                {nameSlide}
            </Typography> */}
            <Slider
                style={{
                    width: widthSlide,
                    color:'black'
                }}
                defaultValue={50}
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={listValue}
            />
        </>
    );
}
