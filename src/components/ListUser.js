import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import { ADDUSER, DELETEUSER, SAVEUSER, GETUSER, getUser, deleteUser, addUser, saveUser } from "./actions/action";
import SortListUser from "./recycle_SortUser";
import SearchUser from "./searchUser";
import "./styles/listUser.scss";
const ListUser = () => {
    const RefBoxAdd = useRef();
    const RefBoxFixUser = createRef();
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
    const [numberAmount, setNumberAmount] = useState(0)
    const [numberAmounts, setNumberAmounts] = useState(10)
    const [handelSort, setHandelSort] = useState({
        handel: "sort",
        title: "id"
    })
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
        console.log(numberAmounts)
        const a = i * numberAmounts;
        const b = a + numberAmounts;
        const c = selector.user.filter((user, index) => {
            if (index >= a && index < b) {
                return user
            }
        })

        return c
    }
    const Ebutton = () => {
        const arrayBtn = [];
        for (let i = 0; i < selector.user.length / numberAmounts; i++) {
            arrayBtn.push(<button key={i} onClick={() => {
                setToggleBgFix(true)
                setAbs(i)
            }} className={`${i == abs && "active_Slide_Page"} btnPage`}>{i + 1}</button>)
        }
        return arrayBtn
    }

    const handelSaveUser = (id) => {
        dispatch(saveUser(id, listAddUser))
        setListData(selector?.data)
        RefBoxFixUser.current.style.display = "none";
        setToggleBgFix(false)
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
        console.log(listData)
    }
    const EData = (listData) => {
        const a = (value) => {
            return value.sort((a, b) => {
                const m = handelSort.title;
                let aa;
                let bb;
                let cc;
                let dd;
                let ee;
                let ff;

                if (m == "streetAddress") {
                    aa = a.streetAddress.split(" ")
                    bb = b.streetAddress.split(" ");
                    return handelSort.handel === "sort" ? aa[0] - bb[0] : bb[0] - aa[0]
                } else if (m == "createdAt") {
                    cc = GetDate(a.createdAt).split("-");
                    dd = GetDate(b.createdAt).split("-")
                    return handelSort.handel === "sort" ? cc[0] - dd[0] : dd[0] - cc[0]
                } else if (m == "jobTitle") {
                    ee = a.jobTitle.split(" ");
                    ff = b.jobTitle.split(" ");
                    return handelSort.handel === "sort" ? ee[1] - ff[1] : ff[1] - ee[1]
                } else if (m == "id") {
                    return handelSort.handel === "sort" ? a.id - b.id : b.id - a.id
                }
                return handelSort.handel === "sort" ?
                    a[handelSort.title][0].localeCompare(b[handelSort.title][0]) :
                    b[handelSort.title][0].localeCompare(a[handelSort.title][0])
            });
        }
        return a(listData).map((user, index) => {
            const { avatar, city, country, createdAt, email, firstName, id, jobTitle, lastName, streetAddress, userName } = user;
            return (
                <tr key={index} className={(showFixUser == id && toggleBgFix) ? "activeFix" : ""}>
                    <td>{id}</td>
                    <td>
                        <img src={avatar} title="ERROR" />
                    </td>
                    <td>{firstName + lastName}</td>
                    <td>{userName}</td>
                    <td>{email}</td>
                    <td>{`${streetAddress} , ${city} , ${country}`}</td>
                    <td>{GetDate(createdAt)}</td>
                    <td>{jobTitle}</td>
                    <td style={{ position: "relative" }}>
                        {showFixUser == id &&
                            <div key={id} className="BoxFixUser" ref={RefBoxFixUser} style={{ display: "none" }}>
                                <h1>FIX USER</h1>
                                {renderItemInput("FirstName", "firstName", "firstName", user.firstName)}
                                {renderItemInput("LastName", "lastName", "lastName", user.lastName)}
                                {renderItemInput("avatar", "avatar", "avatar", user.avatar)}
                                {renderItemInput("Email", "email", "email", user.email)}
                                {renderItemInput("streetAddress", "streetAddress", "streetAddress", user.streetAddress)}
                                {renderItemInput("city", "city", "city", user.city)}
                                {renderItemInput("country", "country", "country", user.country)}
                                {renderItemInput("createdAt", "createdAt", "createdAt", user.createdAt)}
                                {renderItemInput("userName", "userName", "userName", user.userName)}
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
                                <div className="groupBtn">
                                    <button className="BtnAddUser" onClick={() => handelSaveUser(id)}>Save</button>
                                    <button className="BtnAddUser" onClick={handelCancel}>Cancel</button>
                                </div>
                            </div>

                        }

                        <span className="fixUser" onClick={() => handelFixUser(id, user)}>Fix</span>
                        <span className="deleteUser" onClick={() => handelDeleteUser(id)}>X</span>
                    </td>
                </tr>
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

    const renderItemInput = (label, placeholder, name, value, type) => {
        const onChange = (e) => {
            handleTextChange(e)
        }
        return (
            <div className="nameUser">
                <b>{label} :</b>
                <input type={type} placeholder={placeholder} name={name} onChange={(e) => onChange(e, value)} value={listAddUser[name] || value} />
            </div>
        )
    }
    ///ssdf
    const handelAddUser = () => {
        dispatch(addUser(listAddUser))
        setListData(listData || [])
        setListAddUser("")
        RefBoxAdd.current.style.display = "none"
    }

    const handelCancel = () => {
        RefBoxFixUser.current.style.display = "none";
        setToggleBgFix(false)
    }
    const handelBoxOverplay = (e) => {
        e.stopPropagation();
        setToggleBgFix(false);
        RefBoxFixUser.current.style.display = "none";
        RefBoxAdd.current.style.display = "none"
    }
    const handelSortAscending = (title, handel) => {
        setHandelSort({
            handel: handel,
            title: title
        })
    }
    const handelChangeAmountShow = (e) => {
        setNumberAmount(e.target.value)
        console.log(e)
        if (e.key == "Enter") {
            setNumberAmounts(Number(numberAmount))
        }
    }
    const handelAmountShow = () => {
        setNumberAmounts(Number(numberAmount))
    }
    return (
        <>
            <div className="boxOverplay" onClick={handelBoxOverplay}></div>
            <h1 className="headerSum">LIST USER</h1>
            <div className="sum">
                <div className="addUser">
                    <PlusCircleOutlined style={{ fontSize: "30px" }} onClick={handelToggleAddUser} />
                    <div className="BoxAddUser" ref={RefBoxAdd}>
                        <h1>ADD USER</h1>
                        {renderItemInput("FirstName", "firstName", "firstName", "", "text")}
                        {renderItemInput("LastName", "lastName", "lastName", "", "text")}
                        {renderItemInput("avatar", "avatar", "avatar", "", "text")}
                        {renderItemInput("Email", "email", "email", "", "email")}
                        {renderItemInput("streetAddress", "streetAddress", "streetAddress", "", "text")}
                        {renderItemInput("city", "city", "city", "", "text")}
                        {renderItemInput("country", "country", "country", "", "text")}
                        {renderItemInput("createdAt", "createdAt", "createdAt", "", "date")}
                        {renderItemInput("userName", "userName", "userName", "", "text")}
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
                <div className="amountShow">
                    <input type={"number"} placeholder="Số lượng" onChange={handelChangeAmountShow} onKeyPress={handelChangeAmountShow} />
                    <button onClick={handelAmountShow}>Send</button>
                </div>
            </div>
            <table className="listUsers" cellSpacing={0} cellPadding={5}>
                <thead>
                    <tr>
                        <th><span>STT</span> <SortListUser title="id" onclick={handelSortAscending} /></th>
                        <th></th>
                        <th>Tên<SortListUser title="firstName" onclick={handelSortAscending} /></th>
                        <th>Tên khác<SortListUser title="userName" onclick={handelSortAscending} /></th>
                        <th>Email<SortListUser title="email" onclick={handelSortAscending} /></th>
                        <th>Nơi ở<SortListUser title="streetAddress" onclick={handelSortAscending} /></th>
                        <th>Ngày làm việc<SortListUser title="createdAt" onclick={handelSortAscending} /></th>
                        <th>Vị trí<SortListUser title="jobTitle" onclick={handelSortAscending} /></th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                    {EData(handelSlide(abs))}
                </tfoot>
            </table>
            <div style={{ zIndex: 100, position: "absolute" }}>
                {Ebutton()}
            </div>
        </>
    )
}
export default ListUser