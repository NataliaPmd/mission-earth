import { environment } from '../../environments/environment';
const base_url = environment.base_url;

export class User {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
        public favs?: Array<string>,
        public center?: string
    ) {} 
    
    get imageUrl() {
        if(this.img) {
            if(this.img.includes('https')) {
                return this.img;
            }
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}