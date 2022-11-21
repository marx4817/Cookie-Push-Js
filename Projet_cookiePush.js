class CookieNotFound extends Error{
    constructor(message){
        super(message);
        this.name ="COOKIE_NOT_FOUND";
    }
}

class NameError extends Error{
    constructor(message){
        super(message);
        this.name = "NAME_ERROR";
    }
}

class ValueError extends Error{
    constructor(message){
        super(message);
        this.name = "VALUE_ERROR";
    }
}

class DateError extends Error{
    constructor(message){
        super(message);
        this.name = "DATE_ERROR";
    }
}

class lengthError extends Error{
    constructor(message){
        super(message)
        this.name = "LENGTH_ERROR";
    }
}


class CookiePush{
    add(cookieName, cookieValue, cookieExp) {
        
        if(cookieName=="" || cookieName==" "){
            throw new NameError("Name Error");
        }else if(cookieValue=="" || cookieValue==" "){
            throw new ValueError("Value Error")
        }

        let cookieExp1;
        if(cookieExp){
            cookieExp1 = cookieExp;
        }else{
            cookieExp1 = 1/1440;
        }

        const d = new Date();
        d.setTime(d.getTime() + (cookieExp1 *24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    update(cookieName, cookieValue, cookieExp) {
        if(!cookieName){
            throw new NameError("Name Error");
        }

        let cookie =document.cookie
        let updat =cookie.split(";")
        const d = new Date();
        d.setTime(d.getTime() + (cookieExp*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        let b;
        for(let cook of updat){
            if(cookieName===cook.split("=")[0].replaceAll(" ", "")){
                b = true;
                break;
            }else{
                b=false
            }
        }

        if(b===true){
            let x = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
            document.cookie = x
        }else{
            throw new CookieNotFound("Cookie Not Found")
        }
    }

    get(cookieName) {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        let b, c1;
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            b =true;
            c1 = c;
            break;
          }else{
            b =false;
          }
        }
        if(b===true){
            return c1.substring(name.length, c1.length);
        }else{
            throw new CookieNotFound("Cookie Not Founde")
        }
        return "";
      }
      

    delete(cookieName){
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        const d = new Date();
        d.setTime(d.getTime() + (-2220*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        let b, c1;
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              b =true;
              c1 = c;
              break;
          }else{
            b=false
          }
        }
        if(b===true){
            document.cookie = name + c1.substring(name.length, c1.length) + ";" + expires + ";path=/";
        }else{
            throw new CookieNotFound("Cookie Not Founde")
        }
        return "";
    }
}