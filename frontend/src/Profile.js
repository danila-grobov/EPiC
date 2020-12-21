import React, { Component } from "react";
import "./app.scss";
function Profile() {
    var imageFilepath= "./Default.jpg";
    return(
    <html>
    <body>
    //Search for existing saved image here
    <img src=imageFilepath alt="UserImage" width="100" height="100" border-radius={50}></img>
    <p>...After the script.</p>
    </body>
    </html>)
}
export default Profile;
