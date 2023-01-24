//this is to hold all the application settings in one place
export class AppSettings{
    //backend end points 
    public static readonly API_Endpoint = "https://localhost"; 

    public static readonly API_Port = "7103";

    public static readonly API_LoginEndPoint = "/api/Authentication/login";  
    
    //ingredients
    public static readonly API_GetIngredient = "/api/Ingre";  
    public static readonly API_AddIngredient = "/api/Ingre/create"; 
    
    //pantryItems
    public static readonly API_GetPantyItems = "/api/Pantry/"; 
    public static readonly API_AddPantyItems = "/api/Pantry/create"; 

    public static readonly API_User = "/api/User"; 

    public static GetAPI(){
        return this.API_Endpoint + ":" + this.API_Port;
    }


    //site data
    public static readonly HomeTitle:string = "Family Pantry App";
    public static readonly LoginPageTitle:string = "Login";
    public static readonly RegisterPageTitle:string = "Create An Account";
}