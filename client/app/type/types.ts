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
}
