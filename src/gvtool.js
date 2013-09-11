Music = new Vex.Flow.Music();


GVTool = {

  stage_selector: "#gv-stage",

  default_degree_colors: {
    // Roy G. Biv
    0: 'red',
    1: 'orange',
    2: 'yellow',
    3: 'green',
    4: 'blue',
    5: 'indigo',
    6: 'violet'
  },

  start: function () {
    console.log('yo');
   // GVTool.extendScaleLibrary();
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
    if ((typeof degree_colors) == 'undefined')
      degree_colors = GVTool.default_degree_colors;
    var tones = GVTool.scale(key, scale);
    for (var deg = 0; deg < tones.length; deg++) {
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

  cellAtFret: function(fret, string) {
    return $("#" + ("f" + fret) + ("s" + string));
  },


  scale: function(key, scale) {
    var key_value = Music.getNoteValue(key);
    var scale_array = Vex.Flow.Music.scales[scale];

    return Music.getScaleTones(key_value, scale_array);
  },

  extendScaleLibrary: function () {
    var scales = Vex.Flow.Music.scales;
    scales.ionian = scales.major;
    scales.phrygian = [1, 2, 2, 2, 1, 2, 2];
    scales.lydian = [2, 2, 2, 1, 2, 2, 1];
  }
};
