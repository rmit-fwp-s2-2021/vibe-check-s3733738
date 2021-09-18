import React from 'react'
import img from "../media/priscilla-du-preez-XkKCui44iM0-unsplash.jpeg";
import vec1 from "../media/chat-bubble.png";
import vec2 from "../media/opinion.png";
import vec4 from "../media/discussion.png";
import vec3 from "../media/mediator.png";

function Home() {
    //landing page code
    return (
        <>
            <div className="row text-center">
                <div className="col-xl d-flex align-items-center justify-content-center">

                    <h2>Build a social community and <br></br>share your thoughts!</h2>
                </div>
                <div className="col-xl">
                    <img className="img-fluid" src={img} alt="img" />
                </div>
            </div>
            <br></br>
            <div className="row text-center p-3 my-3">
                <div className="col-xl">
                    <img src={vec1} alt="vec" width="160" height="160" />
                    <h3>Better way to stay connected </h3>
                </div>
                <div className="col-xl">
                    <img src={vec2} alt="vec" width="160" height="160" />
                    <h3>Disucssion, queries, suggestions about courses</h3>
                </div>
                <div className="col-xl">
                    <img src={vec3} alt="vec" width="160" height="160" />
                    <h3>Meet new friends in a secure environment</h3>
                </div>
                <div className="col-xl">
                    <img src={vec4} alt="vec" width="160" height="160" />
                    <h3>Help those across you institution connect, discuss and stay informed</h3>
                </div>
            </div>

        </>

    )
}

export default Home;

