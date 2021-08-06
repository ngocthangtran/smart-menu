import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core'
import { useState } from 'react';
import { useEffect } from 'react';

function MenuOption(props) {

    const { oderOption, onChangeFactor, selectItem } = props;

    const [value, setValue] = useState(selectItem.unit)

    useEffect(() => {
        setValue(selectItem.unit)
    }, [selectItem])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (item) => {
        setAnchorEl(null);
        if (item.unit) {
            setValue(item.unit)
        }
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {value}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    oderOption.map((item, index) => {
                        return (<MenuItem onClick={() => { handleClose(item); onChangeFactor(item) }} key={index}>{item.unit}</MenuItem>)
                    })
                }
                {/* <MenuItem onClick={() => { handleClose() }} >sadsad</MenuItem> */}
            </Menu>
        </div>
    );
}

export default MenuOption;