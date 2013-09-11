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

  degrees_to_display: [
    true,
    false,
    true,
    false,
    true,
    false,
    true
  ],

  start: function () {
    GVTool.createScaleLibrary();
    GVTool.createBoard();
    GVTool.fillKeyTable();
    GVTool.buttonClickListener();

    var set_options = false;

    for (var i=0; (!set_options) && i < GVTool.degrees_to_display.length; i++)
      set_options = $("#display-"+i).prop("checked");
    console.log("i", i);
    if (!set_options)
      GVTool.setDegreesToDisplay();

  },

  createBoard: function () {
    var stage = $(GVTool.stage_selector);
    var table = $('<table />');
    stage.append(table);
    for (var fret = 0; fret <= 22; fret++) {
      row = $("<tr><th>" + fret + "</th></tr>");
      for (var string=6; string>0; string--) {
        var id = ("f" + fret) + ("s" + string);
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
      if (GVTool.degrees_to_display[deg])
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
    $("#go-button").on('click', function () {
      GVTool.getDegreesToDisplay();
      var key =
        $("#scale_key").val() +
        $("#scale_accidental").val();
      var scale = $("#scale_name").val();
      GVTool.highlightScale(key, scale);
      return false;
    });

    $('.preset').on('click', function() {
      var preset_type = $(this).data('preset-type');
      var array_to_set = [true, true, true, true, true, true, true];
      switch (preset_type) {
        case 'triad':
          array_to_set = [true, false, true, false, true, false, false];
          break;
        case 'seventh':
          array_to_set = [true, false, true, false, true, false, true];
          break;
        case 'rootless':
          array_to_set = [false, false, true, false, true, false, true];
          break;
      }
      GVTool.setDegreesToDisplay(array_to_set);
      return false;
    });
  },




  fillKeyTable: function (degree_colors) {
    if ((typeof degree_colors) == 'undefined')
      degree_colors = GVTool.default_degree_colors;
    for (var i = 0; i < 7; i++) {
      $("#k"+i).css('background-color', degree_colors[i]);
    }
  },




  createScaleLibrary: function () {
    var scales = Vex.Flow.Music.scales;
    scales.ionian = [2, 2, 1, 2, 2, 2, 1];
    scales.dorian = [2, 1, 2, 2, 2, 1, 2];
    scales.phrygian = [1, 2, 2, 2, 1, 2, 2];
    scales.lydian = [2, 2, 2, 1, 2, 2, 1];
    scales.mixolydian = [2, 2, 1, 2, 2, 1, 2];
    scales.aeolian = [2, 1, 2, 2, 1, 2, 2];
    scales.locrian = [1, 2, 2, 1, 2, 2, 2];

    scales.melodic_minor = [2, 1, 2, 2, 2, 2, 1];
    scales.dorian_flat9 = [1, 2, 2, 2, 2, 1, 2];
    scales.lydian_augmented = [2, 2, 2, 2, 1, 2, 1];
    scales.lydian_dominant = [2, 2, 2, 1, 2, 1, 2];
    scales.mixolydian_flat6 = [2, 2, 1, 2, 1, 2, 2];
    scales.locrian_natural2 = [2, 1, 2, 1, 2, 2, 2];
    scales.locrian_flat4 = [1, 2, 1, 2, 2, 2, 2];

    scales.harmonic_minor = [2, 1, 2, 2, 1, 3, 1];
    scales.locrian_sharp6 = [1, 2, 2, 1, 3, 1, 2];
    scales.ionian_augmented = [2, 2, 1, 3, 1, 2, 1];
    scales.dorian_sharp4 = [2, 1, 3, 1, 2, 1, 2];
    scales.phrygian_dominant = [1, 3, 1, 2, 1, 2, 2];
    scales.lydian_sharp2 =  [3, 1, 2, 1, 2, 2, 1];
    scales.ultralocrian = [1, 2, 1, 2, 2, 1, 3];
  },


  getDegreesToDisplay: function () {
    for (var i = 0; i < GVTool.degrees_to_display.length; i++)
      GVTool.degrees_to_display[i] = $("#display-" + i).prop("checked");
  },

  setDegreesToDisplay: function (to_display) {
    if ((typeof to_display) == 'undefined')
      to_display = GVTool.degrees_to_display;
    for (var i=0; i < to_display.length; i++)
      $("#display-" + i).prop("checked", to_display[i]);
  }
};
