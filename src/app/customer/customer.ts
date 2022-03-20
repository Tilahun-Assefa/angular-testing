export interface Customer {
    id: number;
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
    authdata?: string;
    imageUrl?: string, 
    department?: string[],    
}