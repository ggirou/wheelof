angular.module('myApp', ['ngAnimate'])
  .directive('rotateWheel', function () {
      return {
          scope: {
              'rotateWheel': '@'
          },
          link: function (scope, element) {
              console.log(element);
              scope.$watch('rotateWheel', function() {
                  //element.endElementAt(scope.rotateWheel);
                  element.attr('transform', 'rotate(' + scope.rotateWheel + ')');
              });
          }
      };
  })
  .controller('MyController', function ($scope) {
      function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
          var angleInRadians = angleInDegrees * Math.PI / 180.0;
          return { 
              x: centerX + radius * Math.cos(angleInRadians),
              y: centerY + radius * Math.sin(angleInRadians)
          };
      }
      
      var colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
      
      function getColor() {
          var i = colors.length * Math.random();
          return colors[Math.floor(i)];
      }
      
      var points = [];
      var nb = 16;
      
      var center = {x: 200, y: 200};
      var radius = 500;
      var degree = $scope.degree = 360 / nb;
      
      for(var i = 0; i < nb; i++) {
          var p1 = polarToCartesian(center.x, center.y, radius, degree / 2 - 90);
          var p2 = polarToCartesian(center.x, center.y, radius, -degree / 2 - 90);
          var part = {
              points: center.x + "," + center.y + " " + p1.x + "," + p1.y + " " + p2.x + "," + p2.y,
              color: colors[i]
          }
          points.push(part);
      }
      
      $scope.points = points;
      $scope.repeatCount = "450";
      $scope.start = function() {
          $scope.repeatCount = "450";
      };
      
      $scope.angle = 30;
      
      
      function angle() {
          $scope.$apply(function() {
              $scope.angle += 1;
              window.requestAnimationFrame(angle);
          });
      }
      
      window.requestAnimationFrame(angle);
  });

