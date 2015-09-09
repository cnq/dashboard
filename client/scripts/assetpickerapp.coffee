'use strict';

angular.module('assetpickerapp', [
    # Angular modules
    'ngRoute'
    'ngAnimate'
    'ngResource'

    # 3rd Party Modules
    'ui.bootstrap'
    'easypiechart'
    'mgo-angular-wizard'
    'textAngular'
    'ui.tree'
    'ngTagsInput'
    'restangular'
    'rt.encodeuri'
    'ui.ace'
    'ng-context-menu'
    'xeditable'

    # Custom modules
    'app.ui.ctrls'
    'app.ui.directives'
    'app.ui.services'
    'app.controllers'
    'app.services'
    'app.directives'
    'app.form.validation'
    'app.ui.form.ctrls'
    'app.ui.form.directives'
    'app.tables'
    'app.task'
    'app.localization'
    'app.chart.ctrls'
    'app.chart.directives'
    'app.page.ctrls'
    'app.applications.ctrls'
    'app.applications.services'
    'app.endpoints.ctrls'
    'app.endpoints.services'
    'app.content.ctrls'
    'app.content.services'
    'app.directory.ctrls'
    'app.directory.services'
    'app.users.ctrls'
    'app.users.services'
    'angularFileUpload'
    'emguo.poller'
])
    
.config([
    '$routeProvider','$httpProvider' ,'RestangularProvider', 'pollerConfig'
    ($routeProvider, $httpProvider, RestangularProvider, pollerConfig) ->

        $.get( "/api/auth/authenticateduser", ( user ) ->
            if(!user.isAuthenticated)
                window.location.href='/login.html'
        )

        pollerConfig.stopOnStateChange = true
        pollerConfig.stopOnRouteChange = true

        Ladda.bind( 'button[type=submit]' );
        # toastr setting.  this is the ui error notification framework
        toastr.options =
            "closeButton": true
            "positionClass": "toast-bottom-right"
            "timeOut": "3000"

        RestangularProvider.setBaseUrl('/api/');
        #RestangularProvider.setDefaultHttpFields({cache: true});
        RestangularProvider.setErrorInterceptor((response) ->
            if (response.status == 401)
                console.log("Login required... ")
                window.location.href='/login.html'
            else if (response.status == 400)
                
                msg = "An error occurred while processing your request"
                
                if(response.data && response.data.message)
                    msg = response.data.message;
                
                console.log("Bad Request: " + msg);
                toastr["error"](msg);
            
            else
                console.log("Response received with HTTP error code: " + response.status);
                if (response.data && response.data.message)
                    msg = response.data.message;
                else
                    msg = "An error occurred while processing your request";
                
                toastr["error"](msg);
                return true;
            
        );



        $routeProvider
             # base
            .when(
                '/'
                templateUrl: 'views/pages/blank.html'
            )
             # content
            .when('/contents', {templateUrl: 'views/contents/list.html'})
            .when('/contents/:Id/select', {templateUrl: 'views/contents/select.html'})


            # Pages
            .when(
                '/404'
                templateUrl: 'views/pages/404.html'
            )
            .when(
                '/pages/500'
                templateUrl: 'views/pages/500.html'
            )
            .when(
                '/pages/blank'
                templateUrl: 'views/pages/blank.html'
            )


            .otherwise(
                redirectTo: '/404'
            )
])
.run([
    '$rootScope', 'Restangular'
    ($rootScope, Restangular) ->

        Restangular.addRequestInterceptor((element) -> 
            $rootScope.loading = true;
            return element;
        );
        Restangular.addResponseInterceptor((data) -> 
            $rootScope.loading = false;
            return data;
        );
])
