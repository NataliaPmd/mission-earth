export class User {
    constructor(
        public nombre: string,
        public email: string,
        public google?: boolean,
        public password?: string,
        public img?: string,
        public role?: string,
        public uid?: string
    ) {}
    
}