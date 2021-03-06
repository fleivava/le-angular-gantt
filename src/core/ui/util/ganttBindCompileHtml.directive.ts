import {get, set} from 'lodash'
export default function ($compile) {
  'ngInject'

  return {
    restrict: 'A',
    link: function (scope, element, attrs, ganttCtrl) {
      scope.scope = get(scope, 'pluginScope.ganttCtrl.gantt.$scope.$parent')

      scope.thisWatcher = scope.$watch(function () {
        return scope.$eval(attrs.ganttBindCompileHtml)
      }, function (value) {
        element.html(value)
        $compile(element.contents())(scope)
        scope.thisWatcher()
      })
    }
  }
}
