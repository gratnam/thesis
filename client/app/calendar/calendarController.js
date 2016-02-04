var calendar = angular.module('calendar', []);
calendar.controller('calendarController', ['auth', '$window', 'Events','$compile', '$timeout', 'uiCalendarConfig', function(auth, $window, Events, $compile, $timeout, uiCalendarConfig) {
	var that = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  that.events = [
    {title: 'Rose needs to plant', start: new Date(y, m , d + 1, 19, 0), end: new Date(y, m , d +1, 20, 30), allDay: false }
  ];
  // console.log(uiCalendarConfig, 'HELLOWWW($)')

	that.eventSources = [that.events];
  // that.renderCalendar = function(calendar) {
  //     if(uiCalendarConfig.calendars[calendar]){
  //       uiCalendarConfig.calendars[calendar].fullCalendar('render');
  //     }
  //   };
  // that.eventsF

  that.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    // that.eventSources = [that.events]


  //   that.eventsF = function (start, end, timezone, callback) {
  //    var s = new Date(start).getTime() / 1000;
  //    var e = new Date(end).getTime() / 1000;
  //    var m = new Date(start).getMonth();
  //    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
  //    callback(events);
  //  };
    // that.addEvent = function() {
    //    that.events.push({
    //      title: 'Open Sesame',
    //      start: new Date(y, m, 28),
    //      end: new Date(y, m, 29),
    //      className: ['openSesame']
    //    });
    //  };
}]);
