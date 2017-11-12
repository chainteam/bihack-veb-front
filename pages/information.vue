<template>
  <el-container>
    <el-header>
      <h3><i class="el-icon-loading"></i>&nbsp; ГлавРЕЕСТР</h3>
    </el-header>

    <el-main>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <b>Запрос данных</b>
        </div>
        <div class="flex">
          <el-input placeholder="Введите адрес" v-model="address"></el-input>
          <el-input placeholder="Введите идентификатор собственности" v-model="guid"> </el-input>
          <el-button type="info" plain icon="el-icon-search" @click="requestObject">Поиск объекта</el-button>
        </div>
      </el-card>

      <div v-if="info">
        <div class="-data">
          <h3>Полученная информация</h3>
          <el-card class="card" :class="{[info.status]: true}">
            <div slot="header">
              <span>{{info.name}}</span>
              <b style="float: right; padding: 3px 0" type="text">{{info.status}}</b>
            </div>
            <div>
              <h4>{{info.title}}</h4>
              <div>{{info.value}}</div>
            </div>
          </el-card>

          <div class="flex -collapses" >
            <el-card v-for="(order,index) in info.orders" :key="order.title" class="order" :class="{[order.status]: true}">
              <div>
                <h4>{{order.title}}</h4>
                <div>{{order.value}}</div>
              </div>
            </el-card>
          </div>

          <!-- <el-collapse class="-collapses" v-model="activeOrders">
            <el-collapse-item v-for="(order,index) in info.orders" :key="order.title" :title="order.title" :name="index">
              <div>
                <h4>{{order.name}}</h4>
                <div>{{order.value}}</div>
                <div>{{order.status}}</div>
              </div>
            </el-collapse-item>
          </el-collapse> -->

        </div>
      </div>

    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'information',
  data() {
    return {
      guid: null,
      address: null,
      info: null,
      activeOrders: ['1']
    }
  },
  methods: {
    requestObject() {
      this.$axios.get('/')
      this.info = {
        status: 'pending',
        title: 'title object',
        name: 'name object',
        value: 'value object',
        orders: [
          {
            status: 'pending',
            title: 'title pending',
            name: 'name pending',
            value: 'value pending'
          },
          {
            status: 'accepted',
            title: 'title accepted',
            name: 'name accepted',
            value: 'value accepted'
          },
          {
            status: 'discard',
            title: 'title discard',
            name: 'name discard',
            value: 'value discard'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" >
body {
  background: whitesmoke;
}
.el-card {
  box-shadow: none!important;
}
.el-header {
   background-color: #B3C0D1;
   color: #333;
   line-height: 60px;
 }
.flex {
  display: flex;
  & > * {
    flex: 3;
    margin: 0 1rem;
  }
  .el-button {
    flex:1;
  }
}
.-data {
  margin: 3rem auto;
  max-width: 1000px;
  h3 {
    margin: 1rem 0;
  }
  .-collapses {
    margin: 2.5rem 0;
  }
}
.card {
  &.pending {
    background: #ffe765;
  }
  &.done {
    background: lxavender;
  }
}
.order {
  &.pending {
    // background: lxavender;
    background: #ffe765;
    // background: gold;
  }
  &.accepted {
    background: lightgreen;
    // background: greenyellow;
  }
  &.discard {
    background: tomato;
  }
}
</style>
