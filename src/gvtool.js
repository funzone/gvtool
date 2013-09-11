Music = new Vex.Flow.Music();


GVTool = {

  stage_selector: "#gv-stage",

  default_degree_colors: {
    // Roy G. Biv
    0: 'red',
    1: 'brown',
    2: 'blue',
    3: 'yellow',
    4: 'orange',
    5: 'indigo',
    6: 'green'
  },

  start: function () {
    GVTool.extendScaleLibrary();
    GVTool.createBoard();
    GVTool.fillKeyTable();
    GVTool.buttonClickListener();
  },

  createBoard: function () {
    var stage = $(GVTool.stage_selector);
    var table = $('<table />');
    stage.append(table);
    for (var fret=0; fret<=22; fret++) {
      row = $("<tr><th>"+fret+"</th></tr>");
      for (var string=6; string>0; string--) {
        var id = ("f"+fret)+("s"+string);
        var cell = $('<td />');
        cell.attr('id', id);
        row.append(cell);
        //console.log("id: #"+id);
      }
      table.append(row);
    }
  },




  stringToNote: function(string) {
    return ['e', 'b', 'g', 'd', 'a', 'e'] [string - 1];
  },







  stringToNoteValue: function(string) {
    return Music.getNoteValue(GVTool.stringToNote(string));
  },






  fretToNoteValue: function(fret, string) {
    var string_value = Music.getNoteValue(GVTool.stringToNote(string));
    return (string_value + fret) % 12;
  },







  highlightScale: function(key, scale, degree_colors) {
    GVTool.clearAllNotes();
    if ((typeof degree_colors) == 'undefined')
      degree_colors = GVTool.default_degree_colors;
    var tones = GVTool.scale(key, scale);
    for (var deg = 0; deg < tones.length; deg++) {
      if (deg==0 || deg==2 || deg==4 || deg==6)
        GVTool.highlightAllNotes(tones[deg], degree_colors[deg]);
    }
  },







  highlightAllNotes: function(note_value, color) {
    for (var fret=0; fret<=22; fret++) {
      for (var string=6; string>0; string--) {
        if (GVTool.fretToNoteValue(fret, string) == note_value)
          GVTool.cellAtFret(fret, string).css('background-color', color);
      }
    }
  },







  clearAllNotes: function() {
    for (var fret=0; fret<=22; fret++) {
      for (var string=6; string>0; string--) {
          GVTool.cellAtFret(fret, string).css('background-color', '#ffffff');
      }
    }
  },








  cellAtFret: function(fret, string) {
    return $("#" + ("f" + fret) + ("s" + string));
  },






  scale: function(key, scale) {
    var key_value = Music.getNoteValue(key);
    var scale_array = Vex.Flow.Music.scales[scale];

    return Music.getScaleTones(key_value, scale_array);
  },





  buttonClickListener: function () {
    $("#go-bitch").on('click', function () {
      var key = $("input#input_scale_key").val().toLowerCase();
      var scale = $("input#input_scale_name").val().toLowerCase();
      GVTool.highlightScale(key, scale);
    });
  },




  fillKeyTable: function (degree_colors) {
    if ((typeof degree_colors) == 'undefined')
      degree_colors = GVTool.default_degree_colors;
    for (var i = 0; i < 7; i++) {
      $("#k"+i).css('background-color', degree_colors[i]);
      console.log("#k"+i, degree_colors[i]);
    }
  },


  extendScaleLibrary: function () {
    var scales = Vex.Flow.Music.scales;
    scales.ionian = scales.major;
    scales.phrygian = [1, 2, 2, 2, 1, 2, 2];
    scales.lydian = [2, 2, 2, 1, 2, 2, 1];
  }
};
