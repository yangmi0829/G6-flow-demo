import defaultListeners from './default'
const KEY_CODE = {
    DEL: 46
}
export default function (graph, vm) {
    defaultListeners(graph)
    // 监听删除键
    window.addEventListener('keyup', e => {
        switch (e.keyCode) {
            case KEY_CODE.DEL:
                vm.handleDelkeyCode()
                break
        }
    })
    // 新增edge
    graph.on('add-edge', function (edge) {
        vm.addEdges(edge)
    })
}
