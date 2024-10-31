import { sbase } from "./supabase";
import './dynamic-bar.css';
import { useState, useEffect } from "react";

export default function Bar() {
    const [item, setItem] = useState([]);

    const fetchI = async () => {
        const { data, error } = await sbase.from('scp-table').select('*');
        if (error) {
            console.error(error);
        } else {
            setItem(data);
        }
    };

    useEffect(() => {
        fetchI();
    }, []);

    return (
        <>
            {item.map((e) => (
                <p key={e.id}>{e.item}</p>
            ))}
        </>
    );
}
