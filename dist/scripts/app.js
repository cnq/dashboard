(function() {
  'use strict';
  angular.module('app', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'easypiechart', 'mgo-angular-wizard', 'textAngular', 'ui.tree', 'ngTagsInput', 'restangular', 'rt.encodeuri', 'ui.ace', 'ng-context-menu', 'xeditable', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.controllers', 'app.services', 'app.directives', 'app.form.validation', 'app.ui.form.ctrls', 'app.ui.form.directives', 'app.tables', 'app.task', 'app.localization', 'app.chart.ctrls', 'app.chart.directives', 'app.page.ctrls', 'app.applications.ctrls', 'app.applications.services', 'app.endpoints.ctrls', 'app.endpoints.services', 'app.content.ctrls', 'app.content.services', 'app.users.ctrls', 'app.users.services', 'angularFileUpload', 'emguo.poller']).config([
    '$routeProvider', '$httpProvider', 'RestangularProvider', 'pollerConfig', function($routeProvider, $httpProvider, RestangularProvider, pollerConfig) {
      var baseUrl;
      baseUrl = "/api/";
      $.get(baseUrl + "auth/authenticateduser", function(user) {
        if (!user.isAuthenticated) {
          return window.location.href = '/login.html';
        }
      });
      pollerConfig.stopOnStateChange = true;
      pollerConfig.stopOnRouteChange = true;
      Ladda.bind('button[type=submit]');
      toastr.options = {
        "closeButton": true,
        "positionClass": "toast-bottom-right",
        "timeOut": "3000"
      };
      RestangularProvider.setBaseUrl(baseUrl);
      RestangularProvider.setErrorInterceptor(function(response) {
        var msg;
        if (response.status === 401) {
          console.log("Login required... ");
          return window.location.href = '/login.html';
        } else if (response.status === 400) {
          msg = "An error occurred while processing your request";
          if (response.data && response.data.message) {
            msg = response.data.message;
          }
          console.log("Bad Request: " + msg);
          return toastr["error"](msg);
        } else {
          console.log("Response received with HTTP error code: " + response.status);
          if (response.data && response.data.message) {
            msg = response.data.message;
          } else {
            msg = "An error occurred while processing your request";
          }
          toastr["error"](msg);
          return true;
        }
      });
      return $routeProvider.when('/', {
        redirectTo: '/home'
      }).when('/home', {
        templateUrl: 'views/dashboard.html'
      }).when('/applications', {
        templateUrl: 'views/applications/list.html'
      }).when('/applications/:Id/edit', {
        templateUrl: 'views/applications/edit.html'
      }).when('/applications/new', {
        templateUrl: 'views/applications/new.html'
      }).when('/applications/:Id/routes', {
        templateUrl: 'views/routes/list.html'
      }).when('/applications/:Id/routes/:routeId/edit', {
        templateUrl: 'views/routes/edit.html'
      }).when('/applications/:Id/routes/new', {
        templateUrl: 'views/routes/new.html'
      }).when('/contents', {
        templateUrl: 'views/contents/list.html'
      }).when('/contents/:Id/edit', {
        templateUrl: 'views/contents/edit.html'
      }).when('/contents/:Id/view', {
        templateUrl: 'views/contents/view.html'
      }).when('/contents/new', {
        templateUrl: 'views/contents/new.html'
      }).when('/contents/newlayout', {
        templateUrl: 'views/contents/newlayout.html'
      }).when('/contents/upload', {
        templateUrl: 'views/contents/upload.html'
      }).when('/contents/newfiles', {
        templateUrl: 'views/contents/newfiles.html'
      }).when('/cms', {
        templateUrl: 'views/contents/cmshome.html'
      }).when('/cms/items', {
        templateUrl: 'views/contents/cmslist.html'
      }).when('/cms/types', {
        templateUrl: 'views/contents/cmstypes.html'
      }).when('/cms/workflows', {
        templateUrl: 'views/contents/cmsworkflows.html'
      }).when('/cms/audit', {
        templateUrl: 'views/contents/cmsaudit.html'
      }).when('/cms/new', {
        templateUrl: 'views/contents/cmsnew.html'
      }).when('/users', {
        templateUrl: 'views/users/list.html'
      }).when('/users/:Id/edit', {
        templateUrl: 'views/users/edit.html'
      }).when('/users/new', {
        templateUrl: 'views/users/new.html'
      }).when('/ui/typography', {
        templateUrl: 'views/ui/typography.html'
      }).when('/ui/buttons', {
        templateUrl: 'views/ui/buttons.html'
      }).when('/ui/icons', {
        templateUrl: 'views/ui/icons.html'
      }).when('/ui/grids', {
        templateUrl: 'views/ui/grids.html'
      }).when('/ui/widgets', {
        templateUrl: 'views/ui/widgets.html'
      }).when('/ui/components', {
        templateUrl: 'views/ui/components.html'
      }).when('/ui/timeline', {
        templateUrl: 'views/ui/timeline.html'
      }).when('/ui/nested-lists', {
        templateUrl: 'views/ui/nested-lists.html'
      }).when('/ui/pricing-tables', {
        templateUrl: 'views/ui/pricing-tables.html'
      }).when('/forms/elements', {
        templateUrl: 'views/forms/elements.html'
      }).when('/forms/layouts', {
        templateUrl: 'views/forms/layouts.html'
      }).when('/forms/validation', {
        templateUrl: 'views/forms/validation.html'
      }).when('/forms/wizard', {
        templateUrl: 'views/forms/wizard.html'
      }).when('/maps/gmap', {
        templateUrl: 'views/maps/gmap.html'
      }).when('/maps/jqvmap', {
        templateUrl: 'views/maps/jqvmap.html'
      }).when('/tables/static', {
        templateUrl: 'views/tables/static.html'
      }).when('/tables/responsive', {
        templateUrl: 'views/tables/responsive.html'
      }).when('/tables/dynamic', {
        templateUrl: 'views/tables/dynamic.html'
      }).when('/charts/others', {
        templateUrl: 'views/charts/charts.html'
      }).when('/charts/morris', {
        templateUrl: 'views/charts/morris.html'
      }).when('/charts/flot', {
        templateUrl: 'views/charts/flot.html'
      }).when('/mail/inbox', {
        templateUrl: 'views/mail/inbox.html'
      }).when('/mail/compose', {
        templateUrl: 'views/mail/compose.html'
      }).when('/mail/single', {
        templateUrl: 'views/mail/single.html'
      }).when('/pages/features', {
        templateUrl: 'views/pages/features.html'
      }).when('/pages/signin', {
        templateUrl: 'views/pages/signin.html'
      }).when('/pages/signout', {
        templateUrl: 'views/pages/signout.html'
      }).when('/pages/signup', {
        templateUrl: 'views/pages/signup.html'
      }).when('/pages/forgot', {
        templateUrl: 'views/pages/forgot-password.html'
      }).when('/pages/lock-screen', {
        templateUrl: 'views/pages/lock-screen.html'
      }).when('/pages/profile', {
        templateUrl: 'views/pages/profile.html'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).when('/pages/500', {
        templateUrl: 'views/pages/500.html'
      }).when('/pages/blank', {
        templateUrl: 'views/pages/blank.html'
      }).when('/pages/invoice', {
        templateUrl: 'views/pages/invoice.html'
      }).when('/pages/services', {
        templateUrl: 'views/pages/services.html'
      }).when('/pages/about', {
        templateUrl: 'views/pages/about.html'
      }).when('/pages/contact', {
        templateUrl: 'views/pages/contact.html'
      }).when('/pages/settings', {
        templateUrl: 'views/pages/settings.html'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ]).run([
    '$rootScope', 'Restangular', function($rootScope, Restangular) {
      $rootScope.brand = {
        name: 'cnq.io',
        title: 'CNQ dashboard',
        url: 'http://www.cnq.io/'
      };
      Restangular.addRequestInterceptor(function(element) {
        $rootScope.loading = true;
        return element;
      });
      return Restangular.addResponseInterceptor(function(data) {
        $rootScope.loading = false;
        return data;
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  if (typeof String.prototype.endsWith !== "function") {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', '$location', '$http', 'currentUserService', function($scope, $rootScope, $location, $http, currentUserService) {
      $scope.isSpecificPage = function() {
        var path;
        path = $location.path();
        return _.contains(['/404', '/pages/500', '/pages/login', '/pages/forgot', '/pages/lock-screen'], path);
      };
      $scope.brand = $rootScope.brand.name;
      currentUserService.user().then(function(user) {
        $scope.currentUser = user;
        if (user.isAuthenticated) {
          return $("#mask").fadeOut();
        } else {
          return window.location.href = "/login.html";
        }
      });
      $scope.signout = function() {
        $("#mask").fadeIn();
        $.ajax({
          url: "/api/auth/signout",
          type: "POST",
          success: function(data, textStatus, jqXHR) {
            return window.location.href = "/login.html";
          }
        });
      };
    }
  ]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
      $scope.home = function() {
        $('body').removeClass('nav-min-w-content');
      };
      $scope.applications = function() {
        $('body').removeClass('nav-min-w-content');
      };
      $scope.contents = function() {
        $('body').addClass('nav-min-w-content');
      };
      $scope.cms = function() {
        $('body').removeClass('nav-min-w-content');
      };
      return $scope.users = function() {
        $('body').removeClass('nav-min-w-content');
      };
    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {}]).filter('iif', function() {
    return function(input, trueValue, falseValue) {
      return input != null ? input : {
        trueValue: falseValue
      };
    };
  });

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.services', ['restangular']).factory('currentUserService', function(Restangular) {
    var currentUser;
    currentUser = function() {
      return Restangular.one('auth/authenticateduser').get();
    };
    return {
      user: function() {
        return currentUser();
      }
    };
  });

}).call(this);

;
(function() {
  angular.module('app.directives', []).directive('imgHolder', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return Holder.run({
            images: ele[0]
          });
        }
      };
    }
  ]).directive('customBackground', function() {
    return {
      restrict: "A",
      controller: [
        '$scope', '$element', '$location', function($scope, $element, $location) {
          var addBg, path;
          path = function() {
            return $location.path();
          };
          addBg = function(path) {
            $element.removeClass('body-home body-special body-tasks body-lock');
            switch (path) {
              case '/':
                return $element.addClass('body-home');
              case '/404':
              case '/pages/500':
              case '/pages/signin':
              case '/pages/signup':
              case '/pages/forgot':
                return $element.addClass('body-special');
              case '/pages/lock-screen':
                return $element.addClass('body-special body-lock');
              case '/tasks':
                return $element.addClass('body-tasks');
            }
          };
          addBg($location.path());
          return $scope.$watch(path, function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            return addBg($location.path());
          });
        }
      ]
    };
  }).directive('uiColorSwitch', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.find('.color-option').on('click', function(event) {
            var $this, hrefUrl, style;
            $this = $(this);
            hrefUrl = void 0;
            style = $this.data('style');
            if (style === 'loulou') {
              hrefUrl = 'styles/main.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else if (style) {
              style = '-' + style;
              hrefUrl = 'styles/main' + style + '.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else {
              return false;
            }
            return event.preventDefault();
          });
        }
      };
    }
  ]).directive('toggleMinNav', [
    '$rootScope', function($rootScope) {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var $content, $nav, $window, Timer, app, updateClass;
          app = $('#app');
          $window = $(window);
          $nav = $('#nav-container');
          $content = $('#content');
          ele.on('click', function(e) {
            if (app.hasClass('nav-min')) {
              app.removeClass('nav-min');
            } else {
              app.addClass('nav-min');
              $rootScope.$broadcast('minNav:enabled');
            }
            return e.preventDefault();
          });
          Timer = void 0;
          updateClass = function() {
            var width;
            width = $window.width();
            if (width < 768) {
              return app.removeClass('nav-min');
            }
          };
          return $window.resize(function() {
            var t;
            clearTimeout(t);
            return t = setTimeout(updateClass, 300);
          });
        }
      };
    }
  ]).directive('collapseNav', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var $a, $aRest, $lists, $listsRest, app;
          $lists = ele.find('ul').parent('li');
          $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
          $a = $lists.children('a');
          $listsRest = ele.children('li').not($lists);
          $aRest = $listsRest.children('a');
          app = $('#app');
          $a.on('click', function(event) {
            var $parent, $this;
            if (app.hasClass('nav-min')) {
              return false;
            }
            $this = $(this);
            $parent = $this.parent('li');
            $lists.not($parent).removeClass('open').find('ul').slideUp();
            $parent.toggleClass('open').find('ul').slideToggle();
            return event.preventDefault();
          });
          $aRest.on('click', function(event) {
            return $lists.removeClass('open').find('ul').slideUp();
          });
          return scope.$on('minNav:enabled', function(event) {
            return $lists.removeClass('open').find('ul').slideUp();
          });
        }
      };
    }
  ]).directive('highlightActive', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$attrs', '$location', function($scope, $element, $attrs, $location) {
            var highlightActive, links, path;
            links = $element.find('a');
            path = function() {
              return $location.path();
            };
            highlightActive = function(links, path) {
              path = '#' + path;
              return angular.forEach(links, function(link) {
                var $li, $link, href;
                $link = angular.element(link);
                $li = $link.parent('li');
                href = $link.attr('href');
                if ($li.hasClass('active')) {
                  $li.removeClass('active');
                }
                if (path.indexOf(href) === 0) {
                  return $li.addClass('active');
                }
              });
            };
            highlightActive(links, $location.path());
            return $scope.$watch(path, function(newVal, oldVal) {
              if (newVal === oldVal) {
                return;
              }
              return highlightActive(links, $location.path());
            });
          }
        ]
      };
    }
  ]).directive('toggleOffCanvas', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.on('click', function() {
            return $('#app').toggleClass('on-canvas');
          });
        }
      };
    }
  ]).directive('slimScroll', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.slimScroll({
            size: '10px',
            color: '#31c0be',
            alwaysVisible: true,
            wheelStep: 10,
            allowPageScroll: false,
            disableFadeOut: true,
            height: 'auto'
          });
        }
      };
    }
  ]).directive('goBack', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$window', function($scope, $element, $window) {
            return $element.on('click', function() {
              return $window.history.back();
            });
          }
        ]
      };
    }
  ]).directive('ladda', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var l;
        if (element && element[0]) {
          l = Ladda.create(element[0]);
          return scope.$watch(attrs.ladda, function(newVal, oldVal) {
            if ((newVal != null)) {
              if (newVal) {
                return l.start();
              } else {
                return l.stop();
              }
            }
          });
        }
      }
    };
  });

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.localization', []).factory('localize', [
    '$http', '$rootScope', '$window', function($http, $rootScope, $window) {
      var localize;
      localize = {
        language: '',
        url: void 0,
        resourceFileLoaded: false,
        successCallback: function(data) {
          localize.dictionary = data;
          localize.resourceFileLoaded = true;
          return $rootScope.$broadcast('localizeResourcesUpdated');
        },
        setLanguage: function(value) {
          localize.language = value.toLowerCase().split("-")[0];
          return localize.initLocalizedResources();
        },
        setUrl: function(value) {
          localize.url = value;
          return localize.initLocalizedResources();
        },
        buildUrl: function() {
          if (!localize.language) {
            localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase();
            localize.language = localize.language.split("-")[0];
          }
          return 'i18n/resources-locale_' + localize.language + '.js';
        },
        initLocalizedResources: function() {
          var url;
          url = localize.url || localize.buildUrl();
          return $http({
            method: "GET",
            url: url,
            cache: false
          }).success(localize.successCallback).error(function() {
            return $rootScope.$broadcast('localizeResourcesUpdated');
          });
        },
        getLocalizedString: function(value) {
          var result, valueLowerCase;
          result = void 0;
          if (localize.dictionary && value) {
            valueLowerCase = value.toLowerCase();
            if (localize.dictionary[valueLowerCase] === '') {
              result = value;
            } else {
              result = localize.dictionary[valueLowerCase];
            }
          } else {
            result = value;
          }
          return result;
        }
      };
      return localize;
    }
  ]).directive('i18n', [
    'localize', function(localize) {
      var i18nDirective;
      i18nDirective = {
        restrict: "EA",
        updateText: function(ele, input, placeholder) {
          var result;
          result = void 0;
          if (input === 'i18n-placeholder') {
            result = localize.getLocalizedString(placeholder);
            return ele.attr('placeholder', result);
          } else if (input.length >= 1) {
            result = localize.getLocalizedString(input);
            return ele.text(result);
          }
        },
        link: function(scope, ele, attrs) {
          scope.$on('localizeResourcesUpdated', function() {
            return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder);
          });
          return attrs.$observe('i18n', function(value) {
            return i18nDirective.updateText(ele, value, attrs.placeholder);
          });
        }
      };
      return i18nDirective;
    }
  ]).controller('LangCtrl', [
    '$scope', 'localize', function($scope, localize) {
      $scope.lang = 'English';
      $scope.setLang = function(lang) {
        switch (lang) {
          case 'English':
            localize.setLanguage('EN-US');
            break;
          case 'Español':
            localize.setLanguage('ES-ES');
            break;
          case '日本語':
            localize.setLanguage('JA-JP');
            break;
          case '中文':
            localize.setLanguage('ZH-TW');
            break;
          case 'Deutsch':
            localize.setLanguage('DE-DE');
            break;
          case 'français':
            localize.setLanguage('FR-FR');
            break;
          case 'Italiano':
            localize.setLanguage('IT-IT');
            break;
          case 'Portugal':
            localize.setLanguage('PT-BR');
            break;
          case 'Русский язык':
            localize.setLanguage('RU-RU');
            break;
          case '한국어':
            localize.setLanguage('KO-KR');
        }
        return $scope.lang = lang;
      };
      return $scope.getFlag = function() {
        var lang;
        lang = $scope.lang;
        switch (lang) {
          case 'English':
            return 'flags-american';
          case 'Español':
            return 'flags-spain';
          case '日本語':
            return 'flags-japan';
          case '中文':
            return 'flags-china';
          case 'Deutsch':
            return 'flags-germany';
          case 'français':
            return 'flags-france';
          case 'Italiano':
            return 'flags-italy';
          case 'Portugal':
            return 'flags-portugal';
          case 'Русский язык':
            return 'flags-russia';
          case '한국어':
            return 'flags-korea';
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  (function() {
    "use strict";
    angular.module("app.applications.ctrls", []).controller("ApplicationListCtrl", [
      "$scope", "$rootScope", "logger", "$filter", "applicationsService", "poller", "Restangular", function($scope, $rootScope, logger, $filter, applicationsService, poller, Restangular) {
        var init, rebuild;
        if (!$scope.applications) {
          $scope.applications = [];
        }
        poller.reset();
        init = function() {
          $scope.search();
          $scope.select($scope.currentPage);
        };
        rebuild = function(stalearray, fresharray) {
          $.each(fresharray, function(index, freshitem) {
            var found;
            found = false;
            $.each(stalearray, function(index, staleitem) {
              if (freshitem.name === staleitem.name) {
                found = true;
                staleitem.id = freshitem.id;
                staleitem.name = freshitem.name;
                staleitem.ipAddress = freshitem.ipAddress;
              }
            });
            if (!found) {
              stalearray.push(freshitem);
            }
          });
          init();
        };
        return applicationsService.getApplications().then(function(applications) {
          $scope.searchKeywords = "";
          $scope.filteredItems = [];
          $scope.row = "";
          $scope.select = function(page) {
            var end, start;
            end = void 0;
            start = void 0;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
          };
          $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = "";
          };
          $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.search = function() {
            $scope.filteredItems = $filter("filter")($scope.applications, $scope.searchKeywords);
            return $scope.onFilterChange();
          };
          $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            $scope.filteredItems = $filter("orderBy")($scope.applications, rowName);
            return $scope.onOrderChange();
          };
          $scope.numPerPageOpt = [3, 5, 10, 20];
          $scope.numPerPage = $scope.numPerPageOpt[2];
          $scope.currentPage = 1;
          $scope.currentPageItems = [];
          $scope.deleteApplication = function(app) {
            return applicationsService.deleteApplication(app).then(function() {
              $scope.applications = _.without($scope.applications, app);
              return init();
            });
          };
          rebuild($scope.applications, applications);
          poller.get(Restangular.all("apps"), {
            action: "getList",
            delay: 3000
          }).promise.then(null, null, function(applications) {
            rebuild($scope.applications, applications);
          });
        });
      }
    ]).controller("RouteListCtrl", [
      "$scope", "logger", "$routeParams", "applicationsService", function($scope, logger, $routeParams, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          $scope.routes = $scope.application.routes;
          $scope.searchKeywords = "";
          $scope.filteredItems = $scope.routes;
          $scope.row = "";
          return $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            return $scope.filteredItems = $filter("orderBy")($scope.routes, rowName);
          };
        });
        return $scope.deleteRoute = function(route) {
          return applicationsService.deleteRoute($scope.application, route).then(function() {
            return $scope.routes = _.without($scope.routes, route);
          });
        };
      }
    ]).controller("ApplicationEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "applicationsService", function($scope, logger, $routeParams, $location, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          return $scope.original = angular.copy($scope.application);
        });
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.application, $scope.original);
        };
        $scope.submitForm = function() {
          if (angular.equals($scope.application, $scope.original)) {
            return $scope.cancel();
          }
          $scope.showInfoOnSubmit = true;
          return applicationsService.saveApplication($scope.application).then(function() {
            return $location.path("/applications");
          });
        };
        return $scope.cancel = function() {
          return $location.path("/applications");
        };
      }
    ]).controller("RouteEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "applicationsService", function($scope, logger, $routeParams, $location, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          $scope.route = applicationsService.getRoute($scope.application, $routeParams.routeId);
          return $scope.original = angular.copy($scope.route);
        });
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.route, $scope.original);
        };
        $scope.submitForm = function() {
          if (angular.equals($scope.route, $scope.original)) {
            return $scope.cancel();
          }
          $scope.showInfoOnSubmit = true;
          return applicationsService.saveRoute($scope.application, $scope.route).then(function() {
            return $location.path("/applications/" + $scope.application.id + "/routes");
          });
        };
        return $scope.cancel = function() {
          return $location.path("/applications/" + $scope.application.id + "/routes");
        };
      }
    ]).controller("ApplicationNewCtrl", [
      "$scope", "$rootScope", "logger", "$routeParams", "$location", "applicationsService", "endpointsService", function($scope, $rootScope, logger, $routeParams, $location, applicationsService, endpointsService) {
        $scope.application = applicationsService.newApplication();
        $scope.original = angular.copy($scope.application);
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.application, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          applicationsService.saveApplication($scope.application).then(function(application) {
            return logger.logSuccess("Application " + application.name + " has been created and exposed at " + application.ipAddress);
          });
          if ($scope.application.ipAddress.length === 0) {
            logger.logSuccess("A new public endpoint is being created.  Your application " + $scope.application.name + " with be availible in a few minutes...");
          } else {
            logger.logSuccess("Your application " + $scope.application.name + " with be availible in a few seconds.");
          }
          return $location.path("/applications");
        };
        return $scope.cancel = function() {
          return $location.path("/applications");
        };
      }
    ]).controller("RouteNewCtrl", [
      "$scope", "logger", "$routeParams", "$location", "applicationsService", function($scope, logger, $routeParams, $location, applicationsService) {
        applicationsService.getApplication($routeParams.Id).then(function(application) {
          $scope.application = application;
          $scope.route = applicationsService.newRoute();
          return $scope.original = angular.copy($scope.route);
        });
        $scope.canSubmit = function() {
          return $scope.form_constraints.$valid && !angular.equals($scope.route, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return applicationsService.saveRoute($scope.application, $scope.route).then(function() {
            return $location.path("/applications/" + $scope.application.id + "/routes");
          });
        };
        return $scope.cancel = function() {
          return $location.path("/applications/" + $scope.application.id + "/routes");
        };
      }
    ]);
  }).call(this);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.applications.services', ['restangular']).service('applicationsService', function(Restangular) {
    return {
      getApplications: function() {
        return Restangular.all('apps').getList();
      },
      getApplication: function(id) {
        return Restangular.one('apps', id).get();
      },
      getRoute: function(app, routeId) {
        var route;
        route = jQuery.grep(app.routes, function(a) {
          return a.id.toString() === routeId;
        });
        return route[0];
      },
      newApplication: function() {
        return {
          'id': 0,
          'name': '',
          'url': '',
          'authenticationRedirect': '',
          'resetPassword': '',
          'accountVerification': '',
          'ipAddress': '',
          'suppressDefaultEndpoint': 'false',
          'transportSecurity': 'false'
        };
      },
      newRoute: function() {
        return {
          'id': 0,
          'requestPattern': '',
          'passTo': '',
          'routeOrder': 0,
          'requireAuthentication': false,
          'rules': ''
        };
      },
      saveApplication: function(app) {
        if (app.id > 0) {
          return app.put();
        } else {
          return Restangular.all('apps').post(app);
        }
      },
      saveRoute: function(app, route) {
        if (!app.routes) {
          app.routes = [];
        }
        if (app.routes.indexOf(route) === -1) {
          app.routes.push(route);
        }
        return this.saveApplication(app);
      },
      deleteApplication: function(app) {
        return app.remove();
      },
      deleteRoute: function(app, route) {
        var index;
        index = app.routes.indexOf(route);
        if (index > -1) {
          app.routes.splice(index, 1);
        }
        return this.saveApplication(app);
      },
      applicationUrl: function(app) {
        if (app.name) {
          return 'http://' + this.applicationSlug(app);
        }
        return '';
      },
      applicationSlug: function(app) {
        var from, i, l, str, to;
        str = app.name.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        to = "aaaaaeeeeeiiiiooooouuuunc------";
        i = 0;
        l = 0;
        for (i=0, l=from.length ; i<l ; i++) {
              str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            };
        return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      }
    };
  });

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.endpoints.ctrls', []).controller('EndpointListCtrl', [
    '$scope', 'logger', '$filter', 'endpointsService', function($scope, logger, $filter, endpointsService) {
      var init;
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      endpointsService.getEndpoints().then(function(endpoints) {
        $scope.endpoints = endpoints;
        $scope.searchKeywords = '';
        $scope.filteredItems = [];
        $scope.row = '';
        $scope.select = function(page) {
          var end, start;
          start = (page - 1) * $scope.numPerPage;
          end = start + $scope.numPerPage;
          return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
        };
        $scope.onFilterChange = function() {
          $scope.select(1);
          $scope.currentPage = 1;
          return $scope.row = '';
        };
        $scope.onNumPerPageChange = function() {
          $scope.select(1);
          return $scope.currentPage = 1;
        };
        $scope.onOrderChange = function() {
          $scope.select(1);
          return $scope.currentPage = 1;
        };
        $scope.search = function() {
          $scope.filteredItems = $filter('filter')($scope.endpoints, $scope.searchKeywords);
          return $scope.onFilterChange();
        };
        $scope.order = function(rowName) {
          if ($scope.row === rowName) {
            return;
          }
          $scope.row = rowName;
          $scope.filteredItems = $filter('orderBy')($scope.endpoints, rowName);
          return $scope.onOrderChange();
        };
        $scope.numPerPageOpt = [3, 5, 10, 20];
        $scope.numPerPage = $scope.numPerPageOpt[2];
        $scope.currentPage = 1;
        $scope.currentPageItems = [];
        $scope.deleteEndpoint = function(app) {
          return endpointsService.deleteEndpoint(app).then(function() {
            $scope.endpoints = _.without($scope.endpoints, app);
            return init();
          });
        };
        init();
      });
    }
  ]).controller('EndpointNewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'endpointsService', function($scope, logger, $routeParams, $location, endpointsService) {
      $scope.endpoint = endpointsService.newEndpoint();
      $scope.original = angular.copy($scope.endpoint);
      $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.endpoint, $scope.original);
      };
      $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return endpointsService.saveEndpoint($scope.endpoint).then(function() {
          return $location.path('/endpoints');
        });
      };
      return $scope.cancel = function() {
        return $location.path('/endpoints');
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.endpoints.services', ['restangular']).service('endpointsService', function(Restangular) {
    return {
      getEndpoints: function() {
        return Restangular.all('endpoints').getList();
      },
      getEndpoint: function(id) {
        return Restangular.one('endpoints', id).get();
      },
      newEndpoint: function() {
        return {
          'id': 0,
          'name': '',
          'ipAddress': ''
        };
      },
      saveEndpoint: function(app) {
        if (app.id > 0) {
          return app.put();
        } else {
          return Restangular.all('apps').post(app);
        }
      },
      deleteEndpoint: function(app) {
        return app.remove();
      }
    };
  });

}).call(this);

;
(function() {
  (function() {
    "use strict";
    return angular.module("app.content.ctrls", []).controller("ContentListCtrl", [
      "$scope", "logger", "$filter", "contentsService", function($scope, logger, $filter, contentsService) {
        var init;
        init = void 0;
        init = function() {
          $scope.search();
          return $scope.select($scope.currentPage);
        };
        return contentsService.getContents().then(function(contents) {
          $scope.contents = contents;
          $scope.searchKeywords = "";
          $scope.filteredItems = [];
          $scope.row = "";
          $scope.select = function(page) {
            var end, start;
            end = void 0;
            start = void 0;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
          };
          $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = "";
          };
          $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.search = function() {
            $scope.filteredItems = $filter("filter")($scope.contents, $scope.searchKeywords);
            return $scope.onFilterChange();
          };
          $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            $scope.filteredItems = $filter("orderBy")($scope.contents, rowName);
            return $scope.onOrderChange();
          };
          $scope.numPerPageOpt = [3, 5, 10, 20];
          $scope.numPerPage = $scope.numPerPageOpt[2];
          $scope.currentPage = 1;
          $scope.currentPageItems = [];
          $scope.deleteContent = function(content) {
            return contentsService.deleteContent(content).then(function() {
              $scope.contents = _.without($scope.contents, content);
              return init();
            });
          };
          return init();
        });
      }
    ]).controller("ContentViewCtrl", [
      "$scope", "logger", "$routeParams", "$location", "directoryService", function($scope, logger, $routeParams, $location, directoryService) {
        directoryService.getItem($routeParams.Id).then(function(content) {
          return $scope.content = content;
        });
        return $scope.download = function() {
          return window.open(downloadPath, "_blank", "");
        };
      }
    ]).controller("ContentSelectCtrl", [
      "$scope", "logger", "$routeParams", "$location", "directoryService", function($scope, logger, $routeParams, $location, directoryService) {
        directoryService.getItem($routeParams.Id).then(function(content) {
          return $scope.content = content;
        });
        $scope.download = function() {
          return window.open(downloadPath, "_blank", "");
        };
        return $scope.onSelectClick = function(item) {
          parent.$.colorbox.selectedData = {
            id: item.id,
            path: item.path
          };
          return parent.$.colorbox.close();
        };
      }
    ]).controller("ContentEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "contentsService", function($scope, logger, $routeParams, $location, contentsService) {
        contentsService.getContent($routeParams.Id).then(function(content) {
          $scope.content = content;
          $scope.original = angular.copy($scope.content);
          $scope.editorSession.setValue($scope.content.body);
          if ($scope.content.contentType.indexOf("javascript") >= 0) {
            $scope.editorSession.setMode("ace/mode/javascript");
          } else if ($scope.content.contentType.indexOf("css") >= 0) {
            $scope.editorSession.setMode("ace/mode/css");
          } else {
            $scope.editorSession.setMode("ace/mode/html");
          }
          $scope.editorSession.on("change", function() {
            $scope.content.body = $scope.editorSession.getValue();
            return $scope.$apply();
          });
          return $scope.canSubmit = function() {
            return $scope.content.path && !angular.equals($scope.content, $scope.original);
          };
        });
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return contentsService.saveContent($scope.content).then(function() {
            return $location.path("/contents");
          });
        };
        $scope.cancel = function() {
          return $location.path("/contents");
        };
        return $scope.aceLoaded = function(editor) {
          var renderer, session;
          renderer = void 0;
          session = void 0;
          session = editor.getSession();
          $scope.editorSession = session;
          renderer = editor.renderer;
          editor.setHighlightActiveLine(false);
          editor.setShowPrintMargin(false);
          editor.setOptions({
            enableBasicAutocompletion: true
          });
          return editor.commands.addCommand({
            name: "saveFile",
            bindKey: {
              win: "Ctrl-S",
              mac: "Command-S",
              sender: "editor|cli"
            },
            exec: function(env, args, request) {
              $scope.showInfoOnSubmit = true;
              contentsService.saveContent($scope.content);
              $scope.original = angular.copy($scope.content);
              return $scope.$apply();
            }
          });
        };
      }
    ]).controller("ContentNewFilesCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", function($rootScope, $scope, logger, $routeParams, $location) {
        $scope.newCodeFile = function() {
          return $location.path("/contents/new");
        };
        return $scope.uploadFiles = function() {
          return $location.path("/contents/upload");
        };
      }
    ]).controller("ContentCmsHomeCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", function($rootScope, $scope, logger, $routeParams, $location) {
        $scope["new"] = function() {
          return $location.path("/cms/new");
        };
        $scope.audit = function() {
          return $location.path("/cms/audit");
        };
        $scope.list = function() {
          return $location.path("/cms/items");
        };
        $scope.types = function() {
          return $location.path("/cms/types");
        };
        $scope.workflows = function() {
          return $location.path("/cms/workflows");
        };
        $scope.queries = function() {
          return $location.path("/cms/projections");
        };
        return $scope.newLayout = function() {
          return $location.path("/contents/newlayout");
        };
      }
    ]).controller("ContentNewCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", "contentsService", function($rootScope, $scope, logger, $routeParams, $location, contentsService) {
        $scope.content = contentsService.newContent();
        if ($rootScope.currentFolder) {
          $scope.content.path = $rootScope.currentFolder + "/untitled.html";
        }
        $scope.original = angular.copy($scope.content);
        $scope.canSubmit = function() {
          return $scope.content.path && !angular.equals($scope.content, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return contentsService.saveContent($scope.content).then(function() {
            return $location.path("/contents");
          });
        };
        $scope.cancel = function() {
          return $location.path("/contents");
        };
        return $scope.aceLoaded = function(editor) {
          var renderer, session;
          renderer = void 0;
          session = void 0;
          session = editor.getSession();
          $scope.editorSession = session;
          renderer = editor.renderer;
          editor.setHighlightActiveLine(false);
          editor.setShowPrintMargin(false);
          editor.setOptions({
            enableBasicAutocompletion: true
          });
          $scope.editorSession.setMode("ace/mode/html");
          $scope.editorSession.on("change", function() {
            $scope.content.body = $scope.editorSession.getValue();
            return $scope.$apply();
          });
          return editor.commands.addCommand({
            name: "saveFile",
            bindKey: {
              win: "Ctrl-S",
              mac: "Command-S",
              sender: "editor|cli"
            },
            exec: function(env, args, request) {
              $scope.showInfoOnSubmit = true;
              contentsService.saveContent($scope.content);
              $scope.original = angular.copy($scope.content);
              return $scope.$apply();
            }
          });
        };
      }
    ]).controller("ContentUploadCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", "$upload", function($rootScope, $scope, logger, $routeParams, $location, $upload) {
        $scope.uploadprogress = 0;
        $scope.onFileSelect = function($files) {
          var file, _i, _len, _results;
          file = void 0;
          _i = void 0;
          _len = void 0;
          _results = void 0;
          _results = [];
          _i = 0;
          _len = $files.length;
          while (_i < _len) {
            file = $files[_i];
            _results.push($scope.upload = $upload.upload({
              url: "/api/files",
              method: "POST",
              data: {
                basepath: $rootScope.currentFolder
              },
              file: file
            }).progress(function(evt) {
              $scope.uploadprogress = parseInt(100.0 * evt.loaded / evt.total);
              return console.log("percent: " + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
              return logger.logSuccess("File Uploaded");
            }));
            _i++;
          }
          return _results;
        };
        return $scope.cancel = function() {
          return $location.path("/files");
        };
      }
    ]);
  }).call(this);

}).call(this);

;
(function() {
  (function() {
    "use strict";
    return angular.module("app.content.ctrls", []).controller("ContentListCtrl", [
      "$scope", "logger", "$filter", "contentsService", function($scope, logger, $filter, contentsService) {
        var init;
        init = void 0;
        init = function() {
          $scope.search();
          return $scope.select($scope.currentPage);
        };
        return contentsService.getContents().then(function(contents) {
          $scope.contents = contents;
          $scope.searchKeywords = "";
          $scope.filteredItems = [];
          $scope.row = "";
          $scope.select = function(page) {
            var end, start;
            end = void 0;
            start = void 0;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
          };
          $scope.onFilterChange = function() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = "";
          };
          $scope.onNumPerPageChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.onOrderChange = function() {
            $scope.select(1);
            return $scope.currentPage = 1;
          };
          $scope.search = function() {
            $scope.filteredItems = $filter("filter")($scope.contents, $scope.searchKeywords);
            return $scope.onFilterChange();
          };
          $scope.order = function(rowName) {
            if ($scope.row === rowName) {
              return;
            }
            $scope.row = rowName;
            $scope.filteredItems = $filter("orderBy")($scope.contents, rowName);
            return $scope.onOrderChange();
          };
          $scope.numPerPageOpt = [3, 5, 10, 20];
          $scope.numPerPage = $scope.numPerPageOpt[2];
          $scope.currentPage = 1;
          $scope.currentPageItems = [];
          $scope.deleteContent = function(content) {
            return contentsService.deleteContent(content).then(function() {
              $scope.contents = _.without($scope.contents, content);
              return init();
            });
          };
          return init();
        });
      }
    ]).controller("ContentViewCtrl", [
      "$scope", "logger", "$routeParams", "$location", "directoryService", function($scope, logger, $routeParams, $location, directoryService) {
        directoryService.getItem($routeParams.Id).then(function(content) {
          return $scope.content = content;
        });
        return $scope.download = function() {
          return window.open(downloadPath, "_blank", "");
        };
      }
    ]).controller("ContentSelectCtrl", [
      "$scope", "logger", "$routeParams", "$location", "directoryService", function($scope, logger, $routeParams, $location, directoryService) {
        directoryService.getItem($routeParams.Id).then(function(content) {
          return $scope.content = content;
        });
        $scope.download = function() {
          return window.open(downloadPath, "_blank", "");
        };
        return $scope.onSelectClick = function(item) {
          parent.$.colorbox.selectedData = {
            id: item.id,
            path: item.path
          };
          return parent.$.colorbox.close();
        };
      }
    ]).controller("ContentEditCtrl", [
      "$scope", "logger", "$routeParams", "$location", "contentsService", function($scope, logger, $routeParams, $location, contentsService) {
        contentsService.getContent($routeParams.Id).then(function(content) {
          $scope.content = content;
          $scope.original = angular.copy($scope.content);
          $scope.editorSession.setValue($scope.content.body);
          if ($scope.content.contentType.indexOf("javascript") >= 0) {
            $scope.editorSession.setMode("ace/mode/javascript");
          } else if ($scope.content.contentType.indexOf("css") >= 0) {
            $scope.editorSession.setMode("ace/mode/css");
          } else {
            $scope.editorSession.setMode("ace/mode/html");
          }
          $scope.editorSession.on("change", function() {
            $scope.content.body = $scope.editorSession.getValue();
            return $scope.$apply();
          });
          return $scope.canSubmit = function() {
            return $scope.content.path && !angular.equals($scope.content, $scope.original);
          };
        });
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return contentsService.saveContent($scope.content).then(function() {
            return $location.path("/contents");
          });
        };
        $scope.cancel = function() {
          return $location.path("/contents");
        };
        return $scope.aceLoaded = function(editor) {
          var renderer, session;
          renderer = void 0;
          session = void 0;
          session = editor.getSession();
          $scope.editorSession = session;
          renderer = editor.renderer;
          editor.setHighlightActiveLine(false);
          editor.setShowPrintMargin(false);
          editor.setOptions({
            enableBasicAutocompletion: true
          });
          return editor.commands.addCommand({
            name: "saveFile",
            bindKey: {
              win: "Ctrl-S",
              mac: "Command-S",
              sender: "editor|cli"
            },
            exec: function(env, args, request) {
              $scope.showInfoOnSubmit = true;
              contentsService.saveContent($scope.content);
              $scope.original = angular.copy($scope.content);
              return $scope.$apply();
            }
          });
        };
      }
    ]).controller("ContentNewFilesCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", function($rootScope, $scope, logger, $routeParams, $location) {
        $scope.newCodeFile = function() {
          return $location.path("/contents/new");
        };
        return $scope.uploadFiles = function() {
          return $location.path("/contents/upload");
        };
      }
    ]).controller("ContentCmsHomeCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", function($rootScope, $scope, logger, $routeParams, $location) {
        $scope["new"] = function() {
          return $location.path("/cms/new");
        };
        $scope.audit = function() {
          return $location.path("/cms/audit");
        };
        $scope.list = function() {
          return $location.path("/cms/items");
        };
        $scope.types = function() {
          return $location.path("/cms/types");
        };
        $scope.workflows = function() {
          return $location.path("/cms/workflows");
        };
        $scope.queries = function() {
          return $location.path("/cms/projections");
        };
        return $scope.newLayout = function() {
          return $location.path("/contents/newlayout");
        };
      }
    ]).controller("ContentNewCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", "contentsService", function($rootScope, $scope, logger, $routeParams, $location, contentsService) {
        $scope.content = contentsService.newContent();
        if ($rootScope.currentFolder) {
          $scope.content.path = $rootScope.currentFolder + "/untitled.html";
        }
        $scope.original = angular.copy($scope.content);
        $scope.canSubmit = function() {
          return $scope.content.path && !angular.equals($scope.content, $scope.original);
        };
        $scope.submitForm = function() {
          $scope.showInfoOnSubmit = true;
          return contentsService.saveContent($scope.content).then(function() {
            return $location.path("/contents");
          });
        };
        $scope.cancel = function() {
          return $location.path("/contents");
        };
        return $scope.aceLoaded = function(editor) {
          var renderer, session;
          renderer = void 0;
          session = void 0;
          session = editor.getSession();
          $scope.editorSession = session;
          renderer = editor.renderer;
          editor.setHighlightActiveLine(false);
          editor.setShowPrintMargin(false);
          editor.setOptions({
            enableBasicAutocompletion: true
          });
          $scope.editorSession.setMode("ace/mode/html");
          $scope.editorSession.on("change", function() {
            $scope.content.body = $scope.editorSession.getValue();
            return $scope.$apply();
          });
          return editor.commands.addCommand({
            name: "saveFile",
            bindKey: {
              win: "Ctrl-S",
              mac: "Command-S",
              sender: "editor|cli"
            },
            exec: function(env, args, request) {
              $scope.showInfoOnSubmit = true;
              contentsService.saveContent($scope.content);
              $scope.original = angular.copy($scope.content);
              return $scope.$apply();
            }
          });
        };
      }
    ]).controller("ContentUploadCtrl", [
      "$rootScope", "$scope", "logger", "$routeParams", "$location", "$upload", function($rootScope, $scope, logger, $routeParams, $location, $upload) {
        $scope.uploadprogress = 0;
        $scope.onFileSelect = function($files) {
          var file, _i, _len, _results;
          file = void 0;
          _i = void 0;
          _len = void 0;
          _results = void 0;
          _results = [];
          _i = 0;
          _len = $files.length;
          while (_i < _len) {
            file = $files[_i];
            _results.push($scope.upload = $upload.upload({
              url: "/api/files",
              method: "POST",
              data: {
                basepath: $rootScope.currentFolder
              },
              file: file
            }).progress(function(evt) {
              $scope.uploadprogress = parseInt(100.0 * evt.loaded / evt.total);
              return console.log("percent: " + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
              return logger.logSuccess("File Uploaded");
            }));
            _i++;
          }
          return _results;
        };
        return $scope.cancel = function() {
          return $location.path("/files");
        };
      }
    ]);
  }).call(this);

}).call(this);

//# sourceMappingURL=ContentCtrl.js.map

;
(function() {
  'use strict';
  angular.module('app.content.services', ['restangular']).service('contentsService', function(Restangular) {
    var contents;
    contents = {};
    return {
      getContents: function() {
        return Restangular.all('documents').getList();
      },
      getContent: function(id) {
        return Restangular.one('documents', id).get();
      },
      newContent: function() {
        return {
          'id': '',
          'path': '',
          'contentType': '',
          'body': ''
        };
      },
      saveContent: function(content) {
        if (content.id > 0) {
          return content.put();
        } else {
          return Restangular.all('documents').post(content);
        }
      },
      deleteContent: function(content) {
        return content.remove();
      }
    };
  });

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.users.ctrls', []).controller('UserListCtrl', [
    '$scope', 'logger', '$filter', 'usersService', function($scope, logger, $filter, usersService) {
      var init;
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      usersService.getUsers().then(function(users) {
        $scope.users = users;
        $scope.searchKeywords = '';
        $scope.filteredItems = [];
        $scope.row = '';
        $scope.select = function(page) {
          var end, start;
          start = (page - 1) * $scope.numPerPage;
          end = start + $scope.numPerPage;
          return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
        };
        $scope.onFilterChange = function() {
          $scope.select(1);
          $scope.currentPage = 1;
          return $scope.row = '';
        };
        $scope.onNumPerPageChange = function() {
          $scope.select(1);
          return $scope.currentPage = 1;
        };
        $scope.onOrderChange = function() {
          $scope.select(1);
          return $scope.currentPage = 1;
        };
        $scope.search = function() {
          $scope.filteredItems = $filter('filter')($scope.users, $scope.searchKeywords);
          return $scope.onFilterChange();
        };
        $scope.order = function(rowName) {
          if ($scope.row === rowName) {
            return;
          }
          $scope.row = rowName;
          $scope.filteredItems = $filter('orderBy')($scope.users, rowName);
          return $scope.onOrderChange();
        };
        $scope.numPerPageOpt = [3, 5, 10, 20];
        $scope.numPerPage = $scope.numPerPageOpt[2];
        $scope.currentPage = 1;
        $scope.currentPageItems = [];
        $scope.deleteUser = function(user) {
          return usersService.deleteUser(user).then(function() {
            $scope.users = _.without($scope.users, user);
            return init();
          });
        };
        init();
      });
    }
  ]).controller('UserEditCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'applicationsService', function($scope, logger, $routeParams, $location, usersService, applicationsService) {
      usersService.getUser($routeParams.Id).then(function(user) {
        $scope.user = user;
        return $scope.original = angular.copy($scope.user);
      });
      $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.user, $scope.original);
      };
      $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return usersService.saveUser($scope.user).then(function() {
          return $location.path('/users');
        });
      };
      applicationsService.getApplications().then(function(applications) {
        return $scope.applications = applications;
      });
      $scope.toggleApplicationSelection = function(name) {
        var idx;
        idx = $scope.user.applications.indexOf(name);
        if (idx > -1) {
          return $scope.user.applications.splice(idx, 1);
        } else {
          return $scope.user.applications.push(name);
        }
      };
      return $scope.cancel = function() {
        return $location.path('/users');
      };
    }
  ]).controller('UserNewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'applicationsService', function($scope, logger, $routeParams, $location, usersService, applicationsService) {
      var original;
      $scope.user = usersService.newUser();
      original = angular.copy($scope.user);
      $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.user, original);
      };
      $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return usersService.saveUser($scope.user).then(function() {
          return $location.path('/users');
        });
      };
      applicationsService.getApplications().then(function(applications) {
        return $scope.applications = applications;
      });
      $scope.toggleApplicationSelection = function(name) {
        var idx;
        idx = $scope.user.applications.indexOf(name);
        if (idx > -1) {
          return $scope.user.applications.splice(idx, 1);
        } else {
          return $scope.user.applications.push(name);
        }
      };
      return $scope.cancel = function() {
        return $location.path('/users');
      };
    }
  ]).controller('UserViewCtrl', [
    '$scope', 'logger', '$routeParams', '$location', 'usersService', 'currentUserService', function($scope, logger, $routeParams, $location, usersService, currentUserService) {
      return $scope.user = usersService.getUser(currentUserService.user().id);
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.users.services', ['restangular']).service('usersService', function(Restangular) {
    return {
      getUsers: function() {
        return Restangular.all('users').getList();
      },
      getUser: function(id) {
        return Restangular.one('users', id).get();
      },
      newUser: function() {
        return {
          'id': 0,
          'userName': '',
          'email': '',
          'password': '',
          'isAccountAdmin': false,
          'applications': []
        };
      },
      saveUser: function(user) {
        if (user.id > 0) {
          return user.put();
        } else {
          return Restangular.all('users').post(user);
        }
      },
      deleteUser: function(user) {
        return user.remove();
      }
    };
  });

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.ui.ctrls', []).controller('NotifyCtrl', [
    '$scope', 'logger', function($scope, logger) {
      return $scope.notify = function(type) {
        switch (type) {
          case 'info':
            return logger.log("Heads up! This alert needs your attention, but it's not super important.");
          case 'success':
            return logger.logSuccess("Well done! You successfully read this important alert message.");
          case 'warning':
            return logger.logWarning("Warning! Best check yo self, you're not looking too good.");
          case 'error':
            return logger.logError("Oh snap! Change a few things up and try submitting again.");
        }
      };
    }
  ]).controller('AlertDemoCtrl', [
    '$scope', function($scope) {
      $scope.alerts = [
        {
          type: 'success',
          msg: 'Well done! You successfully read this important alert message.'
        }, {
          type: 'info',
          msg: 'Heads up! This alert needs your attention, but it is not super important.'
        }, {
          type: 'warning',
          msg: "Warning! Best check yo self, you're not looking too good."
        }, {
          type: 'danger',
          msg: 'Oh snap! Change a few things up and try submitting again.'
        }
      ];
      $scope.addAlert = function() {
        var num, type;
        num = Math.ceil(Math.random() * 4);
        type = void 0;
        switch (num) {
          case 0:
            type = 'info';
            break;
          case 1:
            type = 'success';
            break;
          case 2:
            type = 'info';
            break;
          case 3:
            type = 'warning';
            break;
          case 4:
            type = 'danger';
        }
        return $scope.alerts.push({
          type: type,
          msg: "Another alert!"
        });
      };
      return $scope.closeAlert = function(index) {
        return $scope.alerts.splice(index, 1);
      };
    }
  ]).controller('ProgressDemoCtrl', [
    '$scope', function($scope) {
      $scope.max = 200;
      $scope.random = function() {
        var type, value;
        value = Math.floor((Math.random() * 100) + 10);
        type = void 0;
        if (value < 25) {
          type = "success";
        } else if (value < 50) {
          type = "info";
        } else if (value < 75) {
          type = "warning";
        } else {
          type = "danger";
        }
        $scope.showWarning = type === "danger" || type === "warning";
        $scope.dynamic = value;
        $scope.type = type;
      };
      return $scope.random();
    }
  ]).controller('AccordionDemoCtrl', [
    '$scope', function($scope) {
      $scope.oneAtATime = true;
      $scope.groups = [
        {
          title: "Dynamic Group Header - 1",
          content: "Dynamic Group Body - 1"
        }, {
          title: "Dynamic Group Header - 2",
          content: "Dynamic Group Body - 2"
        }, {
          title: "Dynamic Group Header - 3",
          content: "Dynamic Group Body - 3"
        }
      ];
      $scope.items = ["Item 1", "Item 2", "Item 3"];
      $scope.addItem = function() {
        var newItemNo;
        newItemNo = $scope.items.length + 1;
        $scope.items.push("Item " + newItemNo);
      };
    }
  ]).controller('CollapseDemoCtrl', [
    '$scope', function($scope) {
      return $scope.isCollapsed = false;
    }
  ]).controller('ModalDemoCtrl', [
    '$scope', '$modal', '$log', function($scope, $modal, $log) {
      $scope.items = ["item1", "item2", "item3"];
      $scope.open = function() {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: "myModalContent.html",
          controller: 'ModalInstanceCtrl',
          resolve: {
            items: function() {
              return $scope.items;
            }
          }
        });
        modalInstance.result.then((function(selectedItem) {
          $scope.selected = selectedItem;
        }), function() {
          $log.info("Modal dismissed at: " + new Date());
        });
      };
    }
  ]).controller('ModalInstanceCtrl', [
    '$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };
      $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
      };
      $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
      };
    }
  ]).controller('PaginationDemoCtrl', [
    '$scope', function($scope) {
      $scope.totalItems = 64;
      $scope.currentPage = 4;
      $scope.maxSize = 5;
      $scope.setPage = function(pageNo) {
        return $scope.currentPage = pageNo;
      };
      $scope.bigTotalItems = 175;
      return $scope.bigCurrentPage = 1;
    }
  ]).controller('TabsDemoCtrl', [
    '$scope', function($scope) {
      $scope.tabs = [
        {
          title: "Dynamic Title 1",
          content: "Dynamic content 1.  Consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at."
        }, {
          title: "Disabled",
          content: "Dynamic content 2.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at.",
          disabled: true
        }
      ];
      return $scope.navType = "pills";
    }
  ]).controller('TreeDemoCtrl', [
    '$scope', function($scope) {
      $scope.list = [
        {
          id: 1,
          title: "Item 1",
          items: []
        }, {
          id: 2,
          title: "Item 2",
          items: [
            {
              id: 21,
              title: "Item 2.1",
              items: [
                {
                  id: 211,
                  title: "Item 2.1.1",
                  items: []
                }, {
                  id: 212,
                  title: "Item 2.1.2",
                  items: []
                }
              ]
            }, {
              id: 22,
              title: "Item 2.2",
              items: [
                {
                  id: 221,
                  title: "Item 2.2.1",
                  items: []
                }, {
                  id: 222,
                  title: "Item 2.2.2",
                  items: []
                }
              ]
            }
          ]
        }, {
          id: 3,
          title: "Item 3",
          items: []
        }, {
          id: 4,
          title: "Item 4",
          items: [
            {
              id: 41,
              title: "Item 4.1",
              items: []
            }
          ]
        }, {
          id: 5,
          title: "Item 5",
          items: []
        }, {
          id: 6,
          title: "Item 6",
          items: []
        }, {
          id: 7,
          title: "Item 7",
          items: []
        }
      ];
      $scope.selectedItem = {};
      $scope.options = {};
      $scope.remove = function(scope) {
        scope.remove();
      };
      $scope.toggle = function(scope) {
        scope.toggle();
      };
      return $scope.newSubItem = function(scope) {
        var nodeData;
        nodeData = scope.$modelValue;
        nodeData.items.push({
          id: nodeData.id * 10 + nodeData.items.length,
          title: nodeData.title + "." + (nodeData.items.length + 1),
          items: []
        });
      };
    }
  ]).controller('MapDemoCtrl', [
    '$scope', '$http', '$interval', function($scope, $http, $interval) {
      var i, markers;
      markers = [];
      i = 0;
      while (i < 8) {
        markers[i] = new google.maps.Marker({
          title: "Marker: " + i
        });
        i++;
      }
      $scope.GenerateMapMarkers = function() {
        var d, lat, lng, loc, numMarkers;
        d = new Date();
        $scope.date = d.toLocaleString();
        numMarkers = Math.floor(Math.random() * 4) + 4;
        i = 0;
        while (i < numMarkers) {
          lat = 43.6600000 + (Math.random() / 100);
          lng = -79.4103000 + (Math.random() / 100);
          loc = new google.maps.LatLng(lat, lng);
          markers[i].setPosition(loc);
          markers[i].setMap($scope.map);
          i++;
        }
      };
      $interval($scope.GenerateMapMarkers, 2000);
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.ui.directives', []).directive('uiTime', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele) {
          var checkTime, startTime;
          startTime = function() {
            var h, m, s, t, time, today;
            today = new Date();
            h = today.getHours();
            m = today.getMinutes();
            s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            time = h + ":" + m + ":" + s;
            ele.html(time);
            return t = setTimeout(startTime, 500);
          };
          checkTime = function(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          };
          return startTime();
        }
      };
    }
  ]).directive('uiWeather', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var color, icon, skycons;
          color = attrs.color;
          icon = Skycons[attrs.icon];
          skycons = new Skycons({
            "color": color,
            "resizeClear": true
          });
          skycons.add(ele[0], icon);
          return skycons.play();
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.ui.services', []).factory('logger', [
    function() {
      var logIt;
      logIt = function(message, type) {
        return toastr[type](message);
      };
      return {
        log: function(message) {
          logIt(message, 'info');
        },
        logWarning: function(message) {
          logIt(message, 'warning');
        },
        logSuccess: function(message) {
          logIt(message, 'success');
        },
        logError: function(message) {
          logIt(message, 'error');
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  angular.module('app.ui.form.directives', []).directive('uiRangeSlider', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele) {
          return ele.slider();
        }
      };
    }
  ]).directive('uiFileUpload', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele) {
          return ele.bootstrapFileInput();
        }
      };
    }
  ]).directive('uiSpinner', [
    function() {
      return {
        restrict: 'A',
        compile: function(ele, attrs) {
          ele.addClass('ui-spinner');
          return {
            post: function() {
              return ele.spinner();
            }
          };
        }
      };
    }
  ]).directive('uiWizardForm', [
    function() {
      return {
        link: function(scope, ele) {
          return ele.steps();
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.ui.form.ctrls', []).controller('TagsDemoCtrl', [
    '$scope', function($scope) {
      return $scope.tags = ['foo', 'bar'];
    }
  ]).controller('DatepickerDemoCtrl', [
    '$scope', function($scope) {
      $scope.today = function() {
        return $scope.dt = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function() {
        return $scope.showWeeks = !$scope.showWeeks;
      };
      $scope.clear = function() {
        return $scope.dt = null;
      };
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };
      $scope.toggleMin = function() {
        var _ref;
        return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
          "null": new Date()
        };
      };
      $scope.toggleMin();
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return $scope.opened = true;
      };
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      return $scope.format = $scope.formats[0];
    }
  ]).controller('TimepickerDemoCtrl', [
    '$scope', function($scope) {
      $scope.mytime = new Date();
      $scope.hstep = 1;
      $scope.mstep = 15;
      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };
      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        return $scope.ismeridian = !$scope.ismeridian;
      };
      $scope.update = function() {
        var d;
        d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        return $scope.mytime = d;
      };
      $scope.changed = function() {
        return console.log('Time changed to: ' + $scope.mytime);
      };
      return $scope.clear = function() {
        return $scope.mytime = null;
      };
    }
  ]).controller('TypeaheadCtrl', [
    '$scope', function($scope) {
      $scope.selected = void 0;
      return $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    }
  ]).controller('RatingDemoCtrl', [
    '$scope', function($scope) {
      $scope.rate = 7;
      $scope.max = 10;
      $scope.isReadonly = false;
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        return $scope.percent = 100 * (value / $scope.max);
      };
      return $scope.ratingStates = [
        {
          stateOn: 'glyphicon-ok-sign',
          stateOff: 'glyphicon-ok-circle'
        }, {
          stateOn: 'glyphicon-star',
          stateOff: 'glyphicon-star-empty'
        }, {
          stateOn: 'glyphicon-heart',
          stateOff: 'glyphicon-ban-circle'
        }, {
          stateOn: 'glyphicon-heart'
        }, {
          stateOff: 'glyphicon-off'
        }
      ];
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.form.validation', []).controller('wizardFormCtrl', [
    '$scope', function($scope) {
      $scope.wizard = {
        firstName: 'some name',
        lastName: '',
        email: '',
        password: '',
        age: '',
        address: ''
      };
      $scope.isValidateStep1 = function() {
        console.log($scope.wizard_step1);
        console.log($scope.wizard.firstName !== '');
        console.log($scope.wizard.lastName === '');
        return console.log($scope.wizard.firstName !== '' && $scope.wizard.lastName !== '');
      };
      return $scope.finishedWizard = function() {
        return console.log('yoo');
      };
    }
  ]).controller('formConstraintsCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.form = {
        required: '',
        minlength: '',
        maxlength: '',
        length_rage: '',
        type_something: '',
        confirm_type: '',
        foo: '',
        email: '',
        url: '',
        num: '',
        minVal: '',
        maxVal: '',
        valRange: '',
        pattern: ''
      };
      original = angular.copy($scope.form);
      $scope.revert = function() {
        $scope.form = angular.copy(original);
        return $scope.form_constraints.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.form, original) || !$scope.form_constraints.$pristine;
      };
      return $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.form, original);
      };
    }
  ]).controller('signinCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.user = {
        email: '',
        password: ''
      };
      $scope.showInfoOnSubmit = false;
      original = angular.copy($scope.user);
      $scope.revert = function() {
        $scope.user = angular.copy(original);
        return $scope.form_signin.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.user, original) || !$scope.form_signin.$pristine;
      };
      $scope.canSubmit = function() {
        return $scope.form_signin.$valid && !angular.equals($scope.user, original);
      };
      return $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return $scope.revert();
      };
    }
  ]).controller('signupCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: ''
      };
      $scope.showInfoOnSubmit = false;
      original = angular.copy($scope.user);
      $scope.revert = function() {
        $scope.user = angular.copy(original);
        $scope.form_signup.$setPristine();
        return $scope.form_signup.confirmPassword.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.user, original) || !$scope.form_signup.$pristine;
      };
      $scope.canSubmit = function() {
        return $scope.form_signup.$valid && !angular.equals($scope.user, original);
      };
      return $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return $scope.revert();
      };
    }
  ]).directive('validateEquals', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModelCtrl) {
          var validateEqual;
          validateEqual = function(value) {
            var valid;
            valid = value === scope.$eval(attrs.validateEquals);
            ngModelCtrl.$setValidity('equal', valid);
            return typeof valid === "function" ? valid({
              value: void 0
            }) : void 0;
          };
          ngModelCtrl.$parsers.push(validateEqual);
          ngModelCtrl.$formatters.push(validateEqual);
          return scope.$watch(attrs.validateEquals, function(newValue, oldValue) {
            if (newValue !== oldValue) {
              return ngModelCtrl.$setViewValue(ngModelCtrl.$ViewValue);
            }
          });
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.tables', []).controller('tableCtrl', [
    '$scope', '$filter', function($scope, $filter) {
      var init;
      $scope.stores = [
        {
          name: 'Nijiya Market',
          price: '$$',
          sales: 292,
          rating: 4.0
        }, {
          name: 'Eat On Monday Truck',
          price: '$',
          sales: 119,
          rating: 4.3
        }, {
          name: 'Tea Era',
          price: '$',
          sales: 874,
          rating: 4.0
        }, {
          name: 'Rogers Deli',
          price: '$',
          sales: 347,
          rating: 4.2
        }, {
          name: 'MoBowl',
          price: '$$$',
          sales: 24,
          rating: 4.6
        }, {
          name: 'The Milk Pail Market',
          price: '$',
          sales: 543,
          rating: 4.5
        }, {
          name: 'Nob Hill Foods',
          price: '$$',
          sales: 874,
          rating: 4.0
        }, {
          name: 'Scratch',
          price: '$$$',
          sales: 643,
          rating: 3.6
        }, {
          name: 'Gochi Japanese Fusion Tapas',
          price: '$$$',
          sales: 56,
          rating: 4.1
        }, {
          name: 'Cost Plus World Market',
          price: '$$',
          sales: 79,
          rating: 4.0
        }, {
          name: 'Bumble Bee Health Foods',
          price: '$$',
          sales: 43,
          rating: 4.3
        }, {
          name: 'Costco',
          price: '$$',
          sales: 219,
          rating: 3.6
        }, {
          name: 'Red Rock Coffee Co',
          price: '$',
          sales: 765,
          rating: 4.1
        }, {
          name: '99 Ranch Market',
          price: '$',
          sales: 181,
          rating: 3.4
        }, {
          name: 'Mi Pueblo Food Center',
          price: '$',
          sales: 78,
          rating: 4.0
        }, {
          name: 'Cucina Venti',
          price: '$$',
          sales: 163,
          rating: 3.3
        }, {
          name: 'Sufi Coffee Shop',
          price: '$',
          sales: 113,
          rating: 3.3
        }, {
          name: 'Dana Street Roasting',
          price: '$',
          sales: 316,
          rating: 4.1
        }, {
          name: 'Pearl Cafe',
          price: '$',
          sales: 173,
          rating: 3.4
        }, {
          name: 'Posh Bagel',
          price: '$',
          sales: 140,
          rating: 4.0
        }, {
          name: 'Artisan Wine Depot',
          price: '$$',
          sales: 26,
          rating: 4.1
        }, {
          name: 'Hong Kong Chinese Bakery',
          price: '$',
          sales: 182,
          rating: 3.4
        }, {
          name: 'Starbucks',
          price: '$$',
          sales: 97,
          rating: 3.7
        }, {
          name: 'Tapioca Express',
          price: '$',
          sales: 301,
          rating: 3.0
        }, {
          name: 'House of Bagels',
          price: '$',
          sales: 82,
          rating: 4.4
        }
      ];
      $scope.searchKeywords = '';
      $scope.filteredStores = [];
      $scope.row = '';
      $scope.select = function(page) {
        var end, start;
        start = (page - 1) * $scope.numPerPage;
        end = start + $scope.numPerPage;
        return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
      };
      $scope.onFilterChange = function() {
        $scope.select(1);
        $scope.currentPage = 1;
        return $scope.row = '';
      };
      $scope.onNumPerPageChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.onOrderChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.search = function() {
        $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords);
        return $scope.onFilterChange();
      };
      $scope.order = function(rowName) {
        if ($scope.row === rowName) {
          return;
        }
        $scope.row = rowName;
        $scope.filteredStores = $filter('orderBy')($scope.stores, rowName);
        return $scope.onOrderChange();
      };
      $scope.numPerPageOpt = [3, 5, 10, 20];
      $scope.numPerPage = $scope.numPerPageOpt[2];
      $scope.currentPage = 1;
      $scope.currentPageStores = [];
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      return init();
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.task', []).factory('taskStorage', function() {
    var DEMO_TASKS, STORAGE_ID;
    STORAGE_ID = 'tasks';
    DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Make a call", "completed": true}, {"title": "Build a snowman!", "completed": false}, {"title": "Tango! Tango! Tango!", "completed": false}, {"title": "Play games with friends", "completed": false}, {"title": "Shopping", "completed": false} ]';
    return {
      get: function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS);
      },
      put: function(tasks) {
        return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
      }
    };
  }).directive('taskFocus', [
    '$timeout', function($timeout) {
      return {
        link: function(scope, ele, attrs) {
          return scope.$watch(attrs.taskFocus, function(newVal) {
            if (newVal) {
              return $timeout(function() {
                return ele[0].focus();
              }, 0, false);
            }
          });
        }
      };
    }
  ]).controller('taskCtrl', [
    '$scope', 'taskStorage', 'filterFilter', '$rootScope', 'logger', function($scope, taskStorage, filterFilter, $rootScope, logger) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.newTask = '';
      $scope.remainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      $scope.editedTask = null;
      $scope.statusFilter = {
        completed: false
      };
      $scope.filter = function(filter) {
        switch (filter) {
          case 'all':
            return $scope.statusFilter = '';
          case 'active':
            return $scope.statusFilter = {
              completed: false
            };
          case 'completed':
            return $scope.statusFilter = {
              completed: true
            };
        }
      };
      $scope.add = function() {
        var newTask;
        newTask = $scope.newTask.trim();
        if (newTask.length === 0) {
          return;
        }
        tasks.push({
          title: newTask,
          completed: false
        });
        logger.logSuccess('New task: "' + newTask + '" added');
        taskStorage.put(tasks);
        $scope.newTask = '';
        return $scope.remainingCount++;
      };
      $scope.edit = function(task) {
        return $scope.editedTask = task;
      };
      $scope.doneEditing = function(task) {
        $scope.editedTask = null;
        task.title = task.title.trim();
        if (!task.title) {
          $scope.remove(task);
        } else {
          logger.log('Task updated');
        }
        return taskStorage.put(tasks);
      };
      $scope.remove = function(task) {
        var index;
        $scope.remainingCount -= task.completed ? 0 : 1;
        index = $scope.tasks.indexOf(task);
        $scope.tasks.splice(index, 1);
        taskStorage.put(tasks);
        return logger.logError('Task removed');
      };
      $scope.completed = function(task) {
        $scope.remainingCount += task.completed ? -1 : 1;
        taskStorage.put(tasks);
        if (task.completed) {
          if ($scope.remainingCount > 0) {
            if ($scope.remainingCount === 1) {
              return logger.log('Almost there! Only ' + $scope.remainingCount + ' task left');
            } else {
              return logger.log('Good job! Only ' + $scope.remainingCount + ' tasks left');
            }
          } else {
            return logger.logSuccess('Congrats! All done :)');
          }
        }
      };
      $scope.clearCompleted = function() {
        $scope.tasks = tasks = tasks.filter(function(val) {
          return !val.completed;
        });
        return taskStorage.put(tasks);
      };
      $scope.markAll = function(completed) {
        tasks.forEach(function(task) {
          return task.completed = completed;
        });
        $scope.remainingCount = completed ? 0 : tasks.length;
        taskStorage.put(tasks);
        if (completed) {
          return logger.logSuccess('Congrats! All done :)');
        }
      };
      $scope.$watch('remainingCount == 0', function(val) {
        return $scope.allChecked = val;
      });
      return $scope.$watch('remainingCount', function(newVal, oldVal) {
        return $rootScope.$broadcast('taskRemaining:changed', newVal);
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.chart.ctrls', []).controller('chartCtrl', [
    '$scope', function($scope) {
      $scope.easypiechart = {
        percent: 65,
        options: {
          animate: {
            duration: 1000,
            enabled: true
          },
          barColor: '#31C0BE',
          lineCap: 'round',
          size: 180,
          lineWidth: 5
        }
      };
      $scope.easypiechart2 = {
        percent: 35,
        options: {
          animate: {
            duration: 1000,
            enabled: true
          },
          barColor: '#66B5D7',
          lineCap: 'round',
          size: 180,
          lineWidth: 10
        }
      };
      $scope.easypiechart3 = {
        percent: 68,
        options: {
          animate: {
            duration: 1000,
            enabled: true
          },
          barColor: '#60CD9B',
          lineCap: 'square',
          size: 180,
          lineWidth: 20,
          scaleLength: 0
        }
      };
      $scope.gaugeChart1 = {
        data: {
          maxValue: 3000,
          animationSpeed: 40,
          val: 1375
        },
        options: {
          lines: 12,
          angle: 0,
          lineWidth: 0.47,
          pointer: {
            length: 0.6,
            strokeWidth: 0.03,
            color: '#000000'
          },
          limitMax: 'false',
          colorStart: '#A3C86D',
          colorStop: '#A3C86D',
          strokeColor: '#E0E0E0',
          generateGradient: true,
          percentColors: [[0.0, '#60CD9B'], [1.0, '#60CD9B']]
        }
      };
      $scope.gaugeChart2 = {
        data: {
          maxValue: 3000,
          animationSpeed: 45,
          val: 1200
        },
        options: {
          lines: 12,
          angle: 0,
          lineWidth: 0.47,
          pointer: {
            length: 0.6,
            strokeWidth: 0.03,
            color: '#464646'
          },
          limitMax: 'true',
          colorStart: '#7ACBEE',
          colorStop: '#7ACBEE',
          strokeColor: '#F1F1F1',
          generateGradient: true,
          percentColors: [[0.0, '#66B5D7'], [1.0, '#66B5D7']]
        }
      };
      return $scope.gaugeChart3 = {
        data: {
          maxValue: 3000,
          animationSpeed: 50,
          val: 1100
        },
        options: {
          lines: 12,
          angle: 0,
          lineWidth: 0.47,
          pointer: {
            length: 0.6,
            strokeWidth: 0.03,
            color: '#464646'
          },
          limitMax: 'true',
          colorStart: '#FF7857',
          colorStop: '#FF7857',
          strokeColor: '#F1F1F1',
          generateGradient: true,
          percentColors: [[0.0, '#E87352'], [1.0, '#E87352']]
        }
      };
    }
  ]).controller('morrisChartCtrl', [
    '$scope', function($scope) {
      $scope.mainData = [
        {
          month: '2013-01',
          xbox: 294000,
          will: 136000,
          playstation: 244000
        }, {
          month: '2013-02',
          xbox: 228000,
          will: 335000,
          playstation: 127000
        }, {
          month: '2013-03',
          xbox: 199000,
          will: 159000,
          playstation: 130000
        }, {
          month: '2013-04',
          xbox: 174000,
          will: 160000,
          playstation: 82000
        }, {
          month: '2013-05',
          xbox: 255000,
          will: 318000,
          playstation: 82000
        }, {
          month: '2013-06',
          xbox: 298400,
          will: 401800,
          playstation: 98600
        }, {
          month: '2013-07',
          xbox: 370000,
          will: 225000,
          playstation: 159000
        }, {
          month: '2013-08',
          xbox: 376700,
          will: 303600,
          playstation: 130000
        }, {
          month: '2013-09',
          xbox: 527800,
          will: 301000,
          playstation: 119400
        }
      ];
      $scope.simpleData = [
        {
          year: '2008',
          value: 20
        }, {
          year: '2009',
          value: 10
        }, {
          year: '2010',
          value: 5
        }, {
          year: '2011',
          value: 5
        }, {
          year: '2012',
          value: 20
        }, {
          year: '2013',
          value: 19
        }
      ];
      $scope.comboData = [
        {
          year: '2008',
          a: 20,
          b: 16,
          c: 12
        }, {
          year: '2009',
          a: 10,
          b: 22,
          c: 30
        }, {
          year: '2010',
          a: 5,
          b: 14,
          c: 20
        }, {
          year: '2011',
          a: 5,
          b: 12,
          c: 19
        }, {
          year: '2012',
          a: 20,
          b: 19,
          c: 13
        }, {
          year: '2013',
          a: 28,
          b: 22,
          c: 20
        }
      ];
      return $scope.donutData = [
        {
          label: "Download Sales",
          value: 12
        }, {
          label: "In-Store Sales",
          value: 30
        }, {
          label: "Mail-Order Sales",
          value: 20
        }, {
          label: "Online Sales",
          value: 19
        }
      ];
    }
  ]).controller('flotChartCtrl', [
    '$scope', function($scope) {
      var areaChart, barChart, lineChart1;
      lineChart1 = {};
      lineChart1.data1 = [[1, 15], [2, 20], [3, 14], [4, 10], [5, 10], [6, 20], [7, 28], [8, 26], [9, 22], [10, 23], [11, 24]];
      lineChart1.data2 = [[1, 9], [2, 15], [3, 17], [4, 21], [5, 16], [6, 15], [7, 13], [8, 15], [9, 29], [10, 21], [11, 29]];
      $scope.line1 = {};
      $scope.line1.data = [
        {
          data: lineChart1.data1,
          label: 'Product A'
        }, {
          data: lineChart1.data2,
          label: 'Product B',
          lines: {
            fill: false
          }
        }
      ];
      $scope.line1.options = {
        series: {
          lines: {
            show: true,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0
                }, {
                  opacity: 0.3
                }
              ]
            }
          },
          points: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 5
          }
        },
        colors: ["#31C0BE", "#8170CA", "#E87352"],
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        xaxis: {
          ticks: [[1, 'Jan.'], [2, 'Feb.'], [3, 'Mar.'], [4, 'Apr.'], [5, 'May'], [6, 'June'], [7, 'July'], [8, 'Aug.'], [9, 'Sept.'], [10, 'Oct.'], [11, 'Nov.'], [12, 'Dec.']]
        }
      };
      areaChart = {};
      areaChart.data1 = [[2007, 15], [2008, 20], [2009, 10], [2010, 5], [2011, 5], [2012, 20], [2013, 28]];
      areaChart.data2 = [[2007, 15], [2008, 16], [2009, 22], [2010, 14], [2011, 12], [2012, 19], [2013, 22]];
      $scope.area = {};
      $scope.area.data = [
        {
          data: areaChart.data1,
          label: "Value A",
          lines: {
            fill: true
          }
        }, {
          data: areaChart.data2,
          label: "Value B",
          points: {
            show: true
          },
          yaxis: 2
        }
      ];
      $scope.area.options = {
        series: {
          lines: {
            show: true,
            fill: false
          },
          points: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 5
          },
          shadowSize: 0
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        colors: ["#60CD9B", "#8170CA"],
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        xaxis: {
          mode: "time"
        },
        yaxes: [
          {}, {
            position: "right"
          }
        ]
      };
      barChart = {};
      barChart.data1 = [[2008, 20], [2009, 10], [2010, 5], [2011, 5], [2012, 20], [2013, 28]];
      barChart.data2 = [[2008, 16], [2009, 22], [2010, 14], [2011, 12], [2012, 19], [2013, 22]];
      barChart.data3 = [[2008, 12], [2009, 30], [2010, 20], [2011, 19], [2012, 13], [2013, 20]];
      $scope.barChart = {};
      $scope.barChart.data = [
        {
          label: "Value A",
          data: barChart.data1
        }, {
          label: "Value B",
          data: barChart.data2
        }, {
          label: "Value C",
          data: barChart.data3
        }
      ];
      $scope.barChart.options = {
        series: {
          stack: true,
          bars: {
            show: true,
            fill: 1,
            barWidth: 0.3,
            align: "center",
            horizontal: false,
            order: 1
          }
        },
        grid: {
          hoverable: true,
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        colors: ["#60CD9B", "#66B5D7", "#EEC95A", "#E87352"]
      };
      $scope.pieChart = {};
      $scope.pieChart.data = [
        {
          label: "Download Sales",
          data: 12
        }, {
          label: "In-Store Sales",
          data: 30
        }, {
          label: "Mail-Order Sales",
          data: 20
        }, {
          label: "Online Sales",
          data: 19
        }
      ];
      $scope.pieChart.options = {
        series: {
          pie: {
            show: true
          }
        },
        legend: {
          show: true
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: ["#60CD9B", "#66B5D7", "#EEC95A", "#E87352"],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
      $scope.donutChart = {};
      $scope.donutChart.data = [
        {
          label: "Download Sales",
          data: 12
        }, {
          label: "In-Store Sales",
          data: 30
        }, {
          label: "Mail-Order Sales",
          data: 20
        }, {
          label: "Online Sales",
          data: 19
        }
      ];
      $scope.donutChart.options = {
        series: {
          pie: {
            show: true,
            innerRadius: 0.5
          }
        },
        legend: {
          show: true
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: ["#60CD9B", "#66B5D7", "#EEC95A", "#E87352"],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
      $scope.donutChart2 = {};
      $scope.donutChart2.data = [
        {
          label: "Download Sales",
          data: 12
        }, {
          label: "In-Store Sales",
          data: 30
        }, {
          label: "Mail-Order Sales",
          data: 20
        }, {
          label: "Online Sales",
          data: 19
        }, {
          label: "Direct Sales",
          data: 15
        }
      ];
      return $scope.donutChart2.options = {
        series: {
          pie: {
            show: true,
            innerRadius: 0.5
          }
        },
        legend: {
          show: false
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: ["#1BB7A0", "#39B5B9", "#52A3BB", "#619CC4", "#6D90C5"],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
    }
  ]).controller('flotChartCtrl.realtime', ['$scope', function($scope) {}]).controller('sparklineCtrl', [
    '$scope', function($scope) {
      $scope.demoData1 = {
        data: [3, 1, 2, 2, 4, 6, 4, 5, 2, 4, 5, 3, 4, 6, 4, 7],
        options: {
          type: 'line',
          lineColor: '#fff',
          highlightLineColor: '#fff',
          fillColor: '#60CD9B',
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false,
          width: '100%',
          height: '150px'
        }
      };
      $scope.simpleChart1 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'line',
          lineColor: '#31C0BE',
          fillColor: '#bce0df',
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false
        }
      };
      $scope.simpleChart2 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'bar',
          barColor: '#31C0BE'
        }
      };
      $scope.simpleChart3 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'pie',
          sliceColors: ['#31C0BE', '#60CD9B', '#E87352', '#8170CA', '#EEC95A', '#60CD9B']
        }
      };
      $scope.tristateChart1 = {
        data: [1, 2, -3, -5, 3, 1, -4, 2],
        options: {
          type: 'tristate',
          posBarColor: '#95b75d',
          negBarColor: '#fa8564'
        }
      };
      $scope.largeChart1 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'line',
          lineColor: '#674E9E',
          highlightLineColor: '#7ACBEE',
          fillColor: '#927ED1',
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false,
          width: '100%',
          height: '150px'
        }
      };
      $scope.largeChart2 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'bar',
          barColor: '#31C0BE',
          barWidth: 10,
          width: '100%',
          height: '150px'
        }
      };
      return $scope.largeChart3 = {
        data: [3, 1, 2, 3, 5],
        options: {
          type: 'pie',
          sliceColors: ['#31C0BE', '#60CD9B', '#E87352', '#8170CA', '#EEC95A', '#60CD9B'],
          width: '150px',
          height: '150px'
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.chart.directives', []).directive('gaugeChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, gauge, options;
          data = scope.data;
          options = scope.options;
          gauge = new Gauge(ele[0]).setOptions(options);
          gauge.maxValue = data.maxValue;
          gauge.animationSpeed = data.animationSpeed;
          return gauge.set(data.val);
        }
      };
    }
  ]).directive('flotChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, plot;
          data = scope.data;
          options = scope.options;
          return plot = $.plot(ele[0], data, options);
        }
      };
    }
  ]).directive('flotChartRealtime', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var data, getRandomData, plot, totalPoints, update, updateInterval;
          data = [];
          totalPoints = 300;
          getRandomData = function() {
            var i, prev, res, y;
            if (data.length > 0) {
              data = data.slice(1);
            }
            while (data.length < totalPoints) {
              prev = (data.length > 0 ? data[data.length - 1] : 50);
              y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else {
                if (y > 100) {
                  y = 100;
                }
              }
              data.push(y);
            }
            res = [];
            i = 0;
            while (i < data.length) {
              res.push([i, data[i]]);
              ++i;
            }
            return res;
          };
          update = function() {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);
          };
          data = [];
          totalPoints = 300;
          updateInterval = 200;
          plot = $.plot(ele[0], [getRandomData()], {
            series: {
              lines: {
                show: true,
                fill: true
              },
              shadowSize: 0
            },
            yaxis: {
              min: 0,
              max: 100
            },
            xaxis: {
              show: false
            },
            grid: {
              hoverable: true,
              borderWidth: 1,
              borderColor: '#eeeeee'
            },
            colors: ["#5BDDDC"]
          });
          return update();
        }
      };
    }
  ]).directive('sparkline', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, sparkResize, sparklineDraw;
          data = scope.data;
          options = scope.options;
          sparkResize = void 0;
          sparklineDraw = function() {
            return ele.sparkline(data, options);
          };
          $(window).resize(function(e) {
            clearTimeout(sparkResize);
            return sparkResize = setTimeout(sparklineDraw, 200);
          });
          return sparklineDraw();
        }
      };
    }
  ]).directive('morrisChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '='
        },
        link: function(scope, ele, attrs) {
          var colors, data, func, options;
          data = scope.data;
          switch (attrs.type) {
            case 'line':
              if (attrs.lineColors === void 0 || attrs.lineColors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.lineColors);
              }
              options = {
                element: ele[0],
                data: data,
                xkey: attrs.xkey,
                ykeys: JSON.parse(attrs.ykeys),
                labels: JSON.parse(attrs.labels),
                lineWidth: attrs.lineWidth || 2,
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
              };
              return new Morris.Line(options);
            case 'area':
              if (attrs.lineColors === void 0 || attrs.lineColors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.lineColors);
              }
              options = {
                element: ele[0],
                data: data,
                xkey: attrs.xkey,
                ykeys: JSON.parse(attrs.ykeys),
                labels: JSON.parse(attrs.labels),
                lineWidth: attrs.lineWidth || 2,
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                behaveLikeLine: attrs.behaveLikeLine || false,
                fillOpacity: attrs.fillOpacity || 'auto',
                pointSize: attrs.pointSize || 4
              };
              return new Morris.Area(options);
            case 'bar':
              if (attrs.barColors === void 0 || attrs.barColors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.barColors);
              }
              options = {
                element: ele[0],
                data: data,
                xkey: attrs.xkey,
                ykeys: JSON.parse(attrs.ykeys),
                labels: JSON.parse(attrs.labels),
                barColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                stacked: attrs.stacked || null
              };
              return new Morris.Bar(options);
            case 'donut':
              if (attrs.colors === void 0 || attrs.colors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.colors);
              }
              options = {
                element: ele[0],
                data: data,
                colors: colors || ['#0B62A4', '#3980B5', '#679DC6', '#95BBD7', '#B0CCE1', '#095791', '#095085', '#083E67', '#052C48', '#042135']
              };
              if (attrs.formatter) {
                func = new Function('y', 'data', attrs.formatter);
                options.formatter = func;
              }
              return new Morris.Donut(options);
          }
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('app.page.ctrls', []).controller('invoiceCtrl', [
    '$scope', '$window', function($scope, $window) {
      return $scope.printInvoice = function() {
        var originalContents, popupWin, printContents;
        printContents = document.getElementById('invoice').innerHTML;
        originalContents = document.body.innerHTML;
        popupWin = window.open();
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
        return popupWin.document.close();
      };
    }
  ]);

}).call(this);
