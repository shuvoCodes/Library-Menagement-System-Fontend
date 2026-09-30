import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseURL";
import ReservationCard from "../component/ReservationCard";

const Reservation = () => {

    const [reserve,setSererve] = useState([])
    const accessToken = localStorage.getItem('lm-token')

    useEffect(()=>{

        fetch(`${baseurl}/reserve/my`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => setSererve(data))
        .catch(err => console.log(err))

    },[accessToken])

    // console.log(reserve);
    
    return (
        <div>
            <ReservationCard reserve={reserve}/>
        </div>
    );
};

export default Reservation;