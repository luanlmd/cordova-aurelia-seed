import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Session} from './session';

@inject (HttpClient, Session)
export class Home {

    constructor(http, session)
    {
        this.http = http
        this.session = session

        this.repos = []
    }

    activate()
    {
        this.http.fetch('users/luanlmd/repos')
        .then(response => response.json())
        .then(response => {
            //console.log(response)
            this.repos = response
        })
    }
}
