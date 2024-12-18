export interface SessionCheckType{
    accessToken?: string;
    refreshToken?: string;
}
export interface UrlType{
    id:string;
    longUrl:string;
    shortUrl:string;
    clicks:number;
    date:string;
    expirationDate:string;
    expired:boolean;
    maxClicks:number;
}
//URL type for editing
export interface UrlTypeEdit{
    id:string;
    longUrl:string;
    shortUrl:string;
    clicks:number;
    date:string;
    expirationDate?:string;
    expired:boolean;
    password:string;
    maxClicks:number;
}

