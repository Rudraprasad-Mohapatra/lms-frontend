import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <>
            <footer className="relative w- left-0 bottom-0 h-fit py-5 px-10 flex flex-col sm:flex-row  gap-y-4 items-center justify-between  bg-gray-800 text-white">
                <section className="text-lg">
                    Copyright {year} | All rights reserved
                </section>

                <section className="flex items-center justify-center gap-5 text-2xl text-white">
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsFacebook />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsInstagram />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsLinkedin />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsTwitter />
                    </a>
                </section>
            </footer>
        </>
    )
}
export default Footer;