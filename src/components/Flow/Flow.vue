<template>
    <div class="flow-box">
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
            handleDelkeyCode(){
                // 查询所有选中的元素
                const nodes = this.graph.findAllByState('node', 'selected');
                const edges = this.graph.findAllByState('edge', 'selected');
                /*不存在多选*/
                const nodeId = nodes.map(item => item._cfg.id)[0]
                const edgeId = edges.map(item => item._cfg.id)[0]
                if(edgeId){
                    const index = this.edges.findIndex(item => item.id === edgeId)
                    this.edges.splice(index,1)
                }
                if(nodeId){
                    const index = this.nodes.findIndex(item => item.id === nodeId)
                    this.nodes.splice(index,1)
                    //删除节点，同时删除连线
                    this.edges = this.edges.filter(item => !(item.source === nodeId || item.target === nodeId) )
                }
                this.drawDraph()
            },
            addEdges(edge){
                if(!(this.edges.find(item => item.source === edge.source && item.target === edge.target))){
                    this.edges.push(edge)
                }
            },
            dragend(e, details){
                const { clientX, clientY } = e
                const p = this.graph.getPointByClient(clientX, clientY)
                if(p.x > 0 && p.y > 0){
                    this.nodes.push({
                        id: Date.now().toString(),
                        x: p.x,
                        y: p.y,
                        label: details.label,
                        type: details.type
                    })
                    this.drawDraph()
                }
            },
            drawDraph(){
                this.graph.changeData(this.flowData)
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
