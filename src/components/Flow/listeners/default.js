export default function (graph) {
    graph.on('edge:click', function (e) {
        const selectedEdges = graph.findAllByState('edge', 'selected');
        selectedEdges.forEach(ce => {
            graph.setItemState(ce, 'selected', false);
        });
        const edgeItem = e.item;
        // 设置目标边的 click 状态 为 true
        edgeItem._cfg && graph.setItemState(edgeItem, 'selected', true);
    })
}
