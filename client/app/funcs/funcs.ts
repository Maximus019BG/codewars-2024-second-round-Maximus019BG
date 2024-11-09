import axios from "axios";
import { api } from "@/app/api/conf";
import Cookies from "js-cookie";
import {SessionCheckType} from "@/app/type/types";

//Session check function for all pages except authentication pages
export const SessionCheck = () => {
    const accessToken = Cookies.get('accessToken'); //Access Token
    const refreshToken = Cookies.get('refreshToken');//Refresh Token
    //Data object with tokens
    const data: SessionCheckType = {
        accessToken,
        refreshToken,
    };
    //API call (axios)
    axios.post(`${api}/auth/session/check`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        //Valid session
        console.log(response.data);
        if (response.data === 'Session is valid') {
            // Session is valid
        } else {
            Cookies.set('accessToken', response.data.accessToken, { secure: true });
        }
    }).catch((error) => {
        //Invalid session
        window.location.href = '/log-in';
        console.log('Session is invalid'+error);
    });
};

//Session check function for authentication pages
export const SessionCheckAuth = () => {
    const accessToken = Cookies.get('accessToken'); //Access Token
    const refreshToken = Cookies.get('refreshToken');//Refresh Token
    //Data object with tokens
    const data: SessionCheckType = {
        accessToken,
        refreshToken,
    };
    //API call
    axios.post(`${api}/auth/session/check`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        //Valid session
        console.log(response.data);
        if (response.data === 'Session is valid') {
            window.location.href = '/links';
        } else {
            Cookies.set('accessToken', response.data.accessToken, { secure: true });
        }
    }).catch((error) => {
        //Invalid session
        console.log('Session is invalid'+error);
    });
}