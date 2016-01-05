var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

  var team = $stateParams.team;
  if(team === 'utahjazz') {
    $scope.homeTeam = 'Utah Jazz';
    $scope.logoPath = 'images/jazz-logo.png';
  } else if (team === 'losangeleslakers') {
    $scope.homeTeam = 'Los Angeles Lakers';
    $scope.logoPath = 'images/lakers-logo.png';
  } else if (team === 'miamiheat') {
    $scope.homeTeam = 'Miami Heat';
    $scope.logoPath = 'images/heat-logo.png';
  }

  $scope.teamData = teamData;

  $scope.showNewGameForm = false;
  $scope.toggleNewGameForm = function() {
    $scope.showNewGameForm = !$scope.showNewGameForm;
  };

  $scope.submitNewGame = function() {
    var newGame = {
      homeTeam: $scope.homeTeam.replace(/ /g, '').toLowerCase(),
      homeTeamScore: $scope.homeTeamScore,
      opponent: $scope.opponent,
      opponentScore: $scope.opponentScore
    };
    teamService.addNewGame(newGame)
    .then(
      function(result) {
        console.log(result);
        return teamService.getTeamData(newGame.homeTeam);
      }
    )
    .then(
      function(result) {
        console.log(result);
        $scope.teamData = result;
        $scope.newGame = {};
        $scope.showNewGameForm = false;
      }
    );
  };
});
