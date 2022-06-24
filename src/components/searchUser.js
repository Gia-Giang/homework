import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, saveUser, deleteUser } from "./actions/action";
import "./styles/listSearchUser.scss";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import ListUser from "./ListUser";
const SearchUser = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const RefBoxFixUser = useRef();
    const [idFix, setIdFix] = useState([])
    const [showFixUser, setShowFixUser] = useState();
    const [listSearch, setListSearch] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [abs, setAbs] = useState(0);
    const [toggleBgFix, setToggleBgFix] = useState(true)
    const [listAddUser, setListAddUser] = useState({});
    const [optionJob, setOptionJob] = useState("chưa chọn Job");
    const [listOption, setListOption] = useState([]);
    useEffect(() => {
        dispatch(getUser());
    }, [listSearch])
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
    const handelSaveUser = (id) => {
        dispatch(saveUser(id, listAddUser))
        setListSearch(listSearch.map(user => {
            if (user.id == id) {
                user = listAddUser
            }
            return user
        }))
    }
    const handelJob = (e) => {
        setListAddUser({
            ...listAddUser,
            [e.target.name]: e.target.value
        })
    }
    const handelCancel = () => {
        setToggleBgFix(false);
        RefBoxFixUser.current.style.display = "none"
    }
    const GetDate = (date) => {
        const dates = new Date(date);
        const getDate = `${dates.getDay()} - ${dates.getMonth()} - ${dates.getFullYear()}`
        return getDate
    }
    const handelSlide = (i) => {
        const a = i * 10;
        const b = a + 10;
        const c = listSearch.filter((user, index) => {
            if (index >= a && index < b) {
                return user
            }
        })
        return c
    }
    const Ebutton = () => {
        const arrayBtn = [];
        for (let i = 0; i < listSearch.length / 10; i++) {
            arrayBtn.push(<button key={i} className={`${i == abs && "active_Slide_Page"} btnPage`} onClick={() => setAbs(i)} >{i}</button>)
        }
        return arrayBtn
    }
    const handelFixUser = (id, user) => {
        setListAddUser({
            ...user
        })
        setShowFixUser(id);
        setIdFix(listSearch.filter(user => user.id == id));
        setToggleBgFix(!toggleBgFix)
        if (RefBoxFixUser.current.style.display == "block") {
            RefBoxFixUser.current.style.display = "none"
        } else {
            RefBoxFixUser.current.style.display = "block"
        }
    }
    const handelDeleteUser = (id) => {
        dispatch(deleteUser(id))
        setListSearch(listSearch.filter(user => user.id !== id))
    }

    const renderList = (list) => {
        return list.map((user, index) => {
            const { avatar, city, country, createdAt, email, firstName, id, jobTitle, lastName, streetAddress, userName } = user;
            return (
                <tfoot key={id} className={(showFixUser == id && toggleBgFix) ? "activeFix" : ""}>
                    <tr>
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
                                            <div className="groupBtn">
                                                <button className="BtnAddUser" onClick={() => handelSaveUser(id)}>Save</button>
                                                <button className="BtnAddUser" onClick={handelCancel}>Cancel</button>
                                            </div>
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
    const handelChangeSearch = (e) => {
        setUserSearch(e.target.value)
    }
    const BtnSearchUser = (select) => {
        const ar = []
        select.user.map((user) => {
            for (var i in user) {
                const b = user[i].toString().toLowerCase();
                const c = userSearch.toLowerCase();
                if (b.includes(c)) {
                    ar.push(user)
                    return
                }
            }
        })
        setListSearch(ar);
        setAbs(0)
    }
    return (
        <div className="searchUser">
            <Link to={"/"} className="Btn_Back">Back</Link>
            <div className="headerSearch">
                <h1>SEARCH USER</h1>
            </div>
            <div className="formSearch">
                <input type={"text"} placeholder="search" onChange={handelChangeSearch} onKeyDown={e => {
                    if (e.keyCode == 13) {
                        BtnSearchUser(selector)
                    }
                }} />
                <button onClick={() => BtnSearchUser(selector)}>
                    <SearchOutlined />
                </button>
            </div>
            <div className="boxListSearch">
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
                    {renderList(handelSlide(abs))}
                </table>
                {Ebutton()}
            </div>
        </div>
    )
}
export default SearchUser