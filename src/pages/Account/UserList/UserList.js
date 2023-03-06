import "./style.css"
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import useUserInfo from "../../../hooks/useUserInfo";
import getUsersList from "../../../services/getUsersList";
import searchIcon from "../../../assets/search.png"

export default function UserList() {
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
                        <img src={searchIcon} />
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
                                users.map(prod => <div key={prod.id} className="users_list_data">
                                    <div className="users_list_id">{prod.id}</div>
                                    <div className="users_list_first_name">{prod.firstName}</div>
                                    <div className="users_list_last_name">{prod.lastName}</div>
                                    <div className="users_list_email">{prod.email}</div>
                                    <div className="users_list_daste_of_birth">{prod.dateOfBirth}</div>
                                    <div className="users_list_address">{prod.address}</div>
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