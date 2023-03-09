import "./style.css"
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import useUserInfo from "../../../hooks/useUserInfo";
import getUsersList from "../../../services/getUsersList";
import searchIcon from "../../../assets/search.png"

export default function UserList() {
    const navigate = useNavigate()
    const { decryptedToken, isAdmin } = useUserInfo()
    const [users, setUsers] = useState([])
    const [numOfPages, setNumOfPages] = useState(0)
    const [searchBar, setSearchBar] = useState("")
    const [status, setStatus] = useState({ notFound: false, loading: true })
    const [linkProps, setLinkProps] = useState({
        word: "",
        direction: "ASC",
        page: 1,
        pageSize: 12
    })

    useEffect(() => {
        getUsersList(decryptedToken, linkProps).then(({ json, numberOfUsers }) => {
            setNumOfPages(Math.ceil(numberOfUsers / linkProps.pageSize))
            setUsers(json)

            if (json.length === 0) setStatus({ notFound: true, loading: false })
            else setStatus({ notFound: false, loading: false })
        })
    }, [linkProps.page, linkProps.word])

    function movePage(movingPages) {
        setLinkProps(prev => ({ ...prev, page: prev.page + movingPages }))
    }

    function handleSearchBar(e) {
        setSearchBar(e.target.value)
    }

    function searchUser(e) {
        if (e.keyCode !== 13) return
        setLinkProps(prev => ({ ...prev, word: searchBar, page: 1 }))
    }

    console.log(users)

    return isAdmin ?
        <div className="users_list_main_div">
            <Header />
            {!status.loading &&
                <main className="users_list_main">
                    <div className="users_list_search_bar">
                        <input
                            placeholder="Search User"
                            type="text"
                            value={searchBar}
                            onChange={handleSearchBar}
                            maxLength="100"
                            onKeyDown={searchUser}
                        />
                        <img src={searchIcon} alt="Search" />
                    </div>

                    <div className="users_list_container">
                        <div className="users_list">
                            <div className="users_list_header">
                                <div className="users_list_id">ID</div>
                                <div className="users_list_first_name">First Name</div>
                                <div className="users_list_last_name">Last Name</div>
                                <div className="users_list_email">Email</div>
                                <div className="users_list_daste_of_birth">Date of Birth</div>
                                <div className="users_list_address">Address</div>
                            </div>

                            {status.notFound ? <div className="users_list_data" />
                                :
                                users.map(user => <div key={user.id} className="users_list_data"
                                    onClick={() => navigate("/account/profile", { state: { userId: user.id, adminRole: true } })}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="users_list_id">{user.id}</div>
                                    <div className="users_list_first_name">{user.firstName}</div>
                                    <div className="users_list_last_name">{user.lastName}</div>
                                    <div className="users_list_email">{user.email}</div>
                                    <div className="users_list_daste_of_birth">{user.dateOfBirth}</div>
                                    <div className="users_list_address">{user.address}</div>
                                </div>)
                            }
                        </div>
                    </div>

                    <div className="users_list_buttons">
                        {linkProps.page > 1 && <button onClick={() => movePage(-1)}>Previous Page</button>}
                        {linkProps.page < numOfPages && <button onClick={() => movePage(1)}>Next Page</button>}
                    </div>
                </main>
            }
            <Footer />
        </div> : <Navigate to="/" />
}