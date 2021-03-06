//
// grunt prod      	 -> Build web portal 
//
module.exports = function(grunt) {

    grunt.registerTask('prod', '', function(target) {
        var tasks = [
            'jshint:all',
            'clean:predist',
            'less:distcompressed',
            'less:distuncompressed',
            'copy:dist',
            'html2js:dist',
            'concat:dist',
            'uglify:dist',
            'uglify:distExternals',
            'uglify:distXml',
            'clean:postdist',
            'concat:copyright',
            'concat:copyrightExternals',
            'concat:copyrightXml'
        ];
        if (target === 'server') {
            tasks.push('connect:dist:keepalive');
        }
        grunt.task.run(tasks);

    });
};