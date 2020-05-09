import defaultListeners from './default'
const KEY_CODE = {
    DEL: 46
}
export default function (graph) {
    defaultListeners(graph)
    // 监听删除键
    window.addEventListener('keyup', e => {
        switch (e.keyCode) {
            case KEY_CODE.DEL:
                // 1.删除选中edge
                graph.findAllByState('edge', 'selected').forEach( item => {
                    graph.removeItem(item)
                })
                // 2. 删除选中节点
                graph.findAllByState('node', 'selected').forEach( item => {
                    graph.removeItem(item)
                })
                break
        }
    })
}
