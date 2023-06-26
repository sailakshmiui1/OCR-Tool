import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

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
        password: data["password"]
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
  

  resetpasswordSenderApi(email: any,token:any): Observable<any>{

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(`http://127.0.0.1:8000/silverskillscre/ocr/signin/reset_password_sender?email=${email}`, {headers: headers});
  }

  otpVerificationApi(otp: any, transid: any, token:any,): Observable<any>{
    console.log("trans_id ", transid, " :" , "otp" ,otp, ":",  token, ":")
    let bodydata = ({"trans_id": transid, "otp": otp });
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(`http://127.0.0.1:8000/silverskillscre/ocr/signin/password_validation?otp=${otp}`, bodydata, {headers: headers});
  }
  resetpasswordApi(token: any): Observable<any>{
  const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-ww-form-urlencoded');
    headers.append('accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(`http://127.0.0.1:8000/silverskillscre/ocr/signin/reset_password`, {headers: headers});
}

}
