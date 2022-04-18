/*
* Liste des fonctions utiles
*/

export const formatRoles = (role) => {
    let res = "";
    switch (role) {
        case "ADMIN":
            res = "Administrateur"
            break;
        case "GERANT":
            res = "Gérant"
            break;
        case "CLIENT":
            res = "Client"
            break;
        default:
            break;
    }
    return res;
}