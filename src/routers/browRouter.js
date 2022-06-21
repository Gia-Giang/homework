import { Routes, Route } from "react-router-dom";
import ListUser from "../components/ListUser";
import AddUser from "../components/AddUser";
const BrowRouter = () => {
    return (
        <Routes>
            <Route element={<ListUser />} path="/"></Route>
            <Route element={<AddUser />} path="/AddUser"></Route>
        </Routes>
    )
}
export default BrowRouter