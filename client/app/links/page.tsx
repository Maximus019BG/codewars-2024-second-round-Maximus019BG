import NavBar from "@/app/_components/navbar";
import React from "react";
import CreateLink from "@/app/_components/CreateLink";
import AllUrls from "@/app/_components/AllUrls";

const LinksPage = () => {
    //Session check inside sidebar to have
    //Server component

    return (
        <div className="flex w-full h-full">
            <div className="">
                <NavBar/>
            </div>
            <div className="w-full h-full mt-14">
                <div className="w-full flex-1">
                    <CreateLink/>
                </div>
                <div>
                    <AllUrls/>
                </div>
            </div>
        </div>
    );
}
export default LinksPage;