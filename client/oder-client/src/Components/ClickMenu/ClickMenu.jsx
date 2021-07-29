import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const options = ['Xóa', 'Sửa', 'Cài đặt Oder'];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
    const { getOption } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        getOption(e)
        setAnchorEl(null)
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch"
                    }
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => { handleClose(option) }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
