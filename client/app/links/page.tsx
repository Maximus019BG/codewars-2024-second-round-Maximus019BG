import {SessionCheck} from "../funcs/funcs";


const LinksPage = () => {
    //Session check
    //No useEffect hook is used cuz i want a server component
    SessionCheck();

    return (
        <div>
            <h1>Links</h1>
        </div>
    );
}
export default LinksPage;