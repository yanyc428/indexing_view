<template>
  <el-container id="system__container">
    <el-header id="system__header" height="70px">

      <div id="system__nav__bar">
        <div id="system__logo">
          <el-image id="logo" :src="logo_url" :lazy='true' :fit="logo_fit"
                    style="height: 46px; width: 230px;"></el-image>
          <h1 id="system__title">科技论文检索系统</h1>
        </div>
      </div>

    </el-header>
    <el-main>
      <el-row justify="center">
        <el-collapse style="width: 75%;" v-model="collapse">
          <el-collapse-item title="科技论文检索" name="1">
            <el-form label-width="80px" :model="form">

              <el-form-item label="标题" size="large">
                <el-input v-model="form.title"/>
              </el-form-item>

              <el-form-item label="摘要" size="large">
                <el-input type="textarea" autosize v-model="form.abstract"/>
              </el-form-item>

              <el-form-item label="主题词" size="large">
                <el-input v-model="form.keyword"/>
              </el-form-item>

              <el-form-item label="分类号" size="large">
                <el-input v-model="form.clc"/>
              </el-form-item>

              <el-form-item label="期刊" size="large">
                <el-input v-model="form.journal"/>
              </el-form-item>


              <el-form-item label="功能">
                <el-radio-group v-model="form._function">
                  <el-radio label="综述与进展"/>
                  <el-radio label="论证与对比"/>
                  <el-radio label="思考与探讨"/>
                  <el-radio label="原理与计算"/>
                  <el-radio label="技术与方法"/>
                  <el-radio label="设计与应用"/>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="猜你喜欢">
                <el-tag v-for="tag in recommends" @click="prefer(tag)" :key="tag" class="mx-1"
                        style="margin-right: 10px;"> {{ tag }}
                </el-tag>
              </el-form-item>

              <el-row justify="center">
                <el-form-item>
                  <el-button type="primary" plain size="large" @click="retrieval">检索论文</el-button>
                  <el-button type="success" plain size="large" @click="graph">展示图谱</el-button>
                  <el-button color="#626aef" plain size="large" @click="function_index">功能标引</el-button>
                  <el-button color="#626aef" plain size="large" @click="keyword_index">主题标引</el-button>
                </el-form-item>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>

      </el-row>
      <el-row justify="center">
        <el-table :data="tableData" max-height="800px" style="width: 75%" stripe>
          <el-table-column type="expand">
            <template #default="props">
              <el-row justify="center">
                <el-form label-position="left" inline class="demo-table-expand" style="width: 90%">
                  <el-form-item label="摘要">
                    <span>{{ props.row.abstract }}</span>
                  </el-form-item>
                </el-form>
              </el-row>

            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="30%"/>
          <el-table-column prop="authors" label="作者" min-width="10%"/>
          <el-table-column prop="journal" label="期刊" min-width="11%"/>
          <el-table-column prop="month" label="期数" min-width="9%"/>
          <el-table-column prop="clc" label="分类号" min-width="15%"/>
          <el-table-column prop="keywords" label="主题词" min-width="25%"/>
          <el-table-column prop="function" label="功能" width="100"/>
        </el-table>
      </el-row>
      <el-dialog v-model="showGraph" title="知识图谱">
        <div style="height: 600px; width: 100%;">
          <v-chart :option="option" :update-options="{notMerge: true}" autoresize></v-chart>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
// import KnowledgeGraph from "@/components/KnowledgeGraph";
import {ElLoading, ElNotification} from 'element-plus'
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {GraphChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: 'App',
  components: {
    // KnowledgeGraph,
    VChart
  },
  computed: {
    option() {
      return {
        title: {
          text: this.name,
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: this.data.categories.map(function (a) {
              return a.name;
            })
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: this.data.nodes,
            links: this.data.links,
            categories: this.data.categories,
            symbolSize: 20,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      }
    }
  },
  data() {
    return {
      logo_url: require("./assets/logo.png"),
      logo_fit: "scale-down",
      showGraph: false,
      collapse: '1',
      tableData: [],
      data: {
        nodes: [
          {
            'name': '基于注意力机制的CNN-LSTM模型及其应用',
            'id': '823524',
            'category': 0
          },
          {
            'name': '卷积神经网络',
            'id': '77049',
            'category': 1
          }
        ],
        links: [
          {
            "source": '823524',
            "target": '77049'
          },
        ],
        categories: [
          {
            "name": "论文"
          },
          {
            "name": "关键词"
          },
        ]
      },
      name: 'test',
      form: {
        title: '',
        abstract: '',
        keyword: '',
        clc: '',
        journal: '',
        _function: '',
      },
      recommends: ['深度学习', '区块链', '卷积神经网络', '图书馆', '信息组织'],
    }
  },
  methods: {
    prefer(tag) {
      this.form.keyword = tag
    },
    graph() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.axios.post('/graph',
          {
            'title': this.form.title,
            'abstract': this.form.abstract,
            'keyword': this.form.keyword,
            'clc': this.form.clc,
            'journal': this.form.journal,
            'function': this.form._function
          }
      ).then((res) => {
        console.log(res)
        this.data = res.data
        let s = ''
        for (let dataKey in this.form) {
          s += (this.form[dataKey] + ' ')
        }
        this.name = s
        this.showGraph = true
        loading.close()
      }).catch(reason => {
        console.log(reason)
        loading.close()
      })
    },
    retrieval() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.axios.post('/retrieval',
          {
            'title': this.form.title,
            'abstract': this.form.abstract,
            'keyword': this.form.keyword,
            'clc': this.form.clc,
            'journal': this.form.journal,
            'function': this.form._function
          }
      ).then((res) => {
        if (this.form.keyword !== '') {
          this.axios.post('/recommend', {'keyword': this.form.keyword}).then(
              res => (
                  this.recommends = res.data
              )
          )
        }

        this.tableData = res.data
        this.collapse = '0'
        console.log(res)
        loading.close()
      }).catch(reason => {
        console.log(reason)
        loading.close()
      })

    },
    function_index() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.axios.post('/index/function',
          {
            'text': this.form.abstract,
          }
      ).then((res) => {
        console.log(res)
        ElNotification({
          title: '功能标引',
          message: res.data,
          duration: 0,
        })
        loading.close()
      }).catch(reason => {
        console.log(reason)
        loading.close()
      })
    },
    keyword_index() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.axios.post('/index/keyword',
          {
            'text': this.form.abstract,
          }
      ).then((res) => {
        console.log(res)
        ElNotification({
          title: '主题标引',
          message: res.data,
          duration: 0,
        })
        loading.close()
      }).catch(reason => {
        console.log(reason)
        loading.close()
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}

#system__header {
  padding: 0 0;
  margin: 0;
}

#system__container {
  padding: 0 0;
  margin: 0;
  height: 100%;
}

#logo {
}

.el-image {
  padding: 17px 30px 17px 20px;
}

#system__nav__bar {
  height: 100%;
  border-bottom: solid 2px #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

#system__avatar {
  padding-right: 40px;
  border-bottom-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#system__logout__button {
  padding-left: 20px;
  margin-left: 20px;
}

#system__logo {
  padding-left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#system__title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 30px;
  font-weight: normal;
  color: #2D5FB9;
  letter-spacing: 1px;
}
</style>
