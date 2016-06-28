import {Router} from 'aurelia-router';
import {Session} from 'session';
import {HttpClient} from 'aurelia-fetch-client';

export class App {
    static inject() { return [Router, Session, HttpClient]; }

    constructor(router, session, http)
    {
        this.router = router
        this.session = session
        this.http = http

        this.router.configure(config=>{
            config.title = 'Central 4'
            config.map([
                { route: '', moduleId:'home', nav:true, title:'Home' },
                { route: 'test', moduleId:'test', nav:true, title:'Test' }
            ])
        })
    }

}
