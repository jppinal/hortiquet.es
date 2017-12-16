angular.module('common')
.directive('hortiquet', function() {
    return {
      restrict: 'E',
      scope: {},
      template: '<span class="font-hortiquet">Hort<img src="/assets/images/vegetables/carrot.svg" alt="i"/>Quet</span>',
      transclude: false
    };
})
.directive('hortiquetWhite', function() {
    return {
      restrict: 'E',
      scope: {},
      template: '<span class="font-hortiquet white">Hort<img src="/assets/images/vegetables/carrot-white.svg" alt="i"/>Quet</span>',
      transclude: false
    };
});
