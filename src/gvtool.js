Music = {
  note: function (note) {

  }
};

GVTool = {

  stage_selector: "#g-stage",

  start: function () {
    console.log('yo');
    GVTool.createBoard();
  },

  createBoard: function () {
    var stage = $(GVTool.stage_selector);
    var table = $('<table />');
    stage.append(table);
    for (var fret=0; fret<=22; fret++) {
      var row = $("<tr />");
      for (var string=6; string>0; string--) {
        var id = ("f"+fret)+("s"+string);
        var cell = $('<td> ---&nbsp; </td>');
        cell.attr('id', id);
        row.append(cell);
        //console.log("id: #"+id);
      }
      table.append(row);
    }
  },

  stringToNote: function(string) {
    return ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'] [string - 1];
  },

  noteOnString: function(note, string) {
  }

};
