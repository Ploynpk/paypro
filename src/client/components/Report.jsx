import React, { useContext } from "react";
import DataContext from "../data/DataContext";


// 
const Report = () => {
    const {lent , borrowed} = useContext(DataContext);
    return (
        <div>
            <p>You lent: {lent}</p>
            <p>You borrowed: {borrowed}</p>
        </div>
    );
}

export default Report;