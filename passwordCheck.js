//Password strength check
function passwordCheck(password){

    if(password.length < 8){
        return false;
    }
    if(password.indexOf("password") != -1){
        return false;
    }
    
    //flag for uppercase char
    var upperCase = false;

    for(var i = 0; i < password.length; i++){

        var code = password.charCodeAt(i);
        
        //check ascii for uppercase
        if(code >= 65 && code <= 90){
            upperCase =true;
            break;
        }
    }
    
    //password has uppercase, 8+ char, and does not contain "password"
    return upperCase;
}