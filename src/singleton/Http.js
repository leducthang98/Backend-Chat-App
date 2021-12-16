import { ExpressApp } from './Express';
import http from 'http';

export const HttpApp = (function () {
    var instance;
 
    function createInstance() {
        var object = http.createServer(ExpressApp.getInstance());
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
