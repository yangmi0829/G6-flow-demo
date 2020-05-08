<template>
    <div class="flow-box">
        <flow-panel class="panel" @dragend="dragend"></flow-panel>
        <div class="canvas" id="mountNode"></div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    import FlowPanel from "@/components/Flow/FlowPanel";
    import Behavior from './behavior'
    import MODE from "@/components/Flow/mode";
    import listeners from "./listeners";
    Behavior(G6)
    export default {
        name: "Flow",
        components: {FlowPanel},
        data(){
            return {
                graph: null,
                nodes: [],
                /**
                 * 边集：
                 *  source：起始点 id
                 *  target：目标点 id
                 *  label：边的文本
                 */
                edges: []
            }
        },
        computed: {
            flowData(){
                return {
                    nodes: this.nodes,
                    edges: this.edges,
                }
            }
        },
        methods: {
            addEdges(edge){
                this.edges.push(edge)
            },
            dragend(e, details){
                const { x, y } = e
                const p = this.graph.getPointByClient(x, y)
                if(p.x > 0 && p.y > 0){
                    this.nodes.push({
                        id: Date.now().toString(),
                        x: p.x,
                        y: p.y,
                        label: details.label,
                        type: details.type
                    })
                    this.graph.changeData(this.flowData)
                }

            },
            renderFlow(){
                const graph = this.graph
                graph.data(this.flowData); // 加载数据
                graph.render(); // 渲染
            },
            initGraph(){
                const graph = new G6.Graph({
                    container: 'mountNode', // 指定挂载容器
                    width: 800, // 图的宽度
                    height: 500, // 图的高度
                    plugins: [new G6.Grid()],
                    modes: {
                        [MODE.DEFAULT]: ['drag-node', 'click-select', 'click-add-edge']
                    },
                    nodeStateStyles: {
                        selected: {
                            stroke: '#1f25f7',
                            lineWidth: 3,
                        },
                    },
                    defaultEdge: {
                        style: {
                            endArrow: true
                        }
                    }
                });
                listeners(graph, this)
                this.graph = graph
            }
        },
        mounted() {
            this.initGraph()
            this.renderFlow()
        },

    }
</script>

<style scoped lang="scss">
    .flow-box{
        display: flex;
        .panel{
            min-width: 200px;
            height: fit-content;
        }
        .canvas{
            flex: 1;
        }
    }

</style>
