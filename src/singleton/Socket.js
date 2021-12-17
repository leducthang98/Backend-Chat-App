import socketIo from 'socket.io';
import { HttpApp } from './Http';

export const SocketApp = (function () {
    var instance;

    function createInstance() {
        var object = socketIo(HttpApp.getInstance());
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
