export default function (G6) {
    G6.registerBehavior('click-add-edge', {
        getEvents() {
            return {
                'node:click': 'onClick',
                mousemove: 'onMousemove',
                'edge:click': 'onEdgeClick' // 点击空白处，取消边
            };
        },
        onClick(ev) {
            const node = ev.item;
            const graph = this.graph;
            const point = {
                x: ev.x,
                y: ev.y
            };
            const model = node.getModel();
            if (this.addingEdge && this.edge) {
                const edge = this.edge.getModel();
                const exist = graph.findAll('edge', ce => {
                    const {source, target} = ce.getModel()
                    return target === model.id && source === edge.source
                }).length > 0
                if(exist){
                    graph.removeItem(this.edge);
                }else{
                    graph.updateItem(this.edge, {
                        target: model.id
                    });
                }

                // graph.setItemState(this.edge, 'selected', true);
                this.edge = null;
                this.addingEdge = false;
            } else {
                this.edge = graph.addItem('edge', {
                    source: model.id,
                    target: point
                });
                this.addingEdge = true;
            }
        },
        onMousemove(ev) {
            const point = {
                x: ev.x,
                y: ev.y
            };
            if (this.addingEdge && this.edge) {
                this.graph.updateItem(this.edge, {
                    target: point
                });
            }
        },
        onEdgeClick(ev) {
            const currentEdge = ev.item;
            // 拖拽过程中，点击会点击到新增的边上
            if (this.addingEdge && this.edge == currentEdge) {
                this.graph.removeItem(this.edge);
                this.edge = null;
                this.addingEdge = false;
            }
        }
    });
}
