import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { sbase } from "../components/supabase";
import { IoIosCloseCircle } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./page.css"
export default function Page() {
    const navigate = useNavigate();
    const [showDel, setShowDel] = useState(false);
    const { SCP_ITEM } = useParams();
    const [scp, setSCP] = useState(null);
    
    const fetchSCP = async () => {
        const {data, error} = await sbase.from('scp-table').select('*').eq('item', SCP_ITEM).single();
        error ? console.error(error) : setSCP(data);
    }


    const deleteSCP = async(target) => {
        await sbase.from('scp-table').delete().eq('id', target);
        navigate('/');
    }

    useEffect(()=> {
        fetchSCP();
    }, [SCP_ITEM]);

    const SEND_USER = (SCP_ITEM) => {
        navigate(`/scp/update/${SCP_ITEM}`);
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
                    <div className="create update" onClick={()=> SEND_USER(scp.item)}>Update SCP</div>
                    <div className="create delete" onClick={()=> setShowDel(true)}>Delete SCP</div>
                </div>
            </div>
        )
    }


    const Delete_context = () => {
        return (
            <div className={`context-main ${showDel ? "shown" : ""}`}>
                <div className="context-container">
                    <p className="confirm-del">Do you want to delete this SCP?</p>
                    <div className="options">
                        <div className="confirm" onClick={()=> deleteSCP(scp.id)}>Confirm</div>
                        <div className="cancel" onClick={()=> setShowDel(false)}>Cancel</div>
                    </div>
                </div>
            </div>
        )
    }

    if(!scp) return <p>Loading...</p>;

    return(
        <div className="wrapper">
            <Sidebar />
            <div className="detail">
                <div className="tags">
                        <p>SCP-{scp.item}</p>
                        <p>{scp.class}</p>
                </div>
                <h2>{scp.name}</h2>
                <div className="img hero">
                    {scp.image ? <img src={scp.image} alt=""/> : ""}
                </div>
                <div className="caption">SCP-{scp.item} ("{scp.name}") in containment</div>
                <h3>Containment Information</h3>
                <p>{scp.containment_inf}</p>
                <h3>Description</h3>
                <p>{scp.description}</p>
            </div>
            <Delete_context />
        </div>
    )
}