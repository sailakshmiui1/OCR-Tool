import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly USER_DETAILS_KEY = 'userDetails';
  constructor(private http: HttpClient) { }

  tokenGenerate(): Observable<any> {
    // debugger;
    const params = new HttpParams({
      fromObject: {
        client_id: 'ocr-rest-client',
        client_secret: 'getUtfcu8gAjISOK1Rf1rm1sXp9FGTHL',      
        grant_type: 'client_credentials'
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  
    return this.http.post("http://localhost:8080/realms/master/protocol/openid-connect/token", params, httpOptions);
  }
  
  createUser(data:any, token:any): Observable<any> {  
    debugger;
    let api_key = token;
    let bodydata = JSON.stringify({ "email": data["email"],  "enabled": true,  "credentials":[{ "type": "password", "value": data["password"], "temporary": false}],  "username":data["username"]  });
    
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`
      })
    };
  
    return this.http.post("http://localhost:8080/admin/realms/master/users", bodydata, httpOptions);
  }

  loginKeycloak(data: any, token: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {        
        username: data["username"],
        password: data["password"],
        grant_type: "password",
        client_id: 'ocr-rest-client',
        client_secret: 'getUtfcu8gAjISOK1Rf1rm1sXp9FGTHL',  
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.post("http://localhost:8080/realms/master/protocol/openid-connect/token", params, httpOptions);
  }

  loginApi(data: any, token:any): Observable<any>{
    const params = new HttpParams({
      fromObject: {        
        email: data["username"],
        password: data["password"]
      }
    });
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post("http://127.0.0.1:8000/silverskillscre/ocr/signin", params,{headers: headers});
  }
  userResetPasswordKeycloak(username:any, token: any): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.get(`http://localhost:8080/admin/realms/master/users?search=${username}`, httpOptions);
  }
  resetPasswordKeycloak(password: any, id:any, token: any): Observable<any> {
    // const params = new HttpParams({
    //   fromObject: {       
    //     "type": "password", 
    //     "temporary": false, 
    //     "value": password
    //   }
    // });
    const bodydata = ({"type": "password", "temporary": false, "value": password});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.put(`http://localhost:8080/admin/realms/master/users/${id}/reset-password`, bodydata, httpOptions);
  }
  

  resetpasswordSenderApi(email: any,token:any): Observable<any>{

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(`http://127.0.0.1:8000/silverskillscre/ocr/signin/reset_password_sender?email=${email}`, {headers: headers});
  }

  otpVerificationApi(otp: any, transid: any, token:any,): Observable<any>{
    console.log("trans_id ", transid, " :" , "otp" ,otp, ":",  token, ":")
    let bodydata = ({"trans_id": transid, "otp": Number(otp) });
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(`http://127.0.0.1:8000/silverskillscre/ocr/signin/password_validation?otp=${otp}`, bodydata, {headers: headers});
  }
  resetpasswordApi(email:any, password:any, token: any): Observable<any>{
  const headers = new HttpHeaders();
  let bodydata = ({"email": email, "password": password }) ;
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(`http://127.0.0.1:8000/silverskillscre/ocr/signin/reset_password`,  bodydata, {headers: headers});
}

getUserDetails(): any {
  const userDetails = localStorage.getItem(this.USER_DETAILS_KEY);
  return JSON.parse(userDetails);
}

setUserDetails(userDetails: any): void {
    localStorage.setItem(this.USER_DETAILS_KEY, JSON.stringify(userDetails));
}

}
