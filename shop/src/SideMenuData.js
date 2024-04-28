import { IoIosPaper} from "@react-icons/all-files/io/IoIosPaper";
import { IoMdPeople } from "@react-icons/all-files/io/IoMdPeople";
import { FaEnvelopeOpenText } from "@react-icons/all-files/fa/FaEnvelopeOpenText";
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import { FiShoppingBag } from "react-icons/fi";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { FaMotorcycle } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi";
import { PiMotorcycle } from "react-icons/pi";
import { BsTools } from "react-icons/bs";

export const SideMenuData = [
    {
        title: 'All products',
        path: '/shop',
        icon: <FiShoppingBag color='#ffbfbf'/>,
        cName: 'nav-text'
    },
    {
        title: 'Sportsters',
        path: '/',
        icon: <PiMotorcycleFill color='#ffd2bf'/>,
        cName: 'nav-text'
    },
    {
        title: 'Cruisers',
        path: '/',
        icon: <PiMotorcycle color='#fff0bf'/>,
        cName: 'nav-text'
    },
    {
        title: 'GATs',
        path: '/team',
        icon: <FaMotorcycle color='#e0ffbf'/>,
        cName: 'nav-text'
    },
    {
        title: 'Trikes',
        path: '/',
        icon: <LiaMotorcycleSolid color='#bfffe7'/>,
        cName: 'nav-text'
    },
    {
        title: 'Tools',
        path: '/',
        icon: <BsTools color='#d1bfff'/>,
        cName: 'nav-text'
    }
]