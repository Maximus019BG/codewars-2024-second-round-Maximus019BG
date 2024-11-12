import NavBar from "@/app/_components/navbar";
import React from "react";
import CreateLink from "@/app/_components/CreateLink";
import AllUrls from "@/app/_components/AllUrls";

const LinksPage = () => {
    return (
        <div className="flex w-full min-h-screen">
            <div>
                <NavBar/>
            </div>
            <div className="w-full h-full mt-14">
                <div className="w-full flex-1 flex items-center justify-center">
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