var Common = function (nsp, socket) {
    var currentSpace = nsp,
        currentSocket = socket, 
        appRoot = require('app-root-path'),
        Session = require(appRoot + '/lib/SessionManager');

    // Expose handler methods for events
    this.handler = {

        'login:wrong_password': function(package) {

            console.log(package);

            // Session.Get(package.gameId).
            // StartTutorial(currentSpace);
            
        }, 

        'login:admin': function(package) {
            console.log("admin");
        }
    
    };
}

module.exports = Common;