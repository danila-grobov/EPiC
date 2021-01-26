import React, { Component } from "react";
import "./profile_page/app.scss";
function Profile() {
    //Get teacher info here
    const teacherID = "dwightSchrute";
    const defaultFilepath= "./Default.jpg";
    const possibleFilepath = "./"+teacherID+".jpg";

    return(
    <html>
    <body>
    <img src=imageFilepath alt="UserImage" width="128" height="128" top="166" left="162" border-radius={50}></img>

    <script>
        try{
        document.getElementById('USerImage').src='possibleFilepath'
    }
        catch(exception){}
    </script>
    <h1 top="166" left="212"><span id="teacherID"></span></h1>
    <form action="/action_page.php">
        <input type="text" id="fname" name="fname"></input>
        <input type="text" id="lname" name="lname"></input>
        <input type="text" id="uname" name="uname"></input>
        <input type="text" id="email" name="email"></input>
        <input type="submit" id="save" name="save" value="save"></input>
    </form>
    <button onClick={}>Change password</button>
    </body>
    </html>)
}
export default Profile;
