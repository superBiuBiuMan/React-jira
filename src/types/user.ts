export interface UserInfo {
    id?:number,
    name?:string,
    email?:string,
    title?:string,
    organization?:string,
    token?:string
}

export interface UserLoginInfo {
    username:string,
    password:string,
}
