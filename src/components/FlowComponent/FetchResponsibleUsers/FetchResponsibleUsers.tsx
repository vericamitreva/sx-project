import users from "./../../../assets/data/usersExample.json"

export const fetchResponsibleUsers = ():Promise<{ id: number; name: string }[]>  => {
    return Promise.resolve(users)
}