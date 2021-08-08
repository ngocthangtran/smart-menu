import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

function InputCode({ setCookieTable }) {
    const [value, setValue] = useState('');
    const history = useHistory();
    return (
        <div>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
            <button
                onClick={() => {
                    const table = JSON.parse(Cookies.get('table'))
                    const newCookie = {
                        ...table,
                        code: parseInt(value)
                    }
                    Cookies.set("table", JSON.stringify(newCookie))
                    setCookieTable(Cookies.get('table'))
                }}
            >set</button>
        </div>
    );
}

export default InputCode;