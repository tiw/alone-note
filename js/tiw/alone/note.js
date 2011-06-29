
dojo.provide('tiw.alone.note');

tiw.alone.note = {
    init: function() {
        this.editor = ace.edit("editor");
        var JavascriptMode = require("ace/mode/javascript").Mode;

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //editor.getSession().setMode(new JavascriptMode());
            dojo.connect(dojo.byId('show'), 'onclick', this, this.previewCb);
            dojo.connect(dojo.byId('files'), 'onchange', this, this.loadFileCb);
        } else {
            console.log('aho, your brower can not read file');
        }
    },
    previewCb: function(){
        var text = this.editor.getSession().getValue();
        var converter = new Attacklab.showdown.converter();
        var html = converter.makeHtml(text);
        dojo.attr(dojo.byId('preview'), 'innerHTML', html);
    },
    loadFileCb: function(evt){
        var files = evt.target.files;
        var output=[];
        var editor = this.editor;
        dojo.forEach(files, function(item){
            console.log(item.name)
            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    editor.getSession().setValue(e.target.result);
                };
            })(item);
            reader.readAsBinaryString(item);
        });
    },

};
