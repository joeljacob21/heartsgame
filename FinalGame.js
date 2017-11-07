$(document).ready(function () {
    var south = new HumanPlayer("You", $("#human_player")[0]);
    var east = new DumbAI("Bob")
    var north = new DumbAI("Carol");
    var west = new DumbAI("David");

    var match = new HeartsMatch(north, east, south, west);

    match.run();
});
