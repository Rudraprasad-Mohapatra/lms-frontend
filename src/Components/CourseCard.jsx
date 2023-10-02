import { useNavigate } from "react-router-dom";

function Coursecard({data}) {
    // console.log(`Data is` ,data);
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/course/description/")} className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">
            <div className="overflow-hidden">
                <img src={data?.thumbnail?.secure_url} alt="course thumbnail" className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300" />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
                        {data?.title}
                    </h2>
                    <p className="line-clamp-2">
                        {data?.description}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">category: </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Total lectures: </span>
                        {data?.numbersOfLectures}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Instructor: </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Coursecard;