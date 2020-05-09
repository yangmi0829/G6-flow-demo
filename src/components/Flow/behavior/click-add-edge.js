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
                graph.updateItem(this.edge, {
                    target: model.id
                });
                // 触发事件更新Flow.vue文件中的edges
                /*begin*/
                if( this.edge._cfg){
                    const id = this.edge._cfg.id
                    const source = this.edge._cfg.source._cfg.id
                    const target = this.edge._cfg.target._cfg.id
                    graph.emit('add-edge', {id,source,target})
                }

                /*end*/
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
