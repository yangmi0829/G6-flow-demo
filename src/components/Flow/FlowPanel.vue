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
                    {label: '圆形', type:'circle'},
                    {label: '矩形', type:'rect'},
                    {label: '椭圆', type:'ellipse'},
                    {label: '菱形', type:'diamond'},
                    {label: '三角形', type:'triangle'},
                    {label: '星形', type:'star'},
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        background-color: white;
        width: 100%;
        .flow-panel-item{
            border: 1px solid #ececec;
        }
    }

</style>
