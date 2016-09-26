seatReservationApp.controller('seatReservationController',function($scope,$window){

        $scope.user={
            name:'',
            numofseats:''
        };

        $scope.bookingDetails= JSON.parse($window.localStorage.getItem('bookingDetailsList'))  || [];
        $scope.enableDisbaleLayout=false;
        $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12];


        var reserved = JSON.parse($window.localStorage.getItem('reservedDetailsList'))  || [];

        $scope.availableSeats = ($scope.rows.length * $scope.cols.length)-reserved.length;
        console.log($scope.availableSeats);
        var selected = [];


        $scope.submitUserDetails = function(){

            if($scope.user.name != '' && $scope.user.numofseats>0){
                $scope.enableDisbaleLayout = true;
            }
        }


        // seat onClick
        $scope.seatClicked = function(seatPos) {

            if(!(reserved.indexOf(seatPos) > -1)){
                var index = selected.indexOf(seatPos);
                    if(index != -1) {
                        // seat already selected, remove
                        selected.splice(index, 1)
                    } else {
                        // new seat, push
                        console.log(selected.length);
                        if((selected.length + 1)<=$scope.user.numofseats){
                            selected.push(seatPos);
                        }
                        else{
                            //Num of Seats to select not more than given num of seats
                            alert('Num of Seats to select not more than given num of seats');
                        }
                }
            }
            else{
                alert("You can not select the already Reserved Seat");
            }

        }

        // get seat status
        $scope.getStatus = function(seatPos) {
            if(reserved.indexOf(seatPos) > -1) {
                return 'reserved';
            } else if(selected.indexOf(seatPos) > -1) {
                return 'selected';
            }
        }

        // clear selected
        $scope.clearSelected = function() {
            selected = [];
        }

        // show selected
        $scope.confirmBooking = function(form) {

          if($scope.user.name !='' && $scope.user.numofseats>0){
            var details ={
                name:$scope.user.name,
                seatCount:$scope.user.numofseats,
                seatDetails:selected.toString()
            }

            if(selected.length > 0) {
                reserved = reserved.concat(selected);
                $scope.bookingDetails.push(details);
                $window.localStorage.setItem('bookingDetailsList',JSON.stringify($scope.bookingDetails));
                $window.localStorage.setItem('reservedDetailsList',JSON.stringify(reserved));
                selected = [];
                $scope.user.name='';
                $scope.user.numofseats='';
                $scope.enableDisbaleLayout=false;
                alert("Your Booking successfully completed.");
                form.$setPristine();
                form.$setUntouched();
            } else {
                alert("No seats selected!");
            }
          }
          else{
            alert('Please Enter Name and Nof of seats to select')
          }
        }
});
