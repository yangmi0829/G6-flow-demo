<template>
    <div class="flow-panel">
        <div
            draggable
            @dragend="dragend($event,item)"
            v-for="(item, $index) in list"
            :key="$index"
            class="flow-panel-item">
            {{item.label}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "FlowPanel",
        data(){
            return {
                list: [
                    {label: '开始', type:'ellipse'},
                    {label: '结束', type:'ellipse'},
                    {label: '申请节点', type:'rect'},
                    {label: '判断节点', type:'diamond'},
                    {label: '审核节点', type:'rect'},
                    {label: '分支节点', type:'diamond'},
                ]
            }
        },
        methods: {
            dragend(e, details){
                this.$emit('dragend', e, details)
            }
        }
    }
</script>

<style scoped lang="scss">
    .flow-panel{
        float: left;
        width: 20%;
        background: #f0f2f5;
        overflow-y: auto;
        border-left: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 50px);
        text-align: center;
        line-height: 50px;
        font-size: 10px;
        .flow-panel-item{
            border: 1px solid #ececec;
        }
    }

</style>
