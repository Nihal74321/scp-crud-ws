import "./create.css";
import { useEffect, useState } from "react";
import { sbase } from "../components/supabase";
import { useNavigate, useParams } from "react-router-dom";

export default function NewPage() {
    const navigate = useNavigate();
    const { SCP_ITEM } = useParams();
    const [scpItem, setScpItem] = useState("000");
    const [scpName, setScpName] = useState("Name");
    const [scpClass, setScpClass] = useState("Safe");
    const [containmentInfo, setContainmentInfo] = useState("Special containment procedures");
    const [description, setDescription] = useState("Description");
    const [isEdit, setIsEdit] = useState(false);

    const fetchSCP = async () => {
        if (SCP_ITEM) {
            const { data, error } = await sbase
                .from("scp-table")
                .select("*")
                .eq("item", SCP_ITEM)
                .single();

            if (error) {
                console.error(error);
            } else {
                setScpItem(data.item);
                setScpName(data.name);
                setScpClass(data.class);
                setContainmentInfo(data.containment_inf);
                setDescription(data.description);
                setIsEdit(true);
            }
        }
    };

    useEffect(() => {
        fetchSCP();
    }, [SCP_ITEM]);

    const Insert_One = async () => {
        const newSCP = {
            item: scpItem.trim(),
            name: scpName.trim(),
            class: scpClass.trim(),
            containment_inf: containmentInfo.trim(),
            description: description.trim(),
        };

        try {
            const { error } = await sbase.from("scp-table").insert([newSCP]);

            if (error) {
                console.error("Error inserting SCP:", error);
                alert("Failed to create new SCP. Please try again.");
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred.");
        }
    };

    const Update_SCP = async () => {
        const updates = {
            name: scpName.trim(),
            class: scpClass.trim(),
            containment_inf: containmentInfo.trim(),
            description: description.trim(),
        };

        try {
            const { error } = await sbase
                .from("scp-table")
                .update(updates)
                .eq("item", SCP_ITEM);

            if (error) {
                console.error("Error updating SCP:", error);
                alert("Failed to update SCP. Please try again.");
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleSubmit = () => {
        if (isEdit) {
            Update_SCP();
        } else {
            Insert_One();
        }
    };

    return (
        <div className="new-container">
            <div className="title-container">
                <h2>{isEdit ? "Edit SCP" : "Create your New SCP"}</h2>    
            </div>
            <div className="basic-details">
                <h3>Basic Details</h3>
                <div className="details-container">
                    <input 
                        type="text" 
                        className="scp input" 
                        value={scpItem} 
                        onChange={(e) => setScpItem(e.target.value)} 
                        placeholder="SCP Item Number"
                        disabled={isEdit}
                    />
                    <input 
                        type="text" 
                        className="new-name input" 
                        value={scpName} 
                        onChange={(e) => setScpName(e.target.value)} 
                        placeholder="Name"
                    />
                </div>
            </div>
            <div className="class">
                <h3>Class</h3>
                <input 
                    type="text" 
                    className="safe input" 
                    value={scpClass} 
                    onChange={(e) => setScpClass(e.target.value)} 
                    placeholder="Class"
                />
            </div>
            <div className="information">
                <h3>Information</h3>
                <div className="information-container">
                    <textarea 
                        className="desc long input" 
                        value={containmentInfo}
                        onChange={(e) => setContainmentInfo(e.target.value)} 
                        placeholder="Special Containment Procedures"
                    />
                    <textarea 
                        className="desc long input" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Description"
                    />
                </div>
            </div>
            <button className="new" onClick={handleSubmit}>
                {isEdit ? "Update SCP" : "Create SCP"}
            </button>
        </div>
    );
}
