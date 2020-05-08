export default function (graph, vm) {
    graph.on('add-edge', function (edge) {
        vm.addEdges(edge)
    })
}
