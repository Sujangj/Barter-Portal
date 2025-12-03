import React from "react";
import {Link} from "react-router-dom";

function Home(){
    return(
        <>
          <ol>
            <li>
                <Link to="/">Home</Link>
            </li>
              <li>
                <Link to="/About">About</Link>
            </li>
              <li>
                <Link to="/Contact">Contact</Link>
            </li>
          </ol>
        </>
    );
}

export default Home;