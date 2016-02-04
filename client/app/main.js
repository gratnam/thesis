var main = angular.module('greeniusApp',
	['auth0',
	'angular-storage',
	'angular-jwt',
	'landingPage',
	'navbar',
  'dndLists',
	'browsePlant',
	'dashboard',
	'calendar',
	'myPlants',
  'myGarden',
	'plantProfile',
	'plantProfileDirective',
	'services',
	'ui.router',
	'ui.calendar',
  'ui.bootstrap']);

main.config(function (authProvider){
  authProvider.init({
    domain: 'greeniusthesis.auth0.com',
    clientID: '909iKBxjdoJbblSUwtwFKFwfkqZss09d',
    loginState: 'landingPage'
  });
})
.run(function(auth){
  auth.hookEvents();
});

main.config(function(authProvider, $httpProvider, jwtInterceptorProvider){
  jwtInterceptorProvider.tokenGetter = ['store', function(store){
    // Return the saved token
    var token = store.get('token');
    return token;
  }];
  $httpProvider.interceptors.push('jwtInterceptor');
});

main.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', function($rootScope, auth, store, jwtHelper, $location){
  $rootScope.$on('$locationChangeStart', function(){
    var token = store.get('token');
    if(token){
      if(!jwtHelper.isTokenExpired(token)){
        if(!auth.isAuthenticated){
          auth.authenticate(store.get('profile'), token);
        }
      } else{
        $location.path('/');
      }
    }
  });
}]);

main.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
	$urlRouterProvider.otherwise('landingPage');

	$stateProvider
		.state('landingPage', {
			url: '/landingPage',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/landingPageView.html',
					controller: 'landingPageController',
					controllerAs: 'ldp'
				}
			}
		})
		.state('login', {
			url: '/login',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/loginView.html',
					controller: 'landingPageController',
					controllerAs: 'ldp'
				}
			}
		})
		.state('signup', {
			url: '/signup',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/signupView.html',
					controller: 'landingPageController',
					controllerAs: 'ldp'
				}
			}
		})
		.state('settings', {
			url: '/settings',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/userSettingsView.html',
					controller: 'landingPageController',
					controllerAs: 'ldp'
				}
			}
		})
		.state('logout', {
			url: '/logout',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/landingPageView.html',
					controller: 'landingPageController',
					controllerAs: 'ltp'
				}
			}
		})
		.state('navbar', {
			url: '/navbar',
			views: {
				'indexPage': {
					templateUrl: './app/navbar/navbarView.html',
					controller: 'navbarController',
					controllerAs: 'nvp'
				}
			},
      data: {requiresLogin : true}
		})
		.state('navbar.dashboard', {
			url: '/dashboard',
			views: {
				'subView': {
					templateUrl: './app/dashboard/dashboardView.html',
					controller: 'dashboardController',
					controllerAs: 'dbp'
				},
				'subSubView@navbar.dashboard': {
					templateUrl: './app/calendar/calendarView.html',
					controller: 'calendarController',
					controllerAs: 'clp'
				}
			},
      data: {requiresLogin : true}
		})
		.state('navbar.browsePlant', {
			url: '/browseplant',
			views: {
				'subView': {
					templateUrl: './app/browsePlant/browsePlantView.html',
					controller: 'browsePlantController',
					controllerAs: 'bpp'
				}
			},
      data: {requiresLogin : true}
		})
		.state('navbar.myPlants', {
			url: '/myplants',
			views: {
				'subView': {
					templateUrl: './app/myPlants/myPlantsView.html',
					controller: 'myPlantsController',
					controllerAs: 'mpp'
				}
			},
      data: {requiresLogin : true}
		})
    .state('navbar.myGarden', {
      url: '/mygarden',
      views: {
				'subView': {
          templateUrl: './app/myGarden/myGardenView.html',
          controller: 'myGardenController',
          controllerAs: 'mgp'
        }
      },
      data: {requiresLogin : true}
    })
		.state('navbar.plantProfile', {
			url: '/plantprofile/:nickname',
			views: {
				'subView': {
					templateUrl: './app/plantProfile/plantProfileView.html',
					controller: 'plantProfileController',
					controllerAs: 'ppp'
				}
			},
      data: {requiresLogin : true}
		});
}]);
