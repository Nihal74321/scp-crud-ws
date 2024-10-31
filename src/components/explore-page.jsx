import { sbase } from "./supabase";
import './explore-page.css';
import { useState, useEffect } from "react";
import Bar from "./dynamic-bar";
import { IoIosCloseCircle } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Explore() {
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [safeItems, setSafeItems] = useState([]);

    const fetchI = async () => {
        const { data, error } = await sbase.from('scp-table').select('*');
        if (error) {
            console.error(error);
        } else {
            setItem(data);
            const FILTER_SAFE_DATA = data.filter((e) => e.class === "Safe");
            setSafeItems(FILTER_SAFE_DATA);
        }
    };

    useEffect(() => {
        fetchI();
    }, []);

    const SEND_USER = (SCP_ITEM) => {
        navigate(`/scp/${SCP_ITEM}`);
    }

    const Sidebar = () => {
        return (
            <div className="sidebar-container">
                <div className="search-bar">
                    <div className="search">
                        <FaMagnifyingGlass />
                        Search...
                    </div>
                    <IoIosCloseCircle />
                </div>
                <div className="nav-buttons">
                    <div className="create" onClick={()=> navigate('scp/create')}>Create New</div>
                </div>
            </div>
        )
    }
    const Listing = () => {
        return (
            <>           
                {item.length > 0 ? (
                    <div className="main-container">
                        {item.slice().reverse().map((e, i) => (    
                            <div className="container" key={e.id} onClick={() => SEND_USER(e.item)}>
                                <div className="img"></div>
                                <div className="text-container">
                                    <p className="name">{e.name}</p>
                                    <div className="inf-container">
                                        <p>SCP-{e.item}</p>
                                        <p>{e.class}</p>
                                    </div>
                                    <p className="desc">{e.description.split(' ').slice(0, 14).join(' ')}...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Something went wrong!</p>
                )}
            </>
        );
    };    

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-content">
                <h1 className="explore">Explore SCPS</h1>
                <Listing />
            </div>
        </div>
    );
}

