import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function DisplayLectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();

    useEffect(() => {
        console.log(state);
    }, [])
    console.log("HII");
    return (
        <HomeLayout>
            All Lectures Here
        </HomeLayout>
    );
}

export default DisplayLectures;