import SideBar from "@/app/_components/SideBar";
import React from "react";

const LinksPage = () => {
    //Session check inside sidebar to have
    //Server component

    return (
        <div className="flex">
            <div className="relative h-full">
                <SideBar/>
            </div>
            <h1>Links</h1>
        </div>
    );
}
export default LinksPage;