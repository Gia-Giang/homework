import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADDUSER, DELETEUSER, SAVEUSER, GETUSER, getUser } from "./actions/action";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined"
import "./styles/listUser.scss";
const ListUser = () => {
    const selector = useSelector((state, action) => state);
    const dispatch = useDispatch()
    const [listData, setListData] = useState([]);
    const [listOption, setListOption] = useState([]);
    const [optionJob, setOptionJob] = useState("chưa chọn Job");
    const RefBoxAdd = useRef()
    const [as, setAs] = useState({
        a: 0,
        b: 10
    })


    const [listAddUser, setListAddUser] = useState({})
    const [abs, setAbs] = useState(0)


    useEffect(() => {
        dispatch(getUser());
    }, [])

    useEffect(() => {
        // console.log("selector", selector)
        setListData(selector?.user)
    }, [selector])

    console.log("listData", listData)
    useEffect(() => {
        // async function Test() {
        //     const user = await selector
        //     console.log("user", user)
        //     if (user) {
        //         setListData(user.data)
        //     }
        // }
        // Test()
        console.log('selector', selector)
    }, [selector])
    async function sss() {
        const a = await selector;
        console.log(a)
    } sss()
    //Handel-function 
    const handelDeleteUser = async (id) => {
        dispatch(DELETEUSER(id))
        setAbs(abs + 1)
        const ass = await selector;
        console.log(ass)
    }


    const GetDate = (date) => {
        const dates = new Date(date);
        const getDate = `${dates.getDay()} - ${dates.getMonth()} - ${dates.getFullYear()}`
        return getDate
    }
    const handelSlide = (i) => {
        setAs(() => ({
            a: i * 10,
            b: i * 10 + 10
        }))
    }
    const Ebutton = () => {
        const arrayBtn = [];
        for (let i = 0; i < listData.length / 10; i++) {
            arrayBtn.push(<button key={i} onClick={() => handelSlide(i)}>{i}</button>)
        }
        return arrayBtn
    }
    const EData = (listData) => {
        return listData.map((user) => {
            const { avatar, city, country, createdAt, email, firstName, id, jobTitle, lastName, streetAddress, userName } = user;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>
                        <img src={avatar} />
                    </td>
                    <td>{firstName + lastName}</td>
                    <td>{userName}</td>
                    <td>{email}</td>
                    <td>{`${streetAddress} , ${city} , ${country}`}</td>
                    <td>{GetDate(createdAt)}</td>
                    <td>{jobTitle}</td>
                    <td>
                        <span className="fixUser">Fix</span>
                        <span className="deleteUser" onClick={() => handelDeleteUser(id)}>X</span>
                    </td>
                </tr>
            )
        })
    }
    const Getdatas = (first, last) => {
        const CheckList = listData.filter((user) => {
            if (user.id >= first && user.id < last) {
                return user
            }
        })
        return CheckList
    }
    const handelFirstName = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelLastName = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelAvatar = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelEmail = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelJob = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelUserName = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelCreatedAt = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelCountry = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelcity = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelstreetAddress = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelUserId = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelAddUser = () => {
        dispatch(ADDUSER(listAddUser))
        console.log(listAddUser)
    }
    const handelToggleAddUser = () => {
        if (RefBoxAdd.current.style.display == "none") {
            RefBoxAdd.current.style.display = "block"
        } else {
            RefBoxAdd.current.style.display = "none"
        }
    }

    const handleTextChange = useCallback((label) => {
        switch (label) {
            case "FirstName":
                setListAddUser({
                    ...listAddUser,
                    [e.target.name]: e.target.value
                })
        }
    }, [])

    const renderItemInput = useCallback((label, placeholder, handle) => {
        const onChange = () => {
            handleTextChange(label)
        }
        return (
            <div className="nameUser">
                <b>{label} :</b>
                <input type={"text"} placeholder={placeholder} name="firstName" onChange={onChange} />
            </div>
        )
    })

    return (
        <div>
            <div>
                <h1>LIST USER</h1>
                <div className="addUser">
                    <PlusCircleOutlined style={{ fontSize: "30px" }} onClick={handelToggleAddUser} />
                    <b>THÊM NHÂN VIÊN</b>
                    <div className="BoxAddUser" ref={RefBoxAdd}>
                        <h1>ADD USER</h1>
                        {/* <div className="nameUser">
                            <b>FirstName :</b>
                            <input type={"text"} placeholder="FirstName" name="firstName" onChange={handelFirstName} />
                        </div> */}
                        {renderItemInput("FirstName", "FirstName", handelFirstName)}
                        <div className="nameUser">
                            <b>LastName :</b>
                            <input type={"text"} placeholder="LastName" name="LastName" onChange={handelLastName} />
                        </div>
                        <div className="nameUser">
                            <b>Avatar :</b>
                            <input type={"text"} placeholder="avatar" name="avatar" onChange={handelAvatar} />
                        </div>
                        <div className="nameUser">
                            <b>Email :</b>
                            <input type={"email"} placeholder="Email" name="email" onChange={handelEmail} />
                        </div>
                        <div className="nameUser">
                            <b>Nơi ở :</b>
                            <input type={"text"} placeholder="streetAddress " name="streetAddress" onChange={handelstreetAddress} />
                        </div>
                        <div className="nameUser">
                            <b>Nơi ở :</b>
                            <input type={"text"} placeholder="city " name="city" onChange={handelcity} />
                        </div>
                        <div className="nameUser">
                            <b>Nơi ở :</b>
                            <input type={"text"} placeholder="country" name="country" onChange={handelCountry} />
                        </div>
                        <div className="nameUser">
                            <b>Ngày làm việc :</b>
                            <input type={"date"} placeholder="createdAt" name="createdAt" onChange={handelCreatedAt} />
                        </div>
                        <div className="nameUser">
                            <b>Ngày làm việc :</b>
                            <input type={"date"} placeholder="userName" name="userName" onChange={handelUserName} />
                        </div>
                        <div className="nameUser">
                            <b>Vị trí :</b>
                            <select name="jobTitle" onChange={handelJob}>
                                <option>{optionJob}</option>
                                {listOption.map((user) => {
                                    return <option key={user.id}>{user.type}</option>
                                })}
                            </select>
                        </div>
                        <div className="nameUser">
                            <b>id :</b>
                            <input type={"text"} placeholder="id" name="id" onChange={handelUserId} />
                        </div>
                        <button className="BtnAddUser" onClick={handelAddUser}>ADD</button>
                    </div>
                </div>
            </div>
            <table className="listUsers" cellSpacing={0} cellPadding={5}>
                <tr>
                    <th>STT</th>
                    <th></th>
                    <th>Tên</th>
                    <th>Tên khác</th>
                    <th>Email</th>
                    <th>Nơi ở</th>
                    <th>Ngày làm việc</th>
                    <th>Vị trí</th>
                    <th></th>
                </tr>
                {EData(listData)}
            </table>
            <div>
                {Ebutton()}
            </div>
        </div>
    )
}
export default ListUser