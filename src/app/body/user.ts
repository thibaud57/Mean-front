export class User {
    constructor(_id='', name='', pass='', mail='', tasks=[]){
        this._id = _id;
        this.name = name;
        this.pass = pass;
        this.mail = mail;
        this.tasks = tasks;
    }

    _id:string;
    name:string;
    pass:string;
    mail:string;
    tasks:Array<any>;
}