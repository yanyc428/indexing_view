<template>
  <div style="height: 500px; width: 100%;">
    <v-chart :option="option" :update-options="{notMerge: true}" autoresize></v-chart>
  </div>
</template>

<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {GraphChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import {defineComponent} from "vue";

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "KnowledgeGraph",
  components: {
    VChart
  },
  props: {
    // data: Object,
    // name: String
    option: Object
  },
  // setup(props) {
  //   const option = ref({
  //     title: {
  //       text: props.name,
  //       subtext: 'Default layout',
  //       top: 'bottom',
  //       left: 'right'
  //     },
  //     tooltip: {},
  //     legend: [
  //       {
  //         // selectedMode: 'single',
  //         data: props.data.categories.map(function (a) {
  //           return a.name;
  //         })
  //       }
  //     ],
  //     animationDuration: 1500,
  //     animationEasingUpdate: 'quinticInOut',
  //     series: [
  //       {
  //         name: props.name,
  //         type: 'graph',
  //         layout: 'force',
  //         data: props.data.nodes,
  //         links: props.data.links,
  //         categories: props.data.categories,
  //         symbolSize: 20,
  //         roam: true,
  //         label: {
  //           position: 'right',
  //           formatter: '{b}'
  //         },
  //         lineStyle: {
  //           color: 'source',
  //           curveness: 0.3
  //         },
  //         emphasis: {
  //           focus: 'adjacency',
  //           lineStyle: {
  //             width: 10
  //           }
  //         }
  //       }
  //     ]
  //   })
  //   return {option};
  // },
  // watch: {
  //   data: {
  //     handler(newValue, oldValue) {
  //       console.log(newValue, oldValue)
  //       console.log('handler', this.data)
  //       this.option.series.nodes = newValue.nodes
  //       this.option.series.links = newValue.links
  //       this.option.series.categories = newValue.categories
  //     },
  //     deep: true
  //   }
  // }
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>