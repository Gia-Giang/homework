import { Routes, Route, Link } from "react-router-dom";
import ListUser from "../components/ListUser";
import AddUser from "../components/AddUser";
import SearchUser from "../components/searchUser";
const BrowRouter = () => {
    return (
        <>
            <Routes>
                <Route element={<ListUser />} path="/"></Route>
                <Route element={<SearchUser />} path="/SearchUser"></Route>
            </Routes>
        </>
    )
}
export default BrowRouter