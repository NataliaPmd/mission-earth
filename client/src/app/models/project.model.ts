import { Center } from './center.model';

interface _User {
    _id: string;
    nombre: string;
    img: string;
}


export class Project {

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public usuario?: _User,
        public center?: Center
    ) {}

}