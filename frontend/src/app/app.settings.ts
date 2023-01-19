//this is to hold all the application settings in one place
export class AppSettings{
    public static readonly API_Endpoint = "https://localhost"; 

    public static readonly API_Port = "7103";

    public static readonly API_LoginEndPoint = "/api/Authentication/login";  

    public static readonly API_User = "/api/User"; 

    public static GetAPI(){
        return this.API_Endpoint + ":" + this.API_Port;
    }
}