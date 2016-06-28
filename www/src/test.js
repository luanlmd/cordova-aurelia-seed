import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class Test {

    constructor(http)
    {
        this.http = http;

        this.user = {}
        this.user.name = 'Luan Almeida'
        this.user.email = 'luanlmd@gmail.com'

    }

    get fullName()
    {
        return `${this.user.name} <${this.user.email}>`
    }

    post()
    {
        alert(this.fullName);
    }
}
