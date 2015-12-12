'use strict';

angular.module('app.applications.services', ['restangular'])

.service('applicationsService', (Restangular) ->

    return {            
        getApplications: () ->
             Restangular.all('apps').getList()

        getApplication: (id) ->
            return  Restangular.one('apps',id).get()

        getRoute: (app,routeId) ->
            route = jQuery.grep(app.routes, ( a ) ->
              return a.id.toString() == routeId
            )
            return route[0]

        newApplication: () ->
            {'id':0, 'name':'', 'url':'', 'authenticationRedirect':'', 'resetPassword':'', 'accountVerification':'', 'ipAddress':'', 'suppressDefaultEndpoint':'false', 'transportSecurity':'false'}

        newRoute: () ->
            {'id':0, 'requestPattern':'', 'passTo':'', 'routeOrder':0, 'requireAuthentication':false, 'rules':''}

        saveApplication: (app) ->
            if(app.id > 0)
                return app.put()
            else
                return Restangular.all('apps').post(app);
            return

        saveRoute: (app, route) ->
            if(!app.routes)
                app.routes = []
            if(app.routes.indexOf(route) == -1)
                app.routes.push(route)
            this.saveApplication(app)

        deleteApplication: (app) ->
            app.remove();

        deleteRoute: (app, route) ->
            index = app.routes.indexOf(route);
            if(index > -1)
                app.routes.splice(index, 1);
            this.saveApplication(app)

        applicationUrl: (app) ->
            if(app.name)
                return 'http://' + this.applicationSlug(app)  #TODO: account name will be provided by some global service
            return ''

        applicationSlug : (app) ->
            str = app.name.replace(/^\s+|\s+$/g, ''); # trim
            str = str.toLowerCase();
            
            # remove accents, swap ñ for n, etc
            from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
            to   = "aaaaaeeeeeiiiiooooouuuunc------";
            i = 0
            l = 0
            `for (i=0, l=from.length ; i<l ; i++) {
              str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }`
            
            str.replace(/[^a-z0-9 -]/g, '') # remove invalid chars
               .replace(/\s+/g, '-') # collapse whitespace and replace by -
               .replace(/-+/g, '-') # collapse dashes


    }
)








