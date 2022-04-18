import {RiLayout2Line} from 'react-icons/ri';

/*
* Liste des routes privés par roles 
*/
export const adminUrls = [
    {
      name: "Tableau de bord", 
      url:"/admin/tableau-de-bord", 
      icon: <RiLayout2Line className="nav-icon" />
    }
]

export const gerantUrls = [
    {
      name: "Tableau de bord", 
      url:"/gerant/tableau-de-bord", 
      icon: <RiLayout2Line className="nav-icon" />
    }
]

export const clientUrls = [
    {
      name: "Tableau de bord", 
      url:"/client/tableau-de-bord", 
      icon: <RiLayout2Line className="nav-icon" />
    }
]