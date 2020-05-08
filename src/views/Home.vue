<template>
  <flow/>
</template>
<script>
  import Flow from "@/components/Flow/Flow";
  import insertCss from 'insert-css';
  export default {
    name: 'Home',
    components: {Flow},
    created() {
      insertCss(`
        .g6-tooltip {
          border-radius: 6px;
          font-size: 12px;
          color: #fff;
          background-color: #000;
          padding: 2px 8px;
          text-align: center;
        }
      `);
    }
  }
</script>
