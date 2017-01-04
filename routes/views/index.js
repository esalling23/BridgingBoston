var keystone = require('keystone');
var Location = keystone.list('Location'),
    Sprite = keystone.list('SpriteSheet')
// var base = require('templates/layouts/base.hbs')
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'home';

    view.on('init', function(next) {

    	var locationsQuery = Location.model.find({
            'enabled': true
        });
        var spriteQuery = Sprite.model.find({});

        spriteQuery.exec(function(err, resultSprites) {
            locals.spriteSheets = resultSprites;
            // console.log(locals.spriteSheets);

            locationsQuery.exec(function(err, resultLocations) {
                locals.locations = resultLocations;
                
                next();
            });
            
        });
    	
    });
    
    view.render('index', {layout: 'base'});
    
}
