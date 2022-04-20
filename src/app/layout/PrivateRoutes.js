import { MdBedroomParent, MdSupervisedUserCircle } from 'react-icons/md';
import { BsChatTextFill } from 'react-icons/bs';
import {RiLayout2Line} from 'react-icons/ri';

/*
* Liste des routes privés par roles 
*/
export const adminUrls = [
    {
      name: "Tableau de bord", 
      url:"/admin/tableau-de-bord", 
      icon: <RiLayout2Line className="nav-icon" />
    },
    {
      name: "Utilisateurs", 
      url:"/admin/utilisateurs", 
      icon: <MdSupervisedUserCircle className="nav-icon" />
    },
    {
      name: "Messages", 
      url:"/admin/messages", 
      icon: <BsChatTextFill className="nav-icon" />
    }
]

export const gerantUrls = [
    {
      name: "Tableau de bord", 
      url:"/gerant/tableau-de-bord", 
      icon: <RiLayout2Line className="nav-icon" />
    },
    {
      name: "Suites", 
      url:"/gerant/suites", 
      icon: <MdBedroomParent className="nav-icon" />
    }
]

export const clientUrls = [
    {
      name: "Mon compte", 
      url:"/client/mon-compte", 
      icon: <RiLayout2Line className="nav-icon" />
    }
]