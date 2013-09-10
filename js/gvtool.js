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
    for (var f=0; f<=12; f++) {
      var row = $("<tr />");
      for (var s=6; s>0; s--) {
        var id = ("f"+f)+("s"+s);
        var cell = $('<td> ---&nbsp; </td>');
        cell.attr('id', id);
        row.append(cell);
        console.log("id: #"+id);
      }
      table.append(row);
    }
  }
};
