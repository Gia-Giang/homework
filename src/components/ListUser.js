import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import { ADDUSER, DELETEUSER, SAVEUSER, GETUSER, getUser, deleteUser, addUser, saveUser } from "./actions/action";
import SearchUser from "./searchUser";
import "./styles/listUser.scss";
const ListUser = () => {
    const RefBoxAdd = useRef();
    const RefBoxFixUser = useRef();
    const [toggleBgFix, setToggleBgFix] = useState(true)
    //
    const [showFixUser, setShowFixUser] = useState();
    const [idFix, setIdFix] = useState([])
    const selector = useSelector((state, action) => state);
    const dispatch = useDispatch()
    const [listData, setListData] = useState([]);
    const [listOption, setListOption] = useState([]);
    const [optionJob, setOptionJob] = useState("chưa chọn Job");
    const [listAddUser, setListAddUser] = useState({})
    const [abs, setAbs] = useState(0);
    useEffect(() => {
        axios.get("https://62b0f5d1196a9e98702d90ca.mockapi.io/jobs")
            .then(user => setListOption(user.data))
    }, [])
    useEffect(() => {
        dispatch(getUser());
    }, [])

    useEffect(() => {
        setListData(selector?.user)
    }, [selector])
    //Handel-function 
    const handelDeleteUser = (id) => {
        dispatch(deleteUser(id))
        setListData(selector?.user)
    }
    const GetDate = (date) => {
        const dates = new Date(date);
        const getDate = `${dates.getDay()} - ${dates.getMonth()} - ${dates.getFullYear()}`
        return getDate
    }
    const handelSlide = (i) => {
        const a = i * 10;
        const b = a + 10;
        const c = selector.user.filter((user, index) => {
            if (index >= a && index < b) {
                return user
            }
        })
        return c
    }
    const Ebutton = () => {
        const arrayBtn = [];
        for (let i = 0; i < selector.user.length / 10; i++) {
            arrayBtn.push(<button key={i} onClick={() => setAbs(i)} className={`${i == abs && "active_Slide_Page"} btnPage`}>{i}</button>)
        }
        return arrayBtn
    }

    const handelSaveUser = (id) => {
        dispatch(saveUser(id, listAddUser))
        setListData(selector?.data)
    }
    const handelFixUser = (id, user) => {
        setListAddUser({
            ...user
        })
        setListData(selector?.user)
        setShowFixUser(id);
        setIdFix(listData.filter(user => user.id == id));
        if (RefBoxFixUser.current.style.display == "block") {
            RefBoxFixUser.current.style.display = "none";
            setToggleBgFix(false)
        } else {
            RefBoxFixUser.current.style.display = "block";
            setToggleBgFix(true)
        }

    }
    const EData = (listData) => {
        return listData.map((user, index) => {
            const { avatar, city, country, createdAt, email, firstName, id, jobTitle, lastName, streetAddress, userName } = user;
            return (
                <tfoot key={index} className={(showFixUser == id && toggleBgFix) ? "activeFix" : ""}>
                    <tr >
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
                        <td style={{ position: "relative" }}>
                            {showFixUser == id &&
                                idFix.map(users => {
                                    return (
                                        <div key={id} className="BoxFixUser" ref={RefBoxFixUser} style={{ display: "block" }}>
                                            <h1>FIX USER</h1>
                                            {renderItemInput("FirstName", "firstName", "firstName", users.firstName)}
                                            {renderItemInput("LastName", "lastName", "lastName", users.lastName)}
                                            {renderItemInput("avatar", "avatar", "avatar", users.avatar)}
                                            {renderItemInput("Email", "email", "email", users.email)}
                                            {renderItemInput("streetAddress", "streetAddress", "streetAddress", users.streetAddress)}
                                            {renderItemInput("city", "city", "city", users.city)}
                                            {renderItemInput("country", "country", "country", users.country)}
                                            {renderItemInput("createdAt", "createdAt", "createdAt", users.createdAt)}
                                            {renderItemInput("userName", "userName", "userName", users.userName)}
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
                                                <span>{id}</span>
                                            </div>
                                            <button className="BtnAddUser" onClick={() => handelSaveUser(id)}>Save</button>
                                            <button className="BtnAddUser" onClick={handelCancel}>Cancel</button>
                                        </div>
                                    )
                                })
                            }
                            <span className="fixUser" onClick={() => handelFixUser(id, user)}>Fix</span>
                            <span className="deleteUser" onClick={() => handelDeleteUser(id)}>X</span>
                        </td>
                    </tr>
                </tfoot>
            )
        })
    }
    const handelJob = (e) => {
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

    const handelToggleAddUser = () => {
        if (RefBoxAdd.current.style.display == "block") {
            RefBoxAdd.current.style.display = "none"
        } else {
            RefBoxAdd.current.style.display = "block"
        }
    }

    const handleTextChange = (e, value) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }

    const renderItemInput = (label, placeholder, name, value) => {
        const onChange = (e) => {
            handleTextChange(e)
        }
        return (
            <div className="nameUser">
                <b>{label} :</b>
                <input type={"text"} placeholder={placeholder} name={name} onChange={(e) => onChange(e, value)} value={listAddUser[name] || value} />
            </div>
        )
    }
    const handelAddUser = () => {
        dispatch(addUser())
        setListData(listData || [])
    }

    const handelCancel = () => {
        RefBoxFixUser.current.style.display = "none";
        setToggleBgFix(false)
    }
    return (
        <>
            <div className="sum">
                <h1>LIST USER</h1>
                <div className="addUser">
                    <PlusCircleOutlined style={{ fontSize: "30px" }} onClick={handelToggleAddUser} />
                    <b>THÊM NHÂN VIÊN</b>
                    <div className="BoxAddUser" ref={RefBoxAdd}>
                        <h1>ADD USER</h1>
                        {renderItemInput("FirstName", "firstName", "firstName")}
                        {renderItemInput("LastName", "lastName", "lastName")}
                        {renderItemInput("avatar", "avatar", "avatar")}
                        {renderItemInput("Email", "email", "email")}
                        {renderItemInput("streetAddress", "streetAddress", "streetAddress")}
                        {renderItemInput("city", "city", "city")}
                        {renderItemInput("country", "country", "country")}
                        {renderItemInput("createdAt", "createdAt", "createdAt")}
                        {renderItemInput("userName", "userName", "userName")}
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
                <div className="search">
                    <Link to={"/SearchUser"}>SEARCH</Link>
                </div>
            </div>
            <table className="listUsers" cellSpacing={0} cellPadding={5}>
                <thead>
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
                </thead>
                {EData(handelSlide(abs))}
            </table>
            <div>
                {Ebutton()}
            </div>
        </>
    )
}
export default ListUser