import { Server } from 'socket.io';
import { HttpApp } from './Http';

export const SocketApp = (function () {
    var instance;

    function createInstance() {
        var object = new Server(HttpApp.getInstance(), {
            cors: {
                origin: '*'
            }
        })
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
