export default function (Gantt, ganttEnableNgAnimate, $timeout, $templateCache) {
  'ngInject'
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: function (tElement, tAttrs) {
      let templateUrl
      if (tAttrs.templateUrl === undefined) {
        templateUrl = 'template/gantt.tmpl.html'
      } else {
        templateUrl = tAttrs.templateUrl
      }
      if (tAttrs.template !== undefined) {
        $templateCache.put(templateUrl, tAttrs.template)
      }
      return templateUrl
    },
    scope: {
      sortMode: '<?',
      // filterTask: '=?',
      // filterTaskComparator: '=?',
      // filterRow: '=?',
      // filterRowComparator: '=?',
      viewScale: '<?',
      columnWidth: '<?',
      expandToFit: '<?',
      shrinkToFit: '<?',
      // showSide: '=?',
      // allowSideResizing: '<?',
      fromDate: '=?',
      toDate: '=?',
      // currentDateValue: '=?',
      // currentDate: '=?',
      // daily: '=?',
      autoExpand: '<?',
      taskOutOfRange: '<?',
      // taskContent: '<?',
      // rowContent: '<?',
      maxHeight: '<?',
      sideWidth: '<?',
      headers: '<?',
      headersFormats: '<?',
      headersScales: '<?',
      // timeFrames: '<?',
      // dateFrames: '<?',
      // timeFramesWorkingMode: '<?',
      // timeFramesNonWorkingMode: '<?',
      // timespans: '<?',
      columnMagnet: '<?',
      shiftColumnMagnet: '<?',
      // timeFramesMagnet: '<?',
      extraScaleTime: '<?',
      data: '=?',
      api: '=?',
      options: '<?',
      watchRowTasks: '<?'
    },
    controller: function ($scope, $element, $rootScope) {
      'ngInject'
      for (let option in $scope.options) {
        $scope[option] = $scope.options[option]
      }

      // Disable animation if ngAnimate is present, as it drops down performance.
      ganttEnableNgAnimate($element, false)

      $scope.gantt = new Gantt($scope, $element, $rootScope)
      this.gantt = $scope.gantt
    },
    link: function (scope, element) {
      scope.gantt.api.directives.raise.new('gantt', scope, element)
      scope.$on('$destroy', function () {
        scope.gantt.api.directives.raise.destroy('gantt', scope, element)
      })

      $timeout(function () {
        scope.gantt.initialized()
      })
    }
  }
}
