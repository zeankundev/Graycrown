const { node } = require("webpack")

{
    resolve: {
        modulesDirectories: ['node_modules', 'script']
    }
}
node: {
    child_process: 'empty'
}