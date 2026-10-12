import React from 'react'
import { Switch } from 'antd';


const  CustomSwitch = ({disable}) => {

    function onChange(checked) {
        console.log(`switch to ${checked}`);
      }

    return <Switch disabled={null} defaultChecked onChange={onChange} />
}

export default CustomSwitch
