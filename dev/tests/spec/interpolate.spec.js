/*jshint onevar:false */

//for node
var crossroads = crossroads || require('crossroads');
//end node



describe('Route.interpolate()', function(){

    afterEach(function(){
        crossroads.removeAllRoutes();
    });


    it('should replace regular segments', function(){
        var a = crossroads.addRoute('/{foo}/:bar:');
        expect( a.interpolate({foo: 'lorem', bar: 'ipsum'}) ).toEqual( '/lorem/ipsum' );
        expect( a.interpolate({foo: 'dolor-sit'}) ).toEqual( '/dolor-sit' );
    });

    it('should replace rest segments', function(){
        var a = crossroads.addRoute('lorem/{foo*}:bar*:');
        expect( a.interpolate({foo: 'ipsum/dolor', bar: 'sit/amet'}) ).toEqual( 'lorem/ipsum/dolor/sit/amet' );
        expect( a.interpolate({foo: 'dolor-sit'}) ).toEqual( 'lorem/dolor-sit' );
    });

    it('should replace multiple optional segments', function(){
        var a = crossroads.addRoute('lorem/:a::b::c:');
        expect( a.interpolate({a: 'ipsum', b: 'dolor'}) ).toEqual( 'lorem/ipsum/dolor' );
        expect( a.interpolate({a: 'ipsum', b: 'dolor', c : 'sit'}) ).toEqual( 'lorem/ipsum/dolor/sit' );
        expect( a.interpolate({a: 'dolor-sit'}) ).toEqual( 'lorem/dolor-sit' );
        expect( a.interpolate({}) ).toEqual( 'lorem' );
    });

    it('should throw an error if missing required argument', function () {
        var a = crossroads.addRoute('/{foo}/:bar:');
        expect( function(){
            a.interpolate({bar: 'ipsum'});
        }).toThrow( 'The segment {foo} is required.' );
    });

    it('should throw an error if string doesn\'t match pattern', function(){
        var a = crossroads.addRoute('/{foo}/:bar:');
        expect( function(){
            a.interpolate({foo: 'lorem/ipsum', bar: 'dolor'});
        }).toThrow( 'The generated string "/lorem/ipsum/dolor" doesn\'t match the pattern "/{foo}/:bar:". Check supplied arguments.' );
    });

    it('should throw an error if route was created by an RegExp pattern', function () {
        var a = crossroads.addRoute(/^\w+\/\d+$/);
        expect( function(){
            a.interpolate({bar: 'ipsum'});
        }).toThrow( 'Route pattern should be a string.' );
    });

});
