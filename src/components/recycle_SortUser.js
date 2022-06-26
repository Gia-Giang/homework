import { useEffect, useState } from "react";
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined";
import CaretUpOutlined from "@ant-design/icons/CaretUpOutlined"
const SortListUser = ({ title, onclick }) => {
    const [toggleSort, setToggleSort] = useState(false)
    const handelChangeDown = () => {
        setToggleSort(false)
        onclick(title, "sort")
    }
    const handelChangeUp = () => {
        setToggleSort(true)
        onclick(title, "reverse")
    }
    return (
        <span className="IconSort">
            {toggleSort ? <CaretDownOutlined className="caretDown" onClick={handelChangeDown} /> :
                <CaretUpOutlined className="caretUp" onClick={handelChangeUp} />}
        </span>
    )
}
export default SortListUser