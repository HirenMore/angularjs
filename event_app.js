 angular.module("swabhav.app", []).controller('MainController', ['$scope', '$timeout',
     function($scope, $timeout) {
         $scope.student = {};

         $scope.loadStudentData = function() {
             $timeout(function() {
                 $scope.student = {
                     name: 'darshan',
                     age: '19',
                     year: '1rd year',
                     image: 'student.png'
                 }
             }, 3000)
             $scope.student = {
                 name: 'hiren',
                 age: '21',
                 year: '3rd year',
                 image: 'student2.png'
             }

         };

         $scope.studentList = [];

         $scope.loadAllStudents = function() {
             $scope.studentList.push({
                 name: 'vivek ',
                 age: '21',
                 year: '3rd year',
                 image: 'student2.png'
             });
             $scope.studentList.push({
                 name: 'hiren',
                 age: '21',
                 year: '3rd year',
                 image: 'student2.png'
             });
             $scope.studentList.push({
                 name: 'darshan',
                 age: '19',
                 year: '1rd year',
                 image: 'student.png'
             });
         };
     }
 ]);