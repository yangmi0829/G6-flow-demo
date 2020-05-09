<template>
    <div class="flow-box">
        <button @click="printData" style="position: absolute; top: 0;left: 50%">打印数据</button>
        <flow-panel class="panel" @dragend="dragend"></flow-panel>
        <div class="canvas" id="mountNode"></div>
        <operate-form class="operate-form"></operate-form>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    import FlowPanel from "@/components/Flow/FlowPanel";
    import Behavior from './behavior'
    import MODE from "@/components/Flow/mode";
    import listeners from "./listeners";
    import OperateForm from "@/components/Flow/OperateForm";
    Behavior(G6)
    export default {
        name: "Flow",
        components: {OperateForm, FlowPanel},
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
            printData(){
                console.log(this.graph.save())
            },
            dragend(e, details){
                const { clientX, clientY } = e
                const p = this.graph.getPointByClient(clientX, clientY)
                if(p.x > 0 && p.y > 0){
                    this.graph.addItem('node', {
                        id: Date.now().toString(),
                        x: p.x,
                        y: p.y,
                        label: details.label,
                        type: details.type
                    });
                }
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
                        /*节点选中*/
                        selected: {
                            stroke: '#1f25f7',
                            lineWidth: 3,
                        },
                    },
                    edgeStateStyles: {
                        selected: {
                            stroke: '#1f25f7',
                            lineWidth: 5,
                        },
                    },
                    defaultEdge: {
                        /*默认边*/
                        style: {
                            stroke: '#2580f7',
                            endArrow: true,
                            lineWidth: 2,
                            lineAppendWidth: 5,
                            cursor: 'pointer'
                        }
                    }
                });
                graph.data(this.flowData); // 加载数据
                graph.render(); // 渲染
                listeners(graph)
                this.graph = graph
            }
        },
        mounted() {
            this.initGraph()
        },

    }
</script>

<style scoped lang="scss">
    .flow-box{
        display: flex;
        .panel{
        }
        .canvas{
            flex: 0 0 auto;
            float: left;
            width:70%;
            border-bottom: 1px solid #E9E9E9;
        }
        .operate-form{

        }
    }

</style>
