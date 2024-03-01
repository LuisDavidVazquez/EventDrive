export class Payment {
    constructor(
        readonly id : number,
        readonly name : string,
        readonly amount : number,
        readonly concept : string
    ){}
}