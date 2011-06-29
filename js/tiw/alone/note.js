
dojo.provide('tiw.alone.note');

/**
 * class for simple notepad
 */
tiw.alone.note = {

    /**
     * initialize notepad 
     */
    init: function() {
        this.editor = ace.edit("editor");
        var JavascriptMode = require("ace/mode/javascript").Mode;
        var RubyMode = require("ace/mode/ruby").Mode;
        var PhpMode = require("ace/mode/php").Mode;

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //editor.getSession().setMode(new JavascriptMode());
            dojo.connect(dojo.byId('show'), 'onclick', this, this.previewCb);
            dojo.connect(dojo.byId('files'), 'onchange', this, this.loadFileCb);
        } else {
            console.log('aho, your brower can not read file');
        }
    },
    /**
     * callback for preview markdown text
     */
    previewCb: function(){
        var text = this.editor.getSession().getValue();
        var converter = new Attacklab.showdown.converter();
        var html = converter.makeHtml(text);
        dojo.attr(dojo.byId('preview'), 'innerHTML', html);
    },
    /**
     * insert file to the editor after reading from file 
     */
    loadFileCb: function(evt){
        var files = evt.target.files;
        var output=[];
        var editor = this.editor;
        dojo.forEach(files, function(item){
            console.log(item.name)
            var fileName = item.name.split('.');
            var extension = fileName[1];
            switch(extension) {
                case 'php':
                    var PhpMode = require('ace/mode/php').Mode;
                    editor.getSession().setMode(new PhpMode());
                    break;
                case 'js':
                    var JavascriptMode = require('ace/mode/javascript').Mode;
                    editor.getSession().setMode(new JavascriptMode());
                    break;
                default:
                    // code
            }
            console.log(fileName);
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
